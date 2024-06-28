import { Scheduler } from "@aldabil/react-scheduler";
import PlaceIcon from "@mui/icons-material/Place";
import PersonIcon from "@mui/icons-material/Person";
import ClassTwoToneIcon from "@mui/icons-material/ClassTwoTone";
import Groups2TwoToneIcon from "@mui/icons-material/Groups2TwoTone";
import { Typography } from "@mui/material";
import ViewerExtraComponent from "./components/ViewerExtraComponent";
import events from "./Events";
function ViewSchedule() {
  return (
    <Scheduler
      agenda={false}
      month={null}

      viewerExtraComponent={(_fields, event) => {
        const handleClick = () => {
          console.log("Location clicked:", event.location);
        };
        return (
          <div>
            <ViewerExtraComponent
              handleClick={handleClick}
              icon={<PlaceIcon />}
              title={event.location}
            />
            <ViewerExtraComponent
              handleClick={handleClick}
              icon={<PersonIcon />}
              title={event.professor}
            />
            <ViewerExtraComponent
              handleClick={handleClick}
              icon={<ClassTwoToneIcon />}
              title={event.course}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Groups2TwoToneIcon
                style={{
                  marginRight: "5px",
                  color: "#666666",
                  fontSize: "25px",
                }}
              />
              <Typography
                sx={{
                  color: "#666666",
                  fontSize: "12px",
                  fontWeight: "lighter",
                }}
              >
                {event.group}
              </Typography>
            </div>
          </div>
        );
      }}
      day={{
        startHour: 7,
        endHour: 20,
        step: 60,
        navigation: true,
      }}
      view="week"
      week={{
        weekDays: [0, 1, 2, 3, 4, 5,6],
        weekStartOn: 6,
        startHour: 7,
        endHour: 20,
        step: 60,
        navigation: true,
        disableGoToDay: true,
      }}
      deletable={false}
      draggable={false}
      editable={false}
      disableViewer={false}
      hourFormat="12"
      events={events}
    />
  );
}
export default ViewSchedule;
