import bcrypt from 'bcryptjs';

/**
 * Compares a password to a hash using bcrypt.
 *
 * @param password The password in plain text to compare.
 * @param hash The hash to compare the password to.
 */
export async function comparePasswords(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}
