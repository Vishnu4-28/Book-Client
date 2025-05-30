import api from './api';

export interface SignupData {
    first_Name: string;
    last_Name: string;
    date_Of_Birth: string;
    phone_Number: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        first_Name: string;
        last_Name: string;
    };
}

export const signup = async (data: SignupData): Promise<AuthResponse> => {
    try {
        console.log("data",data);
        
        const response = await api.post<AuthResponse>('/Auth/Signup', data);
        // Store token in localStorage
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Signup failed');
        }
        throw new Error('Network error occurred');
    }
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
    try {
        const response = await api.post<AuthResponse>('/Auth/SignIn', data);
        // Store token in localStorage
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Login failed');
        }
        throw new Error('Network error occurred');
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};


export const getCurrentUser = async (): Promise<AuthResponse['user']> => {
    try {
        const response = await api.get<AuthResponse>('/auth/me');
        return response.data.user;
    } catch (error: any) {
        if (error.response?.status === 401) {
            logout();
        }
        throw error;
    }
}; 
