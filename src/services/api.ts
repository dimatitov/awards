import axios from 'axios';
import { Categories, ChoiseR, Voteses } from './interfaces';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const loginUser = (name: string) => api.post('/auth/login', { name });
export const getCategories = () => api.get<Categories>('/categories');
export const getCategory = (category: string) => api.get(`/categories/${category}`);
export const saveChoice = (userId: string, category: string, choice: number, choiceName: string) =>
  api.post('/choices', { userId, category, choice, choiceName });
export const getChoice = (userId: string, category: string) =>
  api.get<ChoiseR>(`/choices/${userId}/${category}`);
export const gerUserInfo = (userId: string) =>
  api.get<{name: string}>(`/user/${userId}`);
export const gerAllVotes = () =>
  api.get<Voteses>(`/choices/votes`);
export const getVotes = (categoryId: string) =>
  api.get<Voteses>(`/choices/votes/${categoryId}`);
