import React, { useCallback } from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import lostPasswordSchema from "../../Constants/Schemas/lostPasswordSchema";
import useFetch from "../../Hooks/useFetch";
import { PASSWORD_LOST } from "../../Utils/api";
import Error from "../Helper/Error";
import { hasInvalidField } from "../../Utils/Form";
const LoginLostPassword = () => {
  const username = useForm(lostPasswordSchema, "username");
  const { data, loading, error, request } = useFetch();
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const fields = [username];
      if (!(await hasInvalidField(fields))) {
        const { origin } = window.location;
        const { url, options } = PASSWORD_LOST({
          login: username.value,
          url: `${origin}/login/reset`,
        });
        const { json } = await request(url, options);
      }
    },
    [username, request]
  );

  return (
    <section>
      <h1 className="title">Lost password</h1>
      {data ? (
        <p style={{ color: "#4c1" }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input
            label="Email / User"
            type="text"
            name="username"
            {...username}
          />
          <Button loading={loading}>Send Email</Button>
          <Error error={error} />
        </form>
      )}
    </section>
  );
};

export default LoginLostPassword;
