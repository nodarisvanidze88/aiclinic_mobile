import axios from 'axios';

const API_BASE =
    process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.aiclinic.bio';

export const api = axios.create({
    baseURL: API_BASE,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function chat(message: string): Promise<string> {
    try {
        const { data } = await api.post('/api/chat', { message });
        return data.reply ?? 'No response received';
    } catch (error) {
        console.error('Chat API error:', error);
        if (axios.isAxiosError(error)) {
            if (error.code === 'NETWORK_ERROR') {
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
        }
        throw new Error('Failed to send message. Please try again.');
    }
}
