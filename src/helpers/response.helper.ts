export class ResponseHelper {
  onSuccess(response: any, code: number, message: string, data?: object) {
    return response.status(code).json({
      message: message,
      data: data,
      status: code,
    });
  }
  onError(data: object) {
    throw data;
  }
}

export interface IResponse {
  statusCode: number;
  message: string;
  data?: object;
}
