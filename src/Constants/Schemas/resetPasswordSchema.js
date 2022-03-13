import { object, string } from "yup";
const resetPasswordSchema = object({
  password: string().required(),
});

export default resetPasswordSchema;
