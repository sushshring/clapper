interface HttpError extends Error {
  status?: number;
}

interface HttpErrorConstructor {
  new(message?: string, status?: number): HttpError;
  (message?: string, status?: number): HttpError;
  readonly prototype: HttpError;
}

declare const HttpError: HttpErrorConstructor;
