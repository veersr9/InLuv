export class ErrorHandler {
  static handleError(error) {
    if (error.response) {
      const { status, data } = error.response;
      return Promise.reject(new Error(data.detail || `Error ${status}`));
    } else if (error.request) {
      return Promise.reject(new Error('Network error - Check your connection'));
    } else {
      return Promise.reject(new Error(error.message || 'Unexpected error'));
    }
  }
}