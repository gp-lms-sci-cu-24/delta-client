import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { grey } from "@mui/material/colors";
import { useTheme } from "@mui/material"
// todo add props interface
const SearchInput = () => {
  const theme = useTheme();
  return (
    <Paper
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        width: 280,
        maxWidth: 400,
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
        borderRadius: "99999px",
        backgroundColor: theme.palette.mode === "light" ? "#E3E3E3" : grey[900],
        flexDirection: "row-reverse",
        transition: "width 0.3s ease-in-out",
        "&:focus-within": {
          width: 400,
          [theme.breakpoints.down("md")]: {
            width: 250,
          },
        },
        boxShadow: "none",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={"search"}
        inputProps={{ "aria-label": "search" }}
      />
      <IconButton type="button" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
