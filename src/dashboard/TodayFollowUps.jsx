import { View } from 'react-native';
import React from 'react';
import FollowUps from './FollowUps';

export default function TodayFollowUps() {
  return (
    <View className='flex-1 '>
      <FollowUps route={{ params: { queryType: 'today' } }} />
    </View>
  );
}