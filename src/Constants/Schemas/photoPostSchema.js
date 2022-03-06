import { object, string, number } from "yup";
const photoPostSchema = object({
  name: string().required(),
  weight: number().positive().required(),
  age: number().positive().required(),
});

export default photoPostSchema;
