export function maskCardNumber(num: string | number): string {
  const str = num.toString();
  const last4 = str.slice(-4); // take last 4 digits
  return "****" + last4;
}
