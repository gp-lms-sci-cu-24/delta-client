import { ObjectSchema } from "yup";
import { LoginInputs } from "./types";
import * as yup from "yup";

const loginSchema: ObjectSchema<LoginInputs> = yup.object().shape({
  username: yup.string().required("Username is Required!").min(3).max(50),
  password: yup.string().required("Password is Required!").min(3).max(50),
});

export default loginSchema;
