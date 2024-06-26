import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import SignInPage from "@/features/auth/pages/SignInPage";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/SignInPage">
        <SignInPage />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
