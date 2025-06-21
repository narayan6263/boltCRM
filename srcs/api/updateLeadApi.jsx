
import apiClient from './apiClient';

const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

export const updateLeadApi = async (leadId, leadData, postUpdatedLead = false) => {
  console.log('updateLeadApi called with:', { leadId, leadData, postUpdatedLead });

  // Validate leadId
  if (!leadId || !isValidObjectId(leadId)) {
    console.error('Validation error: Invalid or missing leadId', { leadId });
    throw new Error('Invalid or missing leadId');
  }

  // Validate required fields
  if (!leadData?.source) {
    console.error('Validation error: Source is required', { leadData });
    throw new Error('Source is required');
  }
  if (!leadData?.priority || !['low', 'medium', 'high', 'important'].includes(leadData.priority.toLowerCase())) {
    console.error('Validation error: Invalid or missing priority', { priority: leadData?.priority });
    throw new Error('Priority must be one of: low, medium, high, important');
  }

  // Validate comment (optional, max 500 characters)
  if (leadData?.comment && (typeof leadData.comment !== 'string' || leadData.comment.length > 500)) {
    console.error('Validation error: Invalid comment', { comment: leadData.comment });
    throw new Error('Comment must be a string with a maximum of 500 characters');
  }

  // Construct payload
  const payload = {
    source: leadData.source,
    description: leadData.description || '',
    reference: leadData.reference || '',
    model: leadData.model || '',
    priority: leadData.priority.toLowerCase(),
    comment: leadData.comment || '', // Include comment field
    branch: leadData.branch || '', // Include branch field
  };

  console.log('Constructed payload:', JSON.stringify(payload, null, 2));

  try {
    const response = await apiClient.put(
      `/lead/updateLead/${leadId}${postUpdatedLead ? '?postUpdatedLead=true' : ''}`,
      payload
    );
    console.log('✅ Lead updated:', JSON.stringify(response.data, null, 2));
    return response.data.data; // Adjust based on your API response structure
  } catch (error) {
    console.error('❌ Error updating lead:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      payload: JSON.stringify(payload, null, 2),
    });
    throw error.response?.data || { message: error.message || 'Failed to update lead' };
  }
};