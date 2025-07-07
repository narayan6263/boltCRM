import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const DocumentPickerExample = () => {
  const [fileInfo, setFileInfo] = useState(null);

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: false,
      });

      setFileInfo(res[0]); // single file
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.error('DocumentPicker Error:', err);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Pick Document" onPress={pickDocument} />
      {fileInfo && (
        <View style={styles.fileInfo}>
          <Text>Name: {fileInfo.name}</Text>
          <Text>Type: {fileInfo.type}</Text>
          <Text>Size: {fileInfo.size} bytes</Text>
          <Text>URI: {fileInfo.uri}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
  },
  fileInfo: {
    marginTop: 20,
  },
});

export default DocumentPickerExample;
