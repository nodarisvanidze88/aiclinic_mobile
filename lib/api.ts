import axios from 'axios';
import { config } from '../app/config';

const API_BASE = process.env.EXPO_PUBLIC_API_BASE_URL || config.API_BASE_URL;

export const api = axios.create({
    baseURL: API_BASE,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function chat(message: string): Promise<string> {
    try {
        if (config.DEBUG) {
            console.log('Sending chat message:', {
                message,
                apiBase: API_BASE,
            });
        }

        const { data } = await api.post('/api/chat', { message });

        if (config.DEBUG) {
            console.log('Chat API response:', data);
        }

        return data.reply ?? 'No response received';
    } catch (error) {
        if (config.DEBUG) {
            console.error('Chat API error:', error);
        }

        if (axios.isAxiosError(error)) {
            if (error.code === 'NETWORK_ERROR' || error.code === 'ENOTFOUND') {
                throw new Error(
                    'Network connection failed. Please check your internet connection.'
                );
            }
            if (error.response?.status === 404) {
                throw new Error(
                    'API endpoint not found. Please contact support.'
                );
            }
            if (error.response && error.response.status >= 500) {
                throw new Error('Server error. Please try again later.');
            }
            if (error.response?.status === 429) {
                throw new Error(
                    'Too many requests. Please wait a moment and try again.'
                );
            }
        }
        throw new Error('Failed to send message. Please try again.');
    }
}
