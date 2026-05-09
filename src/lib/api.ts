import axios from 'axios';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'http://your-wordpress-site.local/wp-json';

const apiClient = axios.create({
  baseURL: WP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for JWT Auth
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('estateai_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const propertyApi = {
  getProperties: () => apiClient.get('/estateai/v1/properties'),
  getProperty: (id: string) => apiClient.get(`/estateai/v1/property/${id}`),
  searchProperties: (params: any) => apiClient.get('/estateai/v1/search', { params }),
  getRecommendations: () => apiClient.get('/estateai/v1/recommendations'),
};

export const authApi = {
  login: (credentials: any) => apiClient.post('/jwt-auth/v1/token', credentials),
  validateToken: () => apiClient.post('/jwt-auth/v1/token/validate'),
};

export default apiClient;
