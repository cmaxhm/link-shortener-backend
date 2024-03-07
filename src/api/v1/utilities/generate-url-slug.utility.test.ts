import { generateUrlSlug } from './generate-url-slug.utility';

describe('Utilities: Generate URL Slug', () => {
  it('should generate a URL slug', async () => {
    const slug = generateUrlSlug();

    expect(slug.length).toBeLessThanOrEqual(10);
  });
});
