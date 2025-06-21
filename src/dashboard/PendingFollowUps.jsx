import { View } from 'react-native';
import React from 'react';
import FollowUps from './FollowUps';

export default function PendingFollowUps() {
  return (
    <View className='flex-1'>
      <FollowUps route={{ params: { queryType: 'pending' } }} />
    </View>
  );
}