import { ImageListType } from "react-images-uploading";

export type FileUploadProps = {
  onChange: (
    value: ImageListType,
    addUpdatedIndex?: number[] | undefined
  ) => void;
  value: ImageListType;
  inputProps?: React.HTMLProps<HTMLInputElement>;
};
