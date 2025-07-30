import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Dimensions,
    ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');

interface WelcomeScreenProps {
    onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
    const { t } = useTranslation();
    const [currentFeature, setCurrentFeature] = useState(0);
    const fadeAnim = new Animated.Value(0);
    const slideAnim = new Animated.Value(50);

    console.log('WelcomeScreen: Rendered with title:', t('welcome.title'));

    const handleStartPress = () => {
        console.log('WelcomeScreen: Start button pressed!');
        onStart();
    };

    const features = [
        {
            icon: 'time-outline',
            text: t('features.availability'),
            color: '#60A5FA',
        },
        {
            icon: 'flash-outline',
            text: t('features.fastAssessment'),
            color: '#34D399',
        },
        {
            icon: 'shield-checkmark-outline',
            text: t('features.privacy'),
            color: '#A78BFA',
        },
        {
            icon: 'heart-outline',
            text: t('features.professional'),
            color: '#F87171',
        },
    ];

    useEffect(() => {
        // Entrance animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();

        // Feature cycling
        const interval = setInterval(() => {
            setCurrentFeature((prev) => (prev + 1) % features.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#0B1426' }}>
            {/* Background Gradient - Fixed */}
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

            {/* Floating Background Elements - Fixed */}
            <View style={{ position: 'absolute', top: 80, left: 40 }}>
                <Animated.View
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: 60,
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        transform: [
                            {
                                translateY: slideAnim.interpolate({
                                    inputRange: [0, 50],
                                    outputRange: [0, -10],
                                }),
                            },
                        ],
                    }}
                />
            </View>

            <View style={{ position: 'absolute', bottom: 160, right: 40 }}>
                <Animated.View
                    style={{
                        width: 150,
                        height: 150,
                        borderRadius: 75,
                        backgroundColor: 'rgba(168, 85, 247, 0.1)',
                        transform: [
                            {
                                translateY: slideAnim.interpolate({
                                    inputRange: [0, 50],
                                    outputRange: [0, 10],
                                }),
                            },
                        ],
                    }}
                />
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingVertical: 40,
                    minHeight: height - 80, // Ensure minimum height for content
                }}
                showsVerticalScrollIndicator={false}
                bounces={true}
                scrollEnabled={true}
            >
                <Animated.View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    }}
                >
                    {/* Logo Section */}
                    <View style={{ alignItems: 'center', marginBottom: 40 }}>
                        <LinearGradient
                            colors={['#3B82F6', '#1D4ED8', '#1E40AF']}
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 24,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 20,
                                shadowColor: '#3B82F6',
                                shadowOffset: { width: 0, height: 8 },
                                shadowOpacity: 0.3,
                                shadowRadius: 16,
                                elevation: 8,
                            }}
                        >
                            <Text style={{ fontSize: 32 }}>🏥</Text>
                        </LinearGradient>

                        <Text
                            style={{
                                fontSize: 28,
                                fontWeight: 'bold',
                                color: '#FFFFFF',
                                textAlign: 'center',
                                marginBottom: 12,
                                lineHeight: 36,
                            }}
                        >
                            {t('welcome.title') || 'AIClinic'}
                        </Text>

                        <Text
                            style={{
                                fontSize: 16,
                                color: '#94A3B8',
                                textAlign: 'center',
                                lineHeight: 24,
                                maxWidth: width - 80,
                            }}
                        >
                            {t('welcome.subtitle') ||
                                'Your AI-powered health assistant providing instant medical guidance and support.'}
                        </Text>
                    </View>

                    {/* Features Section */}
                    <BlurView
                        intensity={20}
                        style={{
                            borderRadius: 20,
                            padding: 24,
                            marginBottom: 32,
                            width: width - 48,
                            backgroundColor: 'rgba(17, 25, 40, 0.4)',
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: '600',
                                color: '#FFFFFF',
                                textAlign: 'center',
                                marginBottom: 20,
                            }}
                        >
                            {t('welcome.whyChoose')}
                        </Text>

                        {/* Animated Feature Display */}
                        <View style={{ height: 60, justifyContent: 'center' }}>
                            {features.map((feature, index) => (
                                <Animated.View
                                    key={index}
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        opacity:
                                            index === currentFeature ? 1 : 0,
                                        transform: [
                                            {
                                                scale:
                                                    index === currentFeature
                                                        ? 1
                                                        : 0.95,
                                            },
                                        ],
                                    }}
                                >
                                    <Ionicons
                                        name={feature.icon as any}
                                        size={24}
                                        color={feature.color}
                                        style={{ marginRight: 12 }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: '#E2E8F0',
                                            fontWeight: '500',
                                        }}
                                    >
                                        {feature.text}
                                    </Text>
                                </Animated.View>
                            ))}
                        </View>

                        {/* Feature Dots */}
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginTop: 20,
                                gap: 8,
                            }}
                        >
                            {features.map((_, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setCurrentFeature(index)}
                                    style={{
                                        width:
                                            index === currentFeature ? 24 : 8,
                                        height: 8,
                                        borderRadius: 4,
                                        backgroundColor:
                                            index === currentFeature
                                                ? '#60A5FA'
                                                : '#4B5563',
                                    }}
                                />
                            ))}
                        </View>
                    </BlurView>

                    {/* Stats Grid */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: width - 48,
                            marginBottom: 32,
                            gap: 12,
                        }}
                    >
                        {[
                            {
                                icon: 'pulse-outline',
                                value: '95%',
                                label: t('stats.accuracy'),
                                color: '#60A5FA',
                            },
                            {
                                icon: 'flash-outline',
                                value: '<30s',
                                label: t('stats.responseTime'),
                                color: '#34D399',
                            },
                            {
                                icon: 'people-outline',
                                value: '1.2k+',
                                label: t('stats.users'),
                                color: '#A78BFA',
                            },
                        ].map((stat, index) => (
                            <BlurView
                                key={index}
                                intensity={15}
                                style={{
                                    flex: 1,
                                    borderRadius: 16,
                                    padding: 16,
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(17, 25, 40, 0.3)',
                                    borderWidth: 1,
                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginBottom: 4,
                                    }}
                                >
                                    <Ionicons
                                        name={stat.icon as any}
                                        size={16}
                                        color={stat.color}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            color: stat.color,
                                            marginLeft: 4,
                                        }}
                                    >
                                        {stat.value}
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                        fontSize: 10,
                                        color: '#94A3B8',
                                        textAlign: 'center',
                                    }}
                                >
                                    {stat.label}
                                </Text>
                            </BlurView>
                        ))}
                    </View>

                    {/* Warning Notice */}
                    <BlurView
                        intensity={15}
                        style={{
                            borderRadius: 16,
                            padding: 16,
                            marginBottom: 32,
                            width: width - 48,
                            backgroundColor: 'rgba(245, 158, 11, 0.1)',
                            borderWidth: 1,
                            borderColor: 'rgba(245, 158, 11, 0.3)',
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                            }}
                        >
                            <Ionicons
                                name="warning-outline"
                                size={20}
                                color="#F59E0B"
                                style={{ marginRight: 12, marginTop: 2 }}
                            />
                            <View style={{ flex: 1 }}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: '600',
                                        color: '#FCD34D',
                                        marginBottom: 4,
                                    }}
                                >
                                    {t('warning.title')}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: '#E5E7EB',
                                        lineHeight: 16,
                                    }}
                                >
                                    {t('warning.description')}
                                </Text>
                            </View>
                        </View>
                    </BlurView>

                    {/* Start Button */}
                    <TouchableOpacity
                        onPress={handleStartPress}
                        style={{ width: width - 48 }}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#3B82F6', '#1D4ED8', '#1E40AF']}
                            style={{
                                paddingVertical: 16,
                                paddingHorizontal: 32,
                                borderRadius: 16,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                shadowColor: '#3B82F6',
                                shadowOffset: { width: 0, height: 8 },
                                shadowOpacity: 0.3,
                                shadowRadius: 16,
                                elevation: 8,
                            }}
                        >
                            <Ionicons
                                name="heart-outline"
                                size={20}
                                color="#FFFFFF"
                                style={{ marginRight: 8 }}
                            />
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: '600',
                                    color: '#FFFFFF',
                                }}
                            >
                                {t('welcome.startChat') ||
                                    'Start Health Consultation'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <Text
                        style={{
                            fontSize: 11,
                            color: '#6B7280',
                            textAlign: 'center',
                            marginTop: 16,
                            paddingHorizontal: 32,
                        }}
                    >
                        {t('welcome.termsAcceptance')}
                    </Text>
                </Animated.View>
            </ScrollView>
        </View>
    );
};

export default WelcomeScreen;
