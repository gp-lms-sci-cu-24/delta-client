import { FunctionComponent, useEffect, useState } from "react";
import Loading from "@components/Loading";
import { Outlet, useLocation } from "react-router-dom";

export interface LoadingLayoutProps {
  loading?: boolean;
  enableProgress?: boolean;
  loadingComponent?: JSX.Element;
}

const LoadingLayout: FunctionComponent<LoadingLayoutProps> = ({
  loading = false,
  enableProgress = false,
  loadingComponent = <Loading />,
}) => {
  const [progress, setProgress] = useState(false);
  const [prevLoc, setPrevLoc] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (!enableProgress) return;

    setPrevLoc(location.pathname);
    setProgress(true);
    if (location.pathname === prevLoc) {
      setPrevLoc("");
    }
  }, [location]);

  useEffect(() => {
    setProgress(false);
  }, [prevLoc]);

  return loading || progress ? loadingComponent : <Outlet />;
};

export default LoadingLayout;
