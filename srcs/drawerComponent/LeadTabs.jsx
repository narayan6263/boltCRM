// LeadTabScreen.js
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { styled } from 'nativewind';
import LeadsScreen from './LeadsScreen';
import LeadOwnedByMe from './MyLeadsTab';
import { RFPercentage } from 'react-native-responsive-fontsize';

const Tab = createMaterialTopTabNavigator();
const StyledView = styled(View);

const LeadTabs = ({ navigation }) => {
  return (
    <StyledView className="flex-1 bg-white">
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#003BFF',
          tabBarInactiveTintColor: '#A19696',
          tabBarLabelStyle: {
            fontSize: RFPercentage(2),
            fontFamily: 'poppins',
            fontWeight: 'medium',
            textTransform: 'none',
          },
          tabBarStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 1,
            borderBottomColor: '#C5C5C5',
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#003BFF',
            height: 3,
          },
        }}
      >
        <Tab.Screen
          name="AllLeads"
          component={LeadsScreen}
          options={{ tabBarLabel: 'All Leads' }}
        />
        <Tab.Screen
          name="MyLeads"
          component={LeadOwnedByMe}
          options={{ tabBarLabel: 'My Leads' }}
        />
      </Tab.Navigator>
    </StyledView>
  );
};

export default LeadTabs;