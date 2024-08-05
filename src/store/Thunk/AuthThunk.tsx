import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

interface AuthDto {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

interface LoginError {
    message: string;
}

export const loginThunk = createAsyncThunk<LoginResponse, AuthDto, { rejectValue: LoginError }>(
    'login',
    async (authDto: AuthDto, { rejectWithValue }) => {
        try {
            const response = await axios.post<LoginResponse>('/api/v1/auth/login', authDto);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data as LoginError);
            }
            return rejectWithValue({ message: 'Bilinmeyen bir hata oluştu.' });
        }
    }
);


