import axios from 'axios';

/**
 * Determine the API base URL.
 *
 * - In development: Vite proxy forwards /api → localhost:5000 (see vite.config.js)
 * - In production: VITE_API_URL is set at build time on Vercel
 *
 * Handles both formats of VITE_API_URL:
 *   "https://backend.onrender.com"      → appends /api
 *   "https://backend.onrender.com/api"  → uses as-is
 */
function getBaseURL() {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl) return '/api'; // Development: use Vite proxy

  // Normalise: strip trailing slash, ensure /api suffix
  const cleaned = envUrl.replace(/\/+$/, '');
  return cleaned.endsWith('/api') ? cleaned : `${cleaned}/api`;
}

const api = axios.create({
  baseURL: getBaseURL(),
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000, // 30s — reasonable for Render cold starts
});

// Response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export const fetchProjects = (params) => api.get('/projects', { params });
export const fetchSkills = () => api.get('/skills');
export const submitContactForm = (data) => api.post('/contact', data);

export default api;
