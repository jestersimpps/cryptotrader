import * as HttpStatus from 'http-status-codes';

/**
 * Build error response for validation errors.
 *
 * @param  {error} err
 * @return {array|object}
 */
export function buildError(err: any) {
  // Validation errors
  if (err.isJoi || err instanceof SyntaxError) {
    return {
      code: HttpStatus.BAD_REQUEST,
      message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
      details:
        err.details &&
        err.details.map((error: any) => {
          return {
            message: error.message,
            param: error.path
          };
        })
    };
  }

  // HTTP errors
  if (err.isBoom) {
    return {
      code: err.output.statusCode,
      message: err.output.payload.message || err.output.payload.error
    };
  }

  return {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
  };
}
