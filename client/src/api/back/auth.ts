import { LOGIN, PERSON_DATA, REGISTER, UPLOAD_IMG } from 'src/const/api/url';
import { backCall } from '../api';

export const loginHandler = (body: AuthRequest) => backCall.post<AuthRequest, AuthResponse>(LOGIN, body);

export const registerHandler = (body: AuthRequest) => backCall.post<AuthRequest, AuthResponse>(REGISTER, body);

export const dataPersonHandler = () => backCall.get<AuthGetPersonToken>(PERSON_DATA);

export const uploadHandler = (body: FormData) =>
  backCall.post<FormData, AuthGetPersonToken>(UPLOAD_IMG, body, {}, true);

export const updateUser = async (body: Partial<AuthGetPersonToken>) =>
  backCall.put<Partial<AuthGetPersonToken>, AuthGetPersonToken>(PERSON_DATA, body);
