import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text } from 'react-native';
import '../lib/i18n';

class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean }
> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): { hasError: boolean } {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('App Error Boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            textAlign: 'center',
                            marginBottom: 10,
                        }}
                    >
                        Something went wrong
                    </Text>
                    <Text style={{ textAlign: 'center', color: '#666' }}>
                        Please restart the app
                    </Text>
                </View>
            );
        }

        return this.props.children;
    }
}

export default function Layout() {
    return (
        <ErrorBoundary>
            <SafeAreaProvider>
                <Stack screenOptions={{ headerShown: false }} />
            </SafeAreaProvider>
        </ErrorBoundary>
    );
}
