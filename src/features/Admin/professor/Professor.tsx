import { useGetProfessorQuery } from "./professorApiSlice";
import ProfessorDataCard from "./components/ProfessorDataCard";
import { useParams } from "react-router-dom";
import { Gender } from "../student/type";
import { Degree } from "./types";
import { Box, FormControlLabel, Switch } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import AssigendUsers from "./components/AssigendUsers";
import { useSnackbar } from "notistack";
import { Role, UserStateDto } from '../../auth/types';
import {
  useAssignAcadmicAdvisorRoleMutation,
  useAssignUserToAcadmicAdvisorMutation,
  useRemoveAcadmicAdvisorRoleMutation,
} from "./acadmicadvisorApiSlice";
import { useResponsiveStack } from "@/services/responsive";
import Loading from "@/components/Loading";
import { InputField } from "@/components/inputs/InputField";
import CustomButton from "@/components/buttons/CustomButton";

export default function Professor() {
  const { id } = useParams();
  const { data, isLoading } = useGetProfessorQuery(id ?? "");
  const [assignAcadmicAdvisor] = useAssignAcadmicAdvisorRoleMutation();
  const [removeAcadmicAdvisor] = useRemoveAcadmicAdvisorRoleMutation();
  const [assignUser] = useAssignUserToAcadmicAdvisorMutation();
  const { enqueueSnackbar } = useSnackbar();

  const [isAcadmic, setIsAcadmic] = useState<boolean>(
    data?.roles.includes(Role.ACADEMIC_ADVISOR) ?? false
  );
  const { isSmallDown } = useResponsiveStack();

  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    if (data) setIsAcadmic(data.roles.includes(Role.ACADEMIC_ADVISOR));
  }, [data]);

  if (isLoading) return <Loading />;

  const handelchangetype = async (
    _event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const user: UserStateDto = {
      username: data?.username ?? "",
    };
    if (checked) {
      console.log("user", user);
      await assignAcadmicAdvisor(user)
        .unwrap()
        .then((res) => {
          setIsAcadmic(true);
          enqueueSnackbar(`${user.username} is now academic advisor`, {
            variant: "success",
          });
          console.log("ressss", res);
        })
        .catch((e) => {
          enqueueSnackbar(`failed to make ${user.username} academic advisor`, {
            variant: "error",
          });
          console.log("error", e);
        });
    } else {
      await removeAcadmicAdvisor(user)
        .unwrap()
        .then((res) => {
          setIsAcadmic(true);
          enqueueSnackbar(`${user.username} isn't academic advisor no more`, {
            variant: "success",
          });
          console.log("ressss", res);
        })
        .catch((e) => {
          enqueueSnackbar(
            "failed to make ${user.username} not acadmic advisor",
            {
              variant: "error",
            }
          );
          console.log("error", e);
        });
    }
  };

  function handeladdclick() {
    assignUser([data?.username ?? "", userName])
      .then((res) => {
        if (res.data) {
          enqueueSnackbar(
            `${data?.username} is now the academic advisor of ${userName}`,
            {
              variant: "success",
            }
          );
        } else {
          enqueueSnackbar(
            `failed to make ${data?.username} academic advisor for ${userName}`,
            {
              variant: "error",
            }
          );
        }
        console.log("ressss", res);
      })
      .catch(() => {
        enqueueSnackbar(
          `failed to make ${data?.username} academic advisor for ${userName}`,
          {
            variant: "error",
          }
        );
      });
  }

  return (
    <>
      <ProfessorDataCard
        firstName={data?.firstName ?? ""}
        lastName={data?.lastName ?? ""}
        degree={data?.degree ?? Degree.BACHELOR}
        gender={data?.gender ?? Gender.MALE}
        email={data?.email ?? ""}
        roles={data?.roles ?? []}
        username={data?.username ?? ""}
        profilePicture={""}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: isSmallDown ? "column" : "row",
          p: 2,

          borderRadius: 1,
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={data?.roles.includes(Role.ACADEMIC_ADVISOR)}
              sx={{ marginLeft: 4 }}
              onChange={handelchangetype}
            />
          }
          label="Acadmic Advisor"
        />
        {isAcadmic && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              mt: isSmallDown ? 2 : 0,
            }}
          >
            <InputField
              label="User Name"
              setValue={(event) => {
                setUserName(event.target.value);
              }}
              customSx={{ marginRight: 2 }}
              value={userName}
              variant={"outlined"}
              error={false}
            />
            <CustomButton
              title="Assign user"
              variant={"contained"}
              disableElevation
              onClick={handeladdclick}
              customSx={{ textTransform: "capitalize" }}
              disableRipple
              size="small"
            />
          </Box>
        )}
      </Box>
      {isAcadmic && <AssigendUsers username={data?.username ?? ""} />}
    </>
  );
}
