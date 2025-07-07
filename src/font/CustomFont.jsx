import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { styled } from 'nativewind'; // NativeWind se styled import karo

// StyledText banaya jo NativeWind ke className ko support karega
const StyledText = styled(Text);

const CustomText = ({ children, className, style }) => {
  return (
    <StyledText className={className} style={[styles.text, style]}>
      {children}
    </StyledText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Lato-BlackItalic', // Corrected font family name
  },
});

export default CustomText;