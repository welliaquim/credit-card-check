export function stringCardFormater(input) {
  input = input.replaceAll(/\D/g, "");
  input = input.replaceAll(/(\d{4})(?=\d)/gv, "$1 ");

  return input;
}
