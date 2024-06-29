import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import SignInPage from "@/features/auth/pages/SignInPage";
import CourseRegistration from "@features/student/course-registration/CourseRegistration.tsx";
import App from "@/App.tsx";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/SignInPage">
        <SignInPage />
      </ComponentPreview>
      <ComponentPreview path="/CourseRegistration">
        <CourseRegistration />
      </ComponentPreview>
      <ComponentPreview path="/App">
        <App />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
