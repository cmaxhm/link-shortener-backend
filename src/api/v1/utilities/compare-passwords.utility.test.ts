import { comparePasswords } from './compare-passwords.utility';
import { hashPassword } from './hash-password.utility';

describe('Utilities: Compare Passwords', () => {
  it('should compare passwords', async () => {
    const password = 'password';
    const hashedPassword = await hashPassword('password');
    const result = await comparePasswords(password, hashedPassword);

    expect(result).toBeTruthy();
  });
});
