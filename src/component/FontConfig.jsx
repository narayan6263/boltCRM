import { RFPercentage } from 'react-native-responsive-fontsize';

// Centralized font configuration for the app
export const FontConfig = {
  regular: 'Poppins-Regular',
  semiBold: 'Poppins-SemiBold',
  bold: 'Lato-Black',
  fontSizes: {
    toastTitle: RFPercentage(2),
    toastMessage: RFPercentage(1.8),
    heading: RFPercentage(3.5),
    subText: RFPercentage(2),
    button: RFPercentage(2),
  },
};