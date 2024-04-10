import * as yup from "yup";
import validate from "../../../utils/validate";

export const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const validateLogin = (input) => validate(loginSchema)(input);
export default validateLogin;
