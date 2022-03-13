import { object, string } from "yup";
const lostPasswordSchema = object({
  username: string().required(),
});

export default lostPasswordSchema;
