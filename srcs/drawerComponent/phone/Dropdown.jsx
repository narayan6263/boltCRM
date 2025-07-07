

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomPoppinsFonts from '../../font/CustomPoppinsFonts'; // Adjust import path as needed

const StyledView = styled(View);
const StyledText = styled(CustomPoppinsFonts);
const StyledTouchable = styled(TouchableOpacity);

const Dropdown = ({
  visible,
  setVisible,
  selectedValue,
  setSelectedValue,
  options = [],
  placeholder,
  setSelectedId,
}) => {
  // console.log('Dropdown: Rendering with options', options.length);
  return (
    <>
      <StyledTouchable
        className="bg-gray-100 border border-gray-300 p-3 rounded-lg flex-row justify-between items-center"
        onPress={() => {
          // console.log('Dropdown: Toggling visibility for', placeholder);
          setVisible((prev) => !prev);
        }}
      >
        <StyledText
          className={`text-sm font-poppins ${
            selectedValue ? 'text-gray-900' : 'text-gray-400'
          } flex-1`}
        >
          {selectedValue || placeholder}
        </StyledText>
        <Ionicons
          name={visible ? 'chevron-up' : 'chevron-down'}
          size={16}
          color="#4B5563"
        />
      </StyledTouchable>
      {visible && (
        <StyledView className="border border-gray-300 rounded-lg mt-1 bg-gray-100 max-h-48 shadow-sm">
          <ScrollView nestedScrollEnabled>
            {options.length ? (
              options.map((option, index) => {
                const displayText = option?.name || 'Unknown';
                const id = option?._id || null;
                return (
                  <StyledTouchable
                    key={`${id || index}`}
                    onPress={() => {
                      console.log('Dropdown: Selected', { displayText, id });
                      setSelectedValue(displayText);
                      if (setSelectedId) setSelectedId(id);
                      setVisible(false);
                    }}
                    className="p-3"
                  >
                    <StyledText className="text-gray-900 font-poppins text-sm">
                      {displayText}
                    </StyledText>
                  </StyledTouchable>
                );
              })
            ) : (
              <StyledText className="text-gray-600 font-poppins text-sm p-3">
                No options available
              </StyledText>
            )}
          </ScrollView>
        </StyledView>
      )}
    </>
  );
};

export default Dropdown;