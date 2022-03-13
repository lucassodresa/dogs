import React, { useCallback, useEffect, useState } from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import resetPasswordSchema from "../../Constants/Schemas/resetPasswordSchema";
import useFetch from "../../Hooks/useFetch";
import { PASSWORD_RESET } from "../../Utils/api";
import Error from "../Helper/Error";
import { hasInvalidField } from "../../Utils/Form";
import { useNavigate } from "react-router-dom";
import Head from "../Helper/Head";

const LoginPasswordReset = () => {
  const [key, setKey] = useState("");
  const [login, setLogin] = useState("");
  const password = useForm(resetPasswordSchema, "password");
  const { loading, error, request } = useFetch();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const fields = [password];
      if (!(await hasInvalidField(fields))) {
        const { url, options } = PASSWORD_RESET({
          login,
          key,
          password: password.value,
        });

        const { response } = await request(url, options);
        if (response.ok) navigate("/login");
      }
    },
    [key, login, password, request, navigate]
  );

  useEffect(() => {
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const key = params.get("key");
    const login = params.get("login");

    key && setKey(key);
    login && setLogin(login);
  }, []);

  return (
    <section className="animationLeft">
      <Head title="Reset password" />
      <h1 className="title">Reset password</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="New Password"
          type="password"
          name="password"
          {...password}
        />
        <Button loading={loading}>Reset</Button>
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginPasswordReset;
