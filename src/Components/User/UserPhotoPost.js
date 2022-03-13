import React, { useCallback, useState } from "react";
import styles from "./UserPhotoPost.module.css";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import useForm from "../../Hooks/useForm";
import photoPostSchema from "../../Constants/Schemas/photoPostSchema";
import { hasInvalidField } from "../../Utils/Form";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_POST } from "../../Utils/api";
import { useNavigate } from "react-router-dom";
import Head from "../Helper/Head";

const UserPhotoPost = () => {
  const name = useForm(photoPostSchema, "name");
  const weight = useForm(photoPostSchema, "weight");
  const age = useForm(photoPostSchema, "age");

  const [image, setImage] = useState({});
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const fields = [name, weight, age];
      if (!(await hasInvalidField(fields))) {
        const formData = new FormData();
        formData.append("img", image.raw);
        formData.append("nome", name.value);
        formData.append("peso", weight.value);
        formData.append("idade", age.value);

        const token = window.localStorage.getItem("token");
        const { url, options } = PHOTO_POST(formData, token);
        const { response } = await request(url, options);
        response?.ok && navigate("/account");
      }
    },
    [name, weight, age, image, request, navigate]
  );

  const handleImageChange = useCallback(async ({ target }) => {
    const imageBinary = target.files[0];

    setImage({
      preview: URL.createObjectURL(imageBinary),
      raw: imageBinary,
    });
  }, []);
  return (
    <section className={`${styles.photoPost} animationLeft`}>
      <Head title="Post your photo" />
      <form onSubmit={handleSubmit}>
        <Input label="Name" type="text" name="name" {...name} />
        <Input label="Weight" type="number" name="weight" {...weight} />
        <Input label="Age" type="number" name="age" {...age} />
        <Input
          className={styles.file}
          label="Image"
          type="file"
          name="image"
          id="image"
          onChange={handleImageChange}
        />
        <Button loading={loading}>Send</Button>
        <Error error={error} />
      </form>
      <div>
        {image?.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url(${image?.preview})` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
