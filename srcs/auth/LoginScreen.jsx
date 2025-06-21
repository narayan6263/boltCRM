import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styled } from 'nativewind';
import { useTheme } from '../component/ThemeToggle';
import Header from '../component/Header';
import CustomButton from '../component/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';

const StyledView = styled(View);
const StyledText = styled(Text);

const LoginScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <StyledView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header
        title="Login"
        showBackButton={true}
        showSettingsButton={true}
      />
      <StyledView style={styles.content}>
        <StyledText style={[styles.title, { color: theme.text }]}>
          Login to Your Account
        </StyledText>
        <StyledText style={[styles.subtitle, { color: theme.text }]}>
          Access all features by logging in.
        </StyledText>
        <CustomButton
          buttonName="Go to Welcome"
          onPress={() => navigation.navigate('WelcomeScreen')}
          width={wp(80)}
          accessibilityLabel="Navigate to Welcome Screen"
        />
        <CustomButton
          buttonName="Open Settings"
          onPress={() => navigation.navigate('SettingsScreen')}
          width={wp(80)}
          gradientColors={[theme.button, theme.button]}
          style={{ marginTop: hp(2) }}
          accessibilityLabel="Navigate to Settings Screen"
        />
      </StyledView>
    </StyledView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(5),
  },
  title: {
    fontSize: RFPercentage(3.5),
    fontFamily: 'Poppins-Bold',
    marginBottom: hp(2),
  },
  subtitle: {
    fontSize: RFPercentage(2),
    fontFamily: 'Poppins-Regular',
    marginBottom: hp(4),
    textAlign: 'center',
  },
});

export default LoginScreen;