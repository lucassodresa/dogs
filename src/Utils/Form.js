const hasInvalidField = async (fields) =>
  (await Promise.all(fields.map(({ validate }) => validate()))).filter(
    (status) => !status
  ).length > 0;

export { hasInvalidField };
