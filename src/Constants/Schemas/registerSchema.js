import { object, string } from "yup";
const registerSchema = object({
  username: string().required(),
  email: string().email().required(),
  password: string().required(),
});

export default registerSchema;
