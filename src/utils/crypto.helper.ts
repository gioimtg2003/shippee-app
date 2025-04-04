import { SHA256 } from 'crypto-js';

/**
 * Generates a SHA-256 hash of the provided data concatenated with a secret key.
 *
 * @param data - The input string to be hashed.
 * @returns The SHA-256 hash of the input data as a string.
 */
export const createSha256 = (data: string) => {
  return SHA256(data + process.env.NEXT_PUBLIC_HASH_SECRET_KEY).toString();
};
