import { generateJwt } from './generate-jwt.utility';

describe('Utilities: Generate JWT', () => {
  process.env.API_SECRET_KEY = 'test';
  process.env.JWT_EXPIRATION_TIME = '30d';

  it('should generate a JWT', async () => {
    const payload = {
      id: 1,
      username: 'test',
      email: 'test@test.com'
    };
    const jwtResponse = generateJwt(payload);

    expect(jwtResponse).toHaveProperty('id');
    expect(jwtResponse).toHaveProperty('username');
    expect(jwtResponse).toHaveProperty('email');
    expect(jwtResponse).toHaveProperty('token');
  });
});

