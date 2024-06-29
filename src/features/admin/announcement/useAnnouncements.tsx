import { useEffect, useState, useCallback } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useDispatch, useSelector } from "react-redux";
import { useUserStateQuery } from "@/features/auth/authApiSlice";
import { selectCurrentUserPayload, setCredentials } from "@/features/auth/authSlice";
import { Axios } from "@services/axios/Axios";
import { Role } from "@/features/auth/types";
import addNotification from 'react-push-notification';

export interface AnnouncementDto {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  editedAt: string;
}

export const useAnnouncements = () => {
  const dispatch = useDispatch();
  const { data } = useUserStateQuery();
  const currentUser = useSelector(selectCurrentUserPayload);

  const [token, setToken] = useState(localStorage.getItem("AUTH_TOKEN_STATE"));

  const refreshToken = useCallback(async () => {
    try {
      const response = await Axios.post("v1/auth/refresh", null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const { access_token: newToken } = response.data;
      dispatch(setCredentials(newToken));
      setToken(newToken);
      return newToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  }, [dispatch, token]);
  const subscribeToAnnouncements = useCallback(
    (url: RequestInfo, authToken: string) => {
      fetchEventSource(url, {
        headers: {
          Accept: "text/event-stream",
          Authorization: `Bearer ${authToken}`,
        },

        onopen(res) {
          if (res.ok && res.status === 200) {
            console.log("Connection made to", url);
          } else if (res.status === 401) {
            refreshToken().then((newToken) => {
              if (newToken) {
                subscribeToAnnouncements(url, newToken);
              }
            });
          } else if (
            res.status >= 400 &&
            res.status < 500 &&
            res.status !== 429
          ) {
            console.error("Client side error", res);
          }
          return Promise.resolve();
        },
        onmessage(event) {
          const { event: header, data: text } = event;
          addNotification({
            title: header,
            message: text,
            theme: "light",
            duration: 3000,
            silent: false,
            backgroundTop: "#03a9f4",
            backgroundBottom: "#ffffff",
            colorTop: "#ffffff",
          });
        },
        onclose() {
          console.log("Connection closed by the server");
        },
        onerror(err) {
          console.error("Server error", err);
        },
      });
    },
    [refreshToken]
  );

  useEffect(() => {
    if (token) {
      console.log("Subscribing to announcements...");
      subscribeToAnnouncements(
        "http://localhost:8081/api/v1/announcements/subscribe",
        token
      );
      if (
        data &&
        (currentUser?.roles.includes(Role.STUDENT) ||
          currentUser?.roles.includes(Role.PROFESSOR))
      ) {
        console.log("Subscribing to announcements...");

        const userName = data?.username;
        console.log("username", userName);
        subscribeToAnnouncements(
          `http://localhost:8081/api/v1/announcements/subscribe/${userName}`,
          token
        );
      }
    }
  }, [token, currentUser, subscribeToAnnouncements]);

  return {};
};
