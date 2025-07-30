import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Alert,
    Clipboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import Markdown from 'react-native-markdown-display';

interface MessageBubbleProps {
    message: {
        id: string;
        author: 'user' | 'bot';
        text: string;
    };
    isTyping?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
    message,
    isTyping = false,
}) => {
    const [showActions, setShowActions] = useState(false);
    const scaleAnim = new Animated.Value(0);

    React.useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
        }).start();
    }, []);

    const copyToClipboard = () => {
        Clipboard.setString(message.text);
        Alert.alert('Copied', 'Message copied to clipboard');
    };

    const detectUrgency = (text: string): 'emergency' | 'urgent' | 'normal' => {
        const emergencyWords = [
            'emergency',
            'urgent',
            'immediately',
            '911',
            'severe',
            'critical',
        ];
        const urgentWords = [
            'pain',
            'bleeding',
            'difficulty breathing',
            'chest pain',
            'allergic reaction',
        ];

        const lowerText = text.toLowerCase();

        if (emergencyWords.some((word) => lowerText.includes(word))) {
            return 'emergency';
        }
        if (urgentWords.some((word) => lowerText.includes(word))) {
            return 'urgent';
        }
        return 'normal';
    };

    const urgency =
        message.author === 'bot' ? detectUrgency(message.text) : 'normal';

    const getUrgencyColors = () => {
        switch (urgency) {
            case 'emergency':
                return {
                    border: '#EF4444',
                    indicator: '#DC2626',
                    background: 'rgba(239, 68, 68, 0.1)',
                };
            case 'urgent':
                return {
                    border: '#F59E0B',
                    indicator: '#D97706',
                    background: 'rgba(245, 158, 11, 0.1)',
                };
            default:
                return {
                    border: 'rgba(255, 255, 255, 0.1)',
                    indicator: '#10B981',
                    background: 'rgba(17, 25, 40, 0.4)',
                };
        }
    };

    const urgencyColors = getUrgencyColors();

    const markdownStyles = {
        body: {
            color: '#E2E8F0',
            fontSize: 15,
            lineHeight: 22,
        },
        heading1: {
            color: '#FFFFFF',
            fontSize: 20,
            fontWeight: 'bold' as 'bold',
            marginBottom: 8,
        },
        heading2: {
            color: '#FFFFFF',
            fontSize: 18,
            fontWeight: 'bold' as 'bold',
            marginBottom: 6,
        },
        strong: {
            color: '#FFFFFF',
            fontWeight: 'bold' as 'bold',
        },
        em: {
            color: '#94A3B8',
            fontStyle: 'italic' as 'italic',
        },
        code_inline: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#60A5FA',
            paddingHorizontal: 4,
            paddingVertical: 2,
            borderRadius: 4,
        },
        code_block: {
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            color: '#E2E8F0',
            padding: 12,
            borderRadius: 8,
            marginVertical: 8,
        },
        list_item: {
            color: '#E2E8F0',
            marginBottom: 4,
        },
        bullet_list_icon: {
            color: '#60A5FA',
        },
        ordered_list_icon: {
            color: '#60A5FA',
        },
    };

    return (
        <Animated.View
            style={{
                transform: [{ scale: scaleAnim }],
                paddingVertical: 6,
                flexDirection: 'row',
                justifyContent:
                    message.author === 'user' ? 'flex-end' : 'flex-start',
                alignItems: 'flex-end',
                paddingHorizontal: 16,
            }}
        >
            {/* Bot Avatar */}
            {message.author === 'bot' && (
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
            )}

            {/* Message Container */}
            <TouchableOpacity
                onLongPress={() => setShowActions(!showActions)}
                style={{ maxWidth: '80%' }}
                activeOpacity={0.8}
            >
                {message.author === 'user' ? (
                    <LinearGradient
                        colors={['#3B82F6', '#1D4ED8', '#1E40AF']}
                        style={{
                            borderRadius: 18,
                            paddingHorizontal: 16,
                            paddingVertical: 12,
                            shadowColor: '#3B82F6',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 8,
                            elevation: 6,
                        }}
                    >
                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontSize: 15,
                                lineHeight: 20,
                            }}
                        >
                            {message.text}
                        </Text>
                    </LinearGradient>
                ) : (
                    <BlurView
                        intensity={20}
                        style={{
                            borderRadius: 18,
                            paddingHorizontal: 16,
                            paddingVertical: 12,
                            backgroundColor: urgencyColors.background,
                            borderWidth: 1,
                            borderColor: urgencyColors.border,
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Urgency Indicator */}
                        {urgency !== 'normal' && (
                            <View
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: 4,
                                    backgroundColor: urgencyColors.indicator,
                                }}
                            />
                        )}

                        {/* Urgency Badge */}
                        {urgency !== 'normal' && (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 8,
                                    paddingLeft: urgency === 'emergency' || urgency === 'urgent' ? 8 : 0,
                                }}
                            >
                                <Ionicons
                                    name={
                                        urgency === 'emergency'
                                            ? 'warning'
                                            : 'alert-circle'
                                    }
                                    size={16}
                                    color={urgencyColors.indicator}
                                />
                                <Text
                                    style={{
                                        color: urgencyColors.indicator,
                                        fontSize: 12,
                                        fontWeight: '600',
                                        marginLeft: 4,
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    {urgency === 'emergency'
                                        ? 'Emergency'
                                        : 'Urgent'}
                                </Text>
                            </View>
                        )}

                        <View
                            style={{
                                paddingLeft: urgency === 'emergency' || urgency === 'urgent' ? 8 : 0,
                            }}
                        >
                            <Markdown style={markdownStyles}>
                                {message.text}
                            </Markdown>
                        </View>
                    </BlurView>
                )}

                {/* Actions */}
                {showActions && (
                    <Animated.View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: 8,
                            gap: 8,
                        }}
                    >
                        <TouchableOpacity
                            onPress={copyToClipboard}
                            style={{
                                backgroundColor: 'rgba(17, 25, 40, 0.8)',
                                paddingHorizontal: 12,
                                paddingVertical: 6,
                                borderRadius: 12,
                                borderWidth: 1,
                                borderColor: 'rgba(255, 255, 255, 0.1)',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Ionicons
                                name="copy-outline"
                                size={14}
                                color="#94A3B8"
                            />
                            <Text
                                style={{
                                    color: '#94A3B8',
                                    fontSize: 12,
                                    marginLeft: 4,
                                }}
                            >
                                Copy
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </TouchableOpacity>

            {/* User Avatar */}
            {message.author === 'user' && (
                <View
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: '#6B7280',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 8,
                        marginBottom: 4,
                    }}
                >
                    <Ionicons name="person" size={16} color="#FFFFFF" />
                </View>
            )}
        </Animated.View>
    );
};

export default MessageBubble;
