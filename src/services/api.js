import { API_BASE_URL } from '../constants';

// Simple fetch wrapper since we can't install axios
const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const conversationAPI = {
  // Start a new conversation with the backend
  startNewConversation: async (useClassification = false) => {
    return apiRequest(`${API_BASE_URL}/conversation/start`, {
      method: 'POST',
      body: JSON.stringify({ use_classification: useClassification }),
    });
  },

  // Start a new classification conversation
  startClassificationConversation: async () => {
    return apiRequest(`${API_BASE_URL}/conversation/start`, {
      method: 'POST',
      body: JSON.stringify({ use_classification: true }),
    });
  },

  // Get current conversation state from backend
  getConversationState: async (sessionId) => {
    return apiRequest(`${API_BASE_URL}/conversation/${sessionId}`);
  },

  // Submit response to backend
  submitResponse: async (sessionId, stepNumber, responseData) => {
    const payload = {
      step_number: stepNumber,
      response: responseData
    };
    
    return apiRequest(`${API_BASE_URL}/conversation/${sessionId}/respond`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Load existing session data
  loadSessionData: async (sessionId) => {
    return apiRequest(`${API_BASE_URL}/conversation/${sessionId}/data`);
  }
};

export const templateAPI = {
  // Generate HTML template from completed conversation
  generateHtmlTemplate: async (sessionId) => {
    return apiRequest(`${API_BASE_URL}/template/generate/${sessionId}`, {
      method: 'POST',
    });
  },

  // Generate multiple template variants from completed conversation
  generateMultipleTemplates: async (sessionId) => {
    return apiRequest(`${API_BASE_URL}/template/generate-multiple/${sessionId}`, {
      method: 'POST',
    });
  },

  // Generate template layout preview (JSON)
  generateTemplatePreview: async (sessionId) => {
    return apiRequest(`${API_BASE_URL}/template/generate/preview/${sessionId}`, {
      method: 'POST',
    });
  }
};

const apiService = {
  conversation: conversationAPI,
  template: templateAPI,
};

export default apiService;
