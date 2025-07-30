import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
    onMenuPress?: () => void;
    onBackPress?: () => void;
    showBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({
    onMenuPress,
    onBackPress,
    showBack = false,
}) => {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();

    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <BlurView
                intensity={30}
                style={{
                    paddingTop: insets.top + 8,
                    paddingBottom: 12,
                    paddingHorizontal: 16,
                    backgroundColor: 'rgba(11, 16, 32, 0.8)',
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: 48,
                    }}
                >
                    {/* Left Side */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex: 1,
                        }}
                    >
                        {showBack ? (
                            <TouchableOpacity
                                onPress={onBackPress}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    backgroundColor: 'rgba(17, 25, 40, 0.4)',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: 12,
                                    borderWidth: 1,
                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                }}
                            >
                                <Ionicons
                                    name="arrow-back"
                                    size={20}
                                    color="#FFFFFF"
                                />
                            </TouchableOpacity>
                        ) : (
                            <LinearGradient
                                colors={['#3B82F6', '#1D4ED8', '#1E40AF']}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: 12,
                                    shadowColor: '#3B82F6',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 8,
                                    elevation: 6,
                                }}
                            >
                                <Text style={{ fontSize: 20 }}>🏥</Text>
                            </LinearGradient>
                        )}

                        {/* Title */}
                        <View style={{ flex: 1 }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: '600',
                                    color: '#FFFFFF',
                                    marginBottom: 2,
                                }}
                            >
                                {t('title').split('•')[0].trim()}
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <View
                                    style={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: 4,
                                        backgroundColor: '#10B981',
                                        marginRight: 6,
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: '#94A3B8',
                                    }}
                                >
                                    AI Assistant Online
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Right Side */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                        }}
                    >
                        {/* Info Button */}
                        <TouchableOpacity
                            onPress={() => {
                                // Handle info/help
                            }}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: 'rgba(17, 25, 40, 0.4)',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: 'rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <Ionicons
                                name="information-circle-outline"
                                size={20}
                                color="#94A3B8"
                            />
                        </TouchableOpacity>

                        {/* Menu Button */}
                        {onMenuPress && (
                            <TouchableOpacity
                                onPress={onMenuPress}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    backgroundColor: 'rgba(17, 25, 40, 0.4)',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                }}
                            >
                                <Ionicons
                                    name="menu-outline"
                                    size={20}
                                    color="#94A3B8"
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </BlurView>
        </>
    );
};

export default Header;
