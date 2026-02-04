import * as bcrypt from 'bcrypt';

/**
 * Generate hashed password
 */
export async function hashPassword(
  password: string,
  saltRounds: number = 10,
): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}

/**
 * Compare plain password with hash
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
