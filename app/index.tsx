import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
    SafeAreaView,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { chat } from '../lib/api';
import WelcomeScreen from '../components/WelcomeScreen';
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';
import Header from '../components/Header';

type Msg = { id: string; author: 'user' | 'bot'; text: string };

export default function Home() {
    const { t, ready } = useTranslation(); // Add ready state
    const insets = useSafeAreaInsets();
    const [showWelcome, setShowWelcome] = useState(true);
    const [isAppReady, setIsAppReady] = useState(false);
    const [messages, setMessages] = useState<Msg[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const listRef = useRef<FlatList<Msg>>(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Initialize app when translations are ready
    useEffect(() => {
        if (ready) {
            // Small delay to ensure everything is properly loaded
            setTimeout(() => {
                setIsAppReady(true);
            }, 100);
        }
    }, [ready]);

    useEffect(() => {
        if (!showWelcome && messages.length === 0) {
            // Add welcome message when transitioning from welcome screen
            setMessages([{ id: '1', author: 'bot', text: t('botHello') }]);

            // Fade in animation
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }).start();
        }
    }, [showWelcome, t]);

    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => {
                listRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages]);

    const handleStart = () => {
        console.log(
            'WelcomeScreen: handleStart called - transitioning to chat'
        );
        setShowWelcome(false);
    };

    const send = async () => {
        const text = input.trim();
        if (!text || loading) return;

        const userMsg: Msg = { id: String(Date.now()), author: 'user', text };
        setMessages((m) => [...m, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const reply = await chat(text);
            setMessages((m) => [
                ...m,
                { id: String(Date.now() + 1), author: 'bot', text: reply },
            ]);
        } catch (error) {
            setMessages((m) => [
                ...m,
                {
                    id: String(Date.now() + 2),
                    author: 'bot',
                    text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    // Show loading screen if translations are not ready or app is not ready
    if (!ready || !isAppReady) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#0B1426' }}>
                <LinearGradient
                    colors={['#0B1426', '#1E293B', '#334155']}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ActivityIndicator size="large" color="#3B82F6" />
                    <Text
                        style={{
                            color: '#FFFFFF',
                            marginTop: 16,
                            fontSize: 16,
                        }}
                    >
                        Loading AIClinic...
                    </Text>
                </LinearGradient>
            </SafeAreaView>
        );
    }

    if (showWelcome) {
        return <WelcomeScreen onStart={handleStart} />;
    }

    const renderItem = ({ item }: { item: Msg }) => (
        <MessageBubble message={item} />
    );

    const renderTypingIndicator = () => {
        if (!loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 6,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-end',
                    paddingHorizontal: 16,
                }}
            >
                {/* Bot Avatar */}
                <View
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: '#3B82F6',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 8,
                        marginBottom: 4,
                    }}
                >
                    <Text style={{ fontSize: 16 }}>🏥</Text>
                </View>

                {/* Typing Container */}
                <View
                    style={{
                        backgroundColor: 'rgba(17, 25, 40, 0.4)',
                        borderRadius: 18,
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        borderWidth: 1,
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <ActivityIndicator size="small" color="#94A3B8" />
                    <Text
                        style={{
                            color: '#94A3B8',
                            fontSize: 14,
                            marginLeft: 8,
                        }}
                    >
                        AI is analyzing...
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0B1426' }}>
            {/* Background Gradient */}
            <LinearGradient
                colors={['#0B1426', '#1E293B', '#334155']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                }}
            />

            {/* Header */}
            <Header showBack={false} onBackPress={() => setShowWelcome(true)} />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <Animated.View
                    style={{
                        flex: 1,
                        opacity: fadeAnim,
                    }}
                >
                    {/* Messages List */}
                    <FlatList
                        ref={listRef}
                        data={messages}
                        keyExtractor={(m) => m.id}
                        renderItem={renderItem}
                        contentContainerStyle={{
                            paddingVertical: 16,
                            paddingBottom: 12,
                            flexGrow: 1,
                        }}
                        ListFooterComponent={renderTypingIndicator}
                        onContentSizeChange={() =>
                            listRef.current?.scrollToEnd({ animated: true })
                        }
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                    />
                </Animated.View>

                {/* Chat Input */}
                <ChatInput
                    value={input}
                    onChangeText={setInput}
                    onSend={send}
                    loading={loading}
                    placeholder={t('placeholder')}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
