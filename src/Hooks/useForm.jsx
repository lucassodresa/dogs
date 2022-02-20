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
    [value]
  );

  const onChange = useCallback(
    ({ target }) => {
      error && validate(target.value);
      setValue(target.value);
    },
    [error]
  );

  const onBlur = useCallback(() => {
    validate(value);
  }, [value]);

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
