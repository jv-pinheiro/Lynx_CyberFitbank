export const maskCurrency = (value: string) => {
  if (value === "") return "";
  const onlyDigits = value
    .split("")
    .filter((s) => /\d/.test(s))
    .join("")
    .padStart(3, "0");

  const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2);

  value = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(digitsFloat));

  return value;
};