import React from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';

const Header = ({
  title = 'Dashboard',
  titleAlign = 'center', // left, center, right
  titleStyle = {},
  containerStyle = {},
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={styles.innerContainer}>
        <Text
          style={[
            styles.title,
            { textAlign: titleAlign },
            titleStyle,
            { fontFamily: 'Poppins-Regular' },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  innerContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  title: {
    fontSize: RFPercentage(3),
    color: '#000000',
  },
});

export default Header;