import { Link } from "react-router-dom";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import loginSchema from "../../Constants/Schemas/loginSchema";
import { hasInvalidField } from "../../Utils/Form";
import { TOKEN_POST, USER_GET } from "../../Utils/api";
import { useCallback, useEffect } from "react";

const LoginForm = () => {
  const username = useForm(loginSchema, "username");
  const password = useForm(loginSchema, "password");
  const fields = [username, password];

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token && getUser(token);
  }, []);

  const getUser = useCallback(async (token) => {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!(await hasInvalidField(fields))) {
        const { url, options } = TOKEN_POST({
          username: username.value,
          password: password.value,
        });

        const response = await fetch(url, options);
        const json = await response.json();
        window.localStorage.setItem("token", json.token);
        getUser(json.token);
      }
    },
    [...fields]
  );

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
