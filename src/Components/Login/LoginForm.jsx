import { Link } from "react-router-dom";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import loginSchema from "../../Constants/Schemas/loginSchema";
import { hasInvalidField } from "../../Utils/Form";

const LoginForm = () => {
  const username = useForm(loginSchema, "username");
  const password = useForm(loginSchema, "password");

  async function handleSubmit(event) {
    event.preventDefault();
    const fields = [username, password];

    if (!(await hasInvalidField(fields))) {
      const response = await fetch(
        "https://dogsapi.origamid.dev/json/jwt-auth/v1/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input label="Username" name="username" {...username} />
        <Input label="Password" type="password" name="password" {...password} />
        <Button>Log in</Button>
      </form>

      <Link to="/login/create">Register</Link>
    </section>
  );
};

export default LoginForm;
