import AsyncStorage from '@react-native-async-storage/async-storage';

export class RequestHandler {
  static async addAuthHeader(config) {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return config;
    }
  }

  static handleResponse(response) {
    return response.data;
  }
}