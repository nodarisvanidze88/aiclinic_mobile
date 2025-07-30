import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Animated,
    Dimensions,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface ChatInputProps {
    value: string;
    onChangeText: (text: string) => void;
    onSend: () => void;
    loading: boolean;
    placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
    value,
    onChangeText,
    onSend,
    loading,
    placeholder = 'Type your health question...',
}) => {
    const insets = useSafeAreaInsets();
    const [isFocused, setIsFocused] = useState(false);
    const [inputHeight, setInputHeight] = useState(40);
    const scaleAnim = new Animated.Value(1);

    const animatePress = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleSend = () => {
        if (value.trim() && !loading) {
            animatePress();
            onSend();
        }
    };

    const canSend = value.trim().length > 0 && !loading;

    return (
        <BlurView
            intensity={30}
            style={{
                paddingTop: 16,
                paddingBottom: Math.max(insets.bottom, 16),
                paddingHorizontal: 16,
                backgroundColor: 'rgba(11, 16, 32, 0.8)',
                borderTopWidth: 1,
                borderTopColor: 'rgba(255, 255, 255, 0.1)',
            }}
        >
            {/* Input Container */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    gap: 12,
                    maxWidth: width - 32,
                }}
            >
                {/* Text Input */}
                <View
                    style={{
                        flex: 1,
                        position: 'relative',
                    }}
                >
                    <BlurView
                        intensity={20}
                        style={{
                            borderRadius: 20,
                            backgroundColor: isFocused
                                ? 'rgba(59, 130, 246, 0.1)'
                                : 'rgba(17, 25, 40, 0.4)',
                            borderWidth: 1,
                            borderColor: isFocused
                                ? '#3B82F6'
                                : 'rgba(255, 255, 255, 0.1)',
                            paddingHorizontal: 16,
                            paddingVertical: 12,
                            minHeight: 48,
                        }}
                    >
                        <TextInput
                            value={value}
                            onChangeText={onChangeText}
                            placeholder={placeholder}
                            placeholderTextColor="#6B7280"
                            multiline
                            style={{
                                color: '#FFFFFF',
                                fontSize: 16,
                                lineHeight: 20,
                                maxHeight: 120,
                                minHeight: 24,
                                paddingTop: 0,
                                paddingBottom: 0,
                            }}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onContentSizeChange={(event) => {
                                setInputHeight(
                                    Math.max(
                                        24,
                                        event.nativeEvent.contentSize.height
                                    )
                                );
                            }}
                            onSubmitEditing={handleSend}
                            returnKeyType="send"
                            blurOnSubmit={false}
                        />
                    </BlurView>

                    {/* Character Counter */}
                    {value.length > 0 && (
                        <View
                            style={{
                                position: 'absolute',
                                right: 12,
                                bottom: -20,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: 'rgba(17, 25, 40, 0.8)',
                                    paddingHorizontal: 6,
                                    paddingVertical: 2,
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                }}
                            >
                                <Ionicons
                                    name="text-outline"
                                    size={10}
                                    color="#6B7280"
                                    style={{ marginRight: 2 }}
                                />
                                {/* Commented out character count for cleaner look
                                <Text style={{
                                    fontSize: 10,
                                    color: value.length > 500 ? '#EF4444' : '#6B7280',
                                }}>
                                    {value.length}
                                </Text>
                                */}
                            </View>
                        </View>
                    )}
                </View>

                {/* Send Button */}
                <TouchableOpacity
                    onPress={handleSend}
                    disabled={!canSend}
                    activeOpacity={0.8}
                    style={{
                        marginBottom: value.length > 0 ? 20 : 0,
                    }}
                >
                    <Animated.View
                        style={{ transform: [{ scale: scaleAnim }] }}
                    >
                        <LinearGradient
                            colors={
                                canSend
                                    ? ['#3B82F6', '#1D4ED8', '#1E40AF']
                                    : ['#374151', '#4B5563', '#6B7280']
                            }
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: 24,
                                justifyContent: 'center',
                                alignItems: 'center',
                                shadowColor: canSend
                                    ? '#3B82F6'
                                    : 'transparent',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.3,
                                shadowRadius: 8,
                                elevation: canSend ? 6 : 2,
                            }}
                        >
                            {loading ? (
                                <Animated.View
                                    style={{
                                        transform: [
                                            {
                                                rotate: scaleAnim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [
                                                        '0deg',
                                                        '360deg',
                                                    ],
                                                }),
                                            },
                                        ],
                                    }}
                                >
                                    <Ionicons
                                        name="sync-outline"
                                        size={20}
                                        color="#FFFFFF"
                                    />
                                </Animated.View>
                            ) : (
                                <Ionicons
                                    name="send"
                                    size={20}
                                    color="#FFFFFF"
                                    style={{ marginLeft: 2 }}
                                />
                            )}
                        </LinearGradient>
                    </Animated.View>
                </TouchableOpacity>
            </View>

            {/* Quick Suggestions */}
            {value.length === 0 && !isFocused && (
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 12,
                        gap: 8,
                        flexWrap: 'wrap',
                    }}
                >
                    {[
                        'I have a headache',
                        'Flu symptoms',
                        'Chest pain',
                        'Fever',
                    ].map((suggestion, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => onChangeText(suggestion)}
                            style={{
                                backgroundColor: 'rgba(17, 25, 40, 0.4)',
                                paddingHorizontal: 12,
                                paddingVertical: 6,
                                borderRadius: 12,
                                borderWidth: 1,
                                borderColor: 'rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Ionicons
                                    name="add-circle-outline"
                                    size={12}
                                    color="#94A3B8"
                                />
                                <Text
                                    style={{
                                        color: '#94A3B8',
                                        fontSize: 12,
                                        marginLeft: 4,
                                    }}
                                >
                                    {suggestion}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </BlurView>
    );
};

export default ChatInput;
