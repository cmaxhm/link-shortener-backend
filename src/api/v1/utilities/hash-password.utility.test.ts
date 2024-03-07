import { hashPassword } from './hash-password.utility';

describe('Utilities: Hash Password', () => {
  it('should hash password', async () => {
    const password = 'password';
    const hashedPassword = await hashPassword(password);

    expect(hashedPassword).not.toEqual(password);
  });
});
