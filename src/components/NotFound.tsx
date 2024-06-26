import Stack from "@mui/material/Stack";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface NotFoundProps {
  home?: string;
}

const NotFound: FunctionComponent<NotFoundProps> = ({ home = "/" }) => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <h1>😥</h1>
      <h2>404 | Page Not Found</h2>
      <Link
        to={home}
        style={{ fontWeight: "bold", textDecoration: "underline" }}
      >
        Go Home
      </Link>
    </Stack>
  );
};

export default NotFound;
