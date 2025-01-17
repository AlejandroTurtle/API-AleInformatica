import { HttpResponse } from '../Models/HttpResponseModel';

export const ok = async (data: any): Promise<HttpResponse> => ({
  statusCode: 200,
  body: data,
});

export const noContent = async (): Promise<HttpResponse> => ({
  statusCode: 404,
  body: null,
});

export const badRequest = async (error: Error): Promise<HttpResponse> => ({
  statusCode: 400,
  body: error.message,
});

export const created = async (successMessage: string): Promise<HttpResponse> => ({
  statusCode: 201,
  body: {
    message: successMessage,
  },
});
