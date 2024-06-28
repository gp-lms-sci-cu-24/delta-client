import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import ProfileInfoCard from "./components/ProfileInfoCard";
import ProfilePictureCard from "./components/profilePictureCard";
import EducatinalInfoCard from "./components/EducatinalInfoCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation, useUserStateQuery } from "../auth/authApiSlice";
import { clearCredentials, selectCurrentUserPayload } from "../auth/authSlice";
import { Role } from "../auth/types";
import { StudentDto } from "@features/admin/student/type";
import { Professor } from "@features/admin/professor/types";
import Loading from "@/components/Loading";
import Header from "@/components/Header";

function Profile() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const [userName, setUserName] = useState<string>("Mohammed Atef");
  const [email, setEmail] = useState<string>("mohammedAtef@gmail.com");
  const [address, setAddress] = useState<string>("Giza");
  const [level, setLevel] = useState<string>("Level 4");
  const [department, setDepartment] = useState<string>("CS");
  const [gradePointAverage, setGradePointAverage] = useState<string>("2.9");
  const [totalHours, setTotalHours] = useState<string>("128");
  const [HoursToGrad, setHoursToGrad] = useState<string>("128");
  const [degree, setDegree] = useState<string>("Master");
  const [gender, setGender] = useState<string>("Male");
  const [id, setId] = useState<string>("");
  const [isProf, setIsProf] = useState<boolean>();
  const [profilePicture, setProfilePicture] = useState<string>("");
  const currentUser = useSelector(selectCurrentUserPayload);
  const { data, isLoading } = useUserStateQuery();
  const isAdamic = currentUser?.roles.includes(Role.ACADEMIC_ADVISOR);
  const isProfessor = currentUser?.roles.includes(Role.PROFESSOR) && !isAdamic;
console.log("image", profilePicture); 
  useEffect(() => {
    if (currentUser?.roles.includes(Role.STUDENT)) {
      const student = data as StudentDto;
      if (data) {
        setUserName(student.firstName + " " + student.lastname);
        setAddress(student.address);
        setDepartment(student.department.name);
        setGradePointAverage(student.gpa.toString());
        setLevel(student.level.replace("_", " "));
        setTotalHours(student.creditHours.toString());
        setId(student.username);
        setHoursToGrad(
          (
            student.department.graduationCreditHours - student.creditHours
          ).toString()
        );
        setGender(student.gender);
        setIsProf(false);
        setProfilePicture(student.profilePicture);
      }
    } else {
      const professor = data as Professor;
      if (data) {
        setUserName(professor.firstName + " " + professor.lastName);
        setGender(professor.gender);
        setProfilePicture(professor.profilePicture);
        setEmail(professor.email);
        setDegree(professor.degree);
        setIsProf(true);
        setId(professor.username);
      }
    }
  }, [data, currentUser]);
  if (isLoading) return <Loading />;

  const handleClick = () => {
    if (isAdamic || isProfessor) navigation(`/app/professor/profile/update/${id}`);
    else navigation(`/app/student/profile/update/${id}`);
  };
  const handelLogout = () => {
    dispatch(clearCredentials());
    logout();
  };
  console.log("data", data);
  return (
    <Box sx={{ p: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header pageName={"Profile"} message="" />
        </Grid>
        <Grid  item xs={12} md={3}>
          <ProfilePictureCard
            handelLogout={handelLogout}
            imageUrl={profilePicture}
            userName={userName}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          {isProf ? (
            <ProfileInfoCard
              address={address}
              userName={userName}
              email={email}
              gender={gender}
              handleClick={handleClick}
            />
          ) : (
            <ProfileInfoCard
              address={address}
              userName={userName}
              gender={gender}
              handleClick={handleClick}
            />
          )}

          {isProf ? (
            <EducatinalInfoCard degree={degree} />
          ) : (
            <EducatinalInfoCard
              level={level}
              department={department}
              gradePointAverage={gradePointAverage}
              creditHours={totalHours}
              creditHoursToGrad={HoursToGrad}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
