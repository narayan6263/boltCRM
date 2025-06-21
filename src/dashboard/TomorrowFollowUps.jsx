import { View } from 'react-native';
import React from 'react';
import FollowUps from './FollowUps';

export default function TomorrowFollowUps() {
  return (
    <View className='flex-1'>
      <FollowUps route={{ params: { queryType: 'tomorrow' } }} />
    </View>
  );
}