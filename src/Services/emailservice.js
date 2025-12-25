export const sendEmail = async (formData) => {
  const FORM_ID = "YOUR_FORM_ID";

  const response = await fetch(`https://formspree.io/f/${FORM_ID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'envoi de l'email");
  }

  return await response.json();
};
