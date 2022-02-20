import { object, string } from "yup";
const loginSchema = object({
  username: string().required(),
  password: string().required(),
});

export default loginSchema;
