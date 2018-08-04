import { Request } from 'express';

export abstract class RequestData {
  data: any;
  protected static parseFromHttp(request: Request) {
    throw new Error('Cannot call on abstract class');
  }
}
