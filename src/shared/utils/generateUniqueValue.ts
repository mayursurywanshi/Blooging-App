export function generateUniqueValue(short: boolean = false): string {
  const time = Date.now().toString(36); // timestamp
  const random = Math.random().toString(36).substring(2, 10);

  const value = `${time}-${random}`;
  return short ? random : value;
}
