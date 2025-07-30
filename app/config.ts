import Constants from 'expo-constants';

interface Config {
    API_BASE_URL: string;
    APP_ENV: 'development' | 'staging' | 'production';
    DEBUG: boolean;
}

const getConfig = (): Config => {
    const isProduction = Constants.expoConfig?.extra?.NODE_ENV === 'production';
    const isDevelopment = !isProduction;

    return {
        API_BASE_URL: isProduction
            ? 'https://api.aiclinic.bio'
            : __DEV__
            ? 'http://localhost:8000'
            : 'https://api.aiclinic.bio',
        APP_ENV: isProduction ? 'production' : 'development',
        DEBUG: isDevelopment && __DEV__,
    };
};

export const config = getConfig();

export default {
    expo: {
        name: 'AIClinic',
        slug: 'aiclinic',
        scheme: 'aiclinic',
        version: '1.0.0',
        userInterfaceStyle: 'dark',
        ios: { bundleIdentifier: 'bio.aiclinic.app' },
        android: { package: 'bio.aiclinic.app' },
    },
};
