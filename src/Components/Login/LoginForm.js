import { Link } from "react-router-dom";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import loginSchema from "../../Constants/Schemas/loginSchema";
import { hasInvalidField } from "../../Utils/Form";
import { useCallback, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import Error from "../Helper/Error";
import styles from "./LoginForm.module.css";
import stylesButton from "../Forms/Button.module.css";

const LoginForm = () => {
  const username = useForm(loginSchema, "username");
  const password = useForm(loginSchema, "password");
  const { userLogin, error, loading } = useContext(UserContext);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const fields = [username, password];
      if (!(await hasInvalidField(fields))) {
        userLogin(username.value, password.value);
      }
    },
    [username, password, userLogin]
  );

  return (
    <section className="animationLeft">
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Username" name="username" {...username} />
        <Input label="Password" type="password" name="password" {...password} />
        <Button loading={loading}>Log in</Button>
        <Error error={error} />
      </form>
      <Link className={styles.lost} to="/login/lost">
        Forgot password
      </Link>
      <div className={styles.register}>
        <h2 className={styles.subtitle}>Register</h2>
        <p>Have not had an account yet? Create now.</p>
        <Link className={stylesButton.button} to="/login/create">
          Register
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
