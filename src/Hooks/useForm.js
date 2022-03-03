import { useCallback, useState } from "react";

const useForm = (schema, fieldName) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);

  const validate = useCallback(
    async (value) => {
      try {
        await schema.validateAt(fieldName, {
          [fieldName]: value,
        });
        setError(null);
        return true;
      } catch ({ message }) {
        setError(message);
        return false;
      }
    },
    [fieldName, schema]
  );

  const onChange = useCallback(
    ({ target }) => {
      error && validate(target.value);
      setValue(target.value);
    },
    [error, validate]
  );

  const onBlur = useCallback(() => {
    validate(value);
  }, [value, validate]);

  return {
    value,
    error,
    setValue,
    onChange,
    onBlur,
    validate: () => validate(value),
  };
};

export default useForm;
