import React, { useCallback, useContext } from "react";
import registerSchema from "../../Constants/Schemas/registerSchema";
import { UserContext } from "../../Contexts/UserContext";
import useFetch from "../../Hooks/useFetch";
import useForm from "../../Hooks/useForm";
import { USER_POST } from "../../Utils/api";
import { hasInvalidField } from "../../Utils/Form";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Error from "../Helper/Error";

const LoginCreate = () => {
  const username = useForm(registerSchema, "username");
  const email = useForm(registerSchema, "email");
  const password = useForm(registerSchema, "password");
  const { userLogin } = useContext(UserContext);
  const { loading, error, request } = useFetch();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const fields = [username, email, password];
      if (!(await hasInvalidField(fields))) {
        const { url, options } = USER_POST({
          username: username.value,
          email: email.value,
          password: password.value,
        });
        const { response } = await request(url, options);
        response?.ok && userLogin(username.value, password.value);
        console.log(response);
      }
    },
    [username, email, password]
  );

  return (
    <section className="animationLeft">
      <h1 className="title">Register</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Username" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Password" type="password" name="password" {...password} />
        <Button loading={loading}>Register</Button>
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;
