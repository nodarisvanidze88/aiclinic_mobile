import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import {
    SafeAreaView,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { chat } from '../lib/api';

type Msg = { id: string; author: 'user' | 'bot'; text: string };

export default function Home() {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const [messages, setMessages] = useState<Msg[]>([
        { id: '1', author: 'bot', text: t('botHello') },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const listRef = useRef<FlatList<Msg>>(null);

    useEffect(() => {
        listRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

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
        } catch {
            setMessages((m) => [
                ...m,
                {
                    id: String(Date.now() + 2),
                    author: 'bot',
                    text: 'სერვერთან კავშირის შეცდომა.',
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }: { item: Msg }) => (
        <View
            style={{
                paddingVertical: 6,
                flexDirection: 'row',
                justifyContent:
                    item.author === 'user' ? 'flex-end' : 'flex-start',
            }}
        >
            <View
                style={{
                    maxWidth: '80%',
                    backgroundColor:
                        item.author === 'user' ? '#5b6cff' : '#1b2038',
                    borderRadius: 18,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                }}
            >
                <Text style={{ color: '#fff', fontSize: 15 }}>{item.text}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0b1020' }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
            >
                <View style={{ flex: 1, paddingHorizontal: 14, paddingTop: 8 }}>
                    <Text
                        style={{
                            color: '#8ea0ff',
                            fontSize: 18,
                            fontWeight: '600',
                            textAlign: 'center',
                            marginBottom: 6,
                        }}
                    >
                        {t('title')}
                    </Text>

                    <FlatList
                        ref={listRef}
                        data={messages}
                        keyExtractor={(m) => m.id}
                        renderItem={renderItem}
                        contentContainerStyle={{
                            paddingVertical: 8,
                            paddingBottom: 12,
                        }}
                        onContentSizeChange={() =>
                            listRef.current?.scrollToEnd({ animated: true })
                        }
                    />

                    {loading && (
                        <View
                            style={{
                                alignItems: 'flex-start',
                                marginVertical: 6,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: '#1b2038',
                                    borderRadius: 18,
                                    paddingHorizontal: 12,
                                    paddingVertical: 8,
                                }}
                            >
                                <ActivityIndicator />
                            </View>
                        </View>
                    )}

                    {/* INPUT BAR */}
                    <View
                        style={{
                            paddingBottom: insets.bottom + 10, // ← space above home/nav bar
                            paddingTop: 8,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                            backgroundColor: '#0b1020',
                        }}
                    >
                        <TextInput
                            value={input}
                            onChangeText={setInput}
                            placeholder={t('placeholder')}
                            placeholderTextColor="#6b7280"
                            style={{
                                flex: 1,
                                color: '#fff',
                                backgroundColor: '#101735',
                                borderColor: '#28305a',
                                borderWidth: 1,
                                borderRadius: 18,
                                paddingHorizontal: 14,
                                paddingVertical: 10,
                            }}
                            onSubmitEditing={send}
                            returnKeyType="send"
                        />
                        <TouchableOpacity
                            onPress={send}
                            disabled={loading}
                            style={{
                                backgroundColor: loading
                                    ? '#3b3f60'
                                    : '#5b6cff',
                                paddingHorizontal: 16,
                                paddingVertical: 10,
                                borderRadius: 14,
                            }}
                        >
                            <Text style={{ color: '#fff', fontWeight: '600' }}>
                                {t('send')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
