
import apiClient from './apiClient';
import RNFS from 'react-native-fs';

const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

export const postFeedbackApi = async (feedbackData) => {
  console.log('postFeedbackApi called with:', JSON.stringify(feedbackData, null, 2));

  if (!feedbackData?.leadId || !isValidObjectId(feedbackData.leadId)) {
    console.error('Validation error: Invalid or missing leadId', { leadId: feedbackData?.leadId });
    throw new Error('Invalid or missing leadId');
  }
  if (!feedbackData?.status || !isValidObjectId(feedbackData.status)) {
    console.error('Validation error: Invalid or missing status', { status: feedbackData?.status });
    throw new Error('Invalid or missing status');
  }

  let recordedFileUrl = '';
  if (feedbackData.dialUpMethod?.recordedFile) {
    const fileExists = await RNFS.exists(feedbackData.dialUpMethod.recordedFile);
    if (fileExists) {
      const formData = new FormData();
      formData.append('recordedFile', {
        uri: feedbackData.dialUpMethod.recordedFile,
        type: 'audio/mp3',
        name: feedbackData.dialUpMethod.recordedFile.split('/').pop(),
      });

      try {
        const uploadResponse = await apiClient.post('/lead/uploadRecording', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        recordedFileUrl = uploadResponse.data.fileUrl;
        console.log('postFeedbackApi: File uploaded:', recordedFileUrl);
      } catch (error) {
        console.error('postFeedbackApi: File upload failed:', error);
        throw error;
      }
    }
  }

  const payload = {
    leadId: feedbackData.leadId,
    contactDate: feedbackData.contactDateTime || '',
    nextFollowUpDate: feedbackData.nextFollowUpDate || '',
    estimationDate: feedbackData.estimationDate || '',
    estimationBudget: feedbackData.estimationBudget || 0,
    priority: feedbackData.priority || 'Medium',
    method: feedbackData.method || 'Call',
    status: feedbackData.status,
    description: feedbackData.description || '',
    address: feedbackData.address || '',
    reason: feedbackData.reason || '',
    ...(feedbackData.dialUpMethod
      ? {
          dialUpMethod: {
            ...feedbackData.dialUpMethod,
            recordedFile: recordedFileUrl,
          },
        }
      : {}),
  };

  console.log('postFeedbackApi: Constructed payload:', JSON.stringify(payload, null, 2));
  try {
    const response = await apiClient.post('/lead/addFollowUp', payload);
    console.log('postFeedbackApi: Feedback posted:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('postFeedbackApi: Error posting feedback:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      payload: JSON.stringify(payload, null, 2),
    });
    throw error.response?.data || { message: error.message || 'Feedback post failed' };
  }
};