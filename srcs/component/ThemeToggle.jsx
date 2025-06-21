import React, { createContext, useContext, useState } from 'react';
import { Switch, View, Text } from 'react-native';
import { styled } from 'nativewind';
import { RFPercentage } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const StyledView = styled(View);
const StyledText = styled(Text);

// Theme Context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const themes = {
    light: {
      background: '#FDF7F2',
      button: '#DAA3A3',
      header: '#5C3C45',
      text: '#000000',
      border: '#E0E0E0',
      toastBackground: '#4CAF50', // Success toast
      toastError: '#F44336', // Error toast
    },
    dark: {
      background: '#1E2A44',
      button: '#4B6CB7',
      header: '#182848',
      text: '#FFFFFF',
      border: '#3B4A6B',
      toastBackground: '#388E3C', // Darker success toast
      toastError: '#D32F2F', // Darker error toast
    },
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[theme], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme
export const useTheme = () => useContext(ThemeContext);

// ThemeToggle Component
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <StyledView className="flex-row items-center justify-between p-4">
      <StyledText
        style={{
          fontSize: RFPercentage(2),
          fontFamily: 'Poppins-Regular',
          color: theme.text,
        }}
      >
        {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
      </StyledText>
      <LinearGradient
        colors={theme === 'light' ? ['#DAA3A3', '#5C3C45'] : ['#4B6CB7', '#182848']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          borderRadius: 20,
          padding: 2,
        }}
      >
        <Switch
          value={theme === 'dark'}
          onValueChange={toggleTheme}
          thumbColor={theme === 'light' ? '#FFFFFF' : '#E0E0E0'}
          trackColor={{ false: 'transparent', true: 'transparent' }}
          style={{
            transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
          }}
          accessibilityLabel="Toggle theme"
        />
      </LinearGradient>
    </StyledView>
  );
};

export default ThemeToggle;