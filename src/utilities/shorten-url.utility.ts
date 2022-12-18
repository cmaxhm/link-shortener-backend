export const generateUrlId = () => {
  const charset: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  let max: number = 6;
  let generatedUrlId: string = '';

  for (let i = 0; i < max; i++) {
    generatedUrlId += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return generatedUrlId;
};

generateUrlId();
