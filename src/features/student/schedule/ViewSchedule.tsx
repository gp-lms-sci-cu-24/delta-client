import { Scheduler } from "@aldabil/react-scheduler";
import PlaceIcon from "@mui/icons-material/Place";
import PersonIcon from "@mui/icons-material/Person";
import ClassTwoToneIcon from "@mui/icons-material/ClassTwoTone";
import Groups2TwoToneIcon from "@mui/icons-material/Groups2TwoTone";
import { Typography } from "@mui/material";
import ViewerExtraComponent from "./components/ViewerExtraComponent";
import { useGetMyScheduleQuery } from "./scheduleApiSlice";
import { ClassType } from "@features/shared";
import { dayAndTimeToDate } from "@utils/helpers";

function ViewSchedule() {
  const { data, isLoading } = useGetMyScheduleQuery();
  const colorDependOnClass = (classType: ClassType) =>
    classType === ClassType.LABORATORY_SECTION
      ? "darkorange"
      : classType === ClassType.THEORETICAL_LECTURE
        ? "darkcyan"
        : "darkblue";
  const events = data?.map((event, idx) => ({
    event_id: idx,
    title: `${event.classType} ${event.course.name}`,
    course: `${event.course.name} (${event.course.code})`,
    professor: `${event.professor.firstName} ${event.professor.lastName}`,
    start: dayAndTimeToDate(event.day, event.startTime),
    end: dayAndTimeToDate(event.day, event.endTime),
    location: `${event.location.name} (${event.location.path})`,
    color: colorDependOnClass(event.classType),
    group: `group ${event.courseGroup}`,
  }));

  console.log("Events:", events);
  console.log("isLoading:", isLoading);

  // useEffect(() => console.log("render"), [isLoading, data]);

  return (
    <Scheduler
      agenda={false}
      // loading={isLoading}
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
        weekDays: [0, 1, 2, 3, 4, 5, 6],
        weekStartOn: 6,
        startHour: 7,
        endHour: 20,
        step: 60,
        navigation: true,
        disableGoToDay: true,
      }}
      navigation={false}
      deletable={false}
      draggable={false}
      editable={false}
      disableViewer={false}
      hourFormat="12"
      // getRemoteEvents={async () => events}
      events={events ?? []}
      // onViewChange={(view, agenda) => console.log("View Changed:", view, "  ,agenda", agenda)}
      // onSelectedDateChange={(date) => console.log("Selected Date:", date)}
    />
  );
}
export default ViewSchedule;
