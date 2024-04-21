export default function validateFormData(
  formData: Record<string, { text: string; isError: boolean }>,
) {
  let isFormValid = true;
  const validatedFormData: Record<string, { text: string; isError: boolean }> =
    {};

  for (const key in formData) {
    if (key !== "lastName") {
      const value = formData[key].text;

      if (!value) {
        validatedFormData[key] = {
          text: value,
          isError: true,
        };
        isFormValid = false;
      } else {
        validatedFormData[key] = {
          text: value,
          isError: false,
        };
      }
    }
  }

  return {
    isFormValid,
    validatedFormData,
  };
}
