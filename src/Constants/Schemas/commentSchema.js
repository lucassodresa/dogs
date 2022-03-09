import { object, string } from "yup";
const commentSchema = object({
  comment: string().required(),
});

export default commentSchema;
