import { Response, Send } from 'express';
import { generateErrorResponse } from './generate-error-response.utility';

class MockResponse {
  public statusCode: number;
  public json: Send;

  constructor() {
    this.statusCode = 200;
    this.json = (data: any) => data;
  }

  public status(statusCode: number): MockResponse {
    this.statusCode = statusCode;

    return this;
  }
}

describe('Utilities: Generate Error Response', () => {
  it('should generate an error response', async () => {
    const response: MockResponse = new MockResponse();
    const result = generateErrorResponse(response as Response, 500, 'An error occurred', new Error('An error occurred'));


    expect(result.statusCode).toEqual(500);
  });
});
