export const stringCardFormater = (input) => {
  input = input.replace(/\D/g, '');
  input = input.replace(/(\d{4})(?=\d)/g, '$1 ');
  return input;
};
