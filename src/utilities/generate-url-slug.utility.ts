/**
 * Generates a random URL slug.
 */
export const generateUrlSlug = () => {
  const charset: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_';
  let max: number = 10;
  let generatedUrlId: string = '';

  for (let i = 0; i < max; i++) {
    generatedUrlId += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return generatedUrlId;
};
