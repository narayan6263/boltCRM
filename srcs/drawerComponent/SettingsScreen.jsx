import React from 'react';
import { StyleSheet, View } from 'react-native';
import { styled } from 'nativewind';
import { useTheme } from '../component/ThemeToggle';
import Header from '../component/Header';
import ThemeToggle from '../component/ThemeToggle';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const StyledView = styled(View);

const SettingsScreen = () => {
  const { theme } = useTheme();

  return (
    <StyledView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header
        title="Settings"
        showBackButton={true}
        showMenuButton={true}
      />
      <StyledView style={styles.content}>
        <ThemeToggle />
      </StyledView>
    </StyledView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
  },
});

export default SettingsScreen;