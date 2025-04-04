import { createSha256 } from './crypto.helper';

/**
 * Generates headers containing a SHA-256 hash and a timestamp.
 *
 * @param data - Optional string data to include in the hash calculation.
 * @returns An object containing the timestamp and the SHA-256 hash.
 *
 * @property {number} x-shipppee-timestamp - The current timestamp in milliseconds.
 * @property {string} x-shipppee-sha-256 - The SHA-256 hash of the data and timestamp.
 */
export const getHeaderSha256 = (data?: string) => {
  const timestamp = Date.now();
  let hash = '';

  if (data) {
    hash = createSha256(`${data}${timestamp}`);
  } else {
    hash = createSha256(`${timestamp}`);
  }

  return {
    'x-shipppee-timestamp': timestamp,
    'x-shipppee-sha-256': hash,
  };
};
