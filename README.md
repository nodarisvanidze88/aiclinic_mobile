# AIClinic Mobile App

A beautiful and modern React Native/Expo mobile application for AIClinic, matching the design and functionality of the web application.

## ✨ Features

-   **Beautiful Modern UI**: Glassmorphism effects, gradients, and smooth animations
-   **Welcome Screen**: Animated onboarding with medical branding and feature highlights
-   **Smart Chat Interface**:
    -   Markdown rendering support
    -   Urgency detection with visual indicators
    -   Copy-to-clipboard functionality
    -   Typing indicators and smooth animations
-   **Medical Theming**: Consistent medical branding with appropriate icons and colors
-   **Multi-language Support**: English, Georgian, and Russian localization
-   **Responsive Design**: Optimized for all screen sizes and orientations
-   **Error Handling**: Robust error boundaries and network error handling

## 🏗️ Architecture

### Components

-   **WelcomeScreen**: Animated onboarding with features, stats, and medical disclaimer
-   **MessageBubble**: Beautiful chat bubbles with markdown, urgency detection, and actions
-   **ChatInput**: Modern input with glassmorphism, suggestions, and animations
-   **Header**: Clean header with status indicators and navigation

### Features Implemented

-   **Glassmorphism Design**: Blur effects and transparent backgrounds
-   **Gradient Theming**: Medical-inspired color gradients
-   **Urgency Detection**: Automatic detection of emergency/urgent medical content
-   **Markdown Support**: Rich text rendering for bot responses
-   **Animation System**: Smooth enter/exit animations throughout the app
-   **Error Boundaries**: Graceful error handling and recovery

## 📱 Screenshots

The app features:

-   Dark theme optimized for medical environments
-   Smooth gradient backgrounds
-   Glassmorphism UI elements
-   Animated feature highlights
-   Professional medical branding

## 🚀 Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   Expo CLI
-   Android Studio (for Android development)
-   Xcode (for iOS development - macOS only)

### Installation

1. **Install dependencies**:

    ```bash
    npm install
    ```

2. **Set up environment variables**:

    ```bash
    cp .env.example .env
    # Edit .env with your configuration
    ```

3. **Start the development server**:

    ```bash
    npm start
    ```

4. **Run on device/simulator**:
    - Scan QR code with Expo Go app (iOS/Android)
    - Or press 'a' for Android emulator
    - Or press 'i' for iOS simulator

### Environment Configuration

Create a `.env` file with:

```bash
EXPO_PUBLIC_API_BASE_URL=https://api.aiclinic.bio
NODE_ENV=production
```

For local development:

```bash
EXPO_PUBLIC_API_BASE_URL=http://localhost:8000
NODE_ENV=development
DEBUG=true
```

## 🎨 Design System

### Colors

-   **Primary Blue**: `#3B82F6` - Main brand color
-   **Emergency Red**: `#EF4444` - Emergency alerts
-   **Warning Orange**: `#F59E0B` - Urgent notices
-   **Success Green**: `#10B981` - Positive states
-   **Dark Background**: `#0B1426` - Main background
-   **Glass Elements**: Transparent overlays with blur effects

### Typography

-   **Primary**: System font stack
-   **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
-   **Sizes**: 12px - 28px responsive scaling

### Components

-   **Glassmorphism**: Blur intensity 15-30
-   **Border Radius**: 12px - 24px for modern look
-   **Shadows**: Subtle elevation with appropriate colors
-   **Animations**: 200-800ms duration with easing

## 🌐 Localization

Supported languages:

-   **English** (`en`)
-   **Georgian** (`ka`)
-   **Russian** (`ru`)

All UI strings are externalized and the app automatically detects device language.

## 📦 Dependencies

Key packages:

-   **expo**: ~53.0.20 - Expo framework
-   **react-native**: 0.79.5 - React Native core
-   **expo-linear-gradient**: Gradient backgrounds
-   **expo-blur**: Glassmorphism effects
-   **@expo/vector-icons**: Ionicons icon set
-   **react-native-markdown-display**: Markdown rendering
-   **react-native-animatable**: Animation utilities
-   **axios**: HTTP client for API calls
-   **i18next**: Internationalization

## 🔧 Configuration

### App Configuration (`app.json`)

-   iOS bundle ID: `com.nodarisvanidze88.aiclinicmobile`
-   Android package: `com.nodarisvanidze88.aiclinicmobile`
-   Permissions: Internet, network state
-   Security: Network security config for API access

### API Configuration

The app automatically configures API endpoints based on environment:

-   **Production**: `https://api.aiclinic.bio`
-   **Development**: `http://localhost:8000`

## 🚢 Deployment

### Android (Google Play)

```bash
expo build:android
```

### iOS (App Store)

```bash
expo build:ios
```

### EAS Build (Recommended)

```bash
eas build --platform android
eas build --platform ios
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on both platforms
5. Submit a pull request

## 📄 License

This project is part of the AIClinic application suite.

## 🆘 Support

For technical support or bug reports, please contact the development team.

---

Built with ❤️ using React Native and Expo
