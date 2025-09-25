import { useState, useCallback } from 'react';

export const useSessionState = () => {
  const [sessionId, setSessionId] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [conversationData, setConversationData] = useState({});
  const [completed, setCompleted] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const [generatedTemplate, setGeneratedTemplate] = useState(null);
  const [templatePreview, setTemplatePreview] = useState(null);
  const [showTemplate, setShowTemplate] = useState(false);
  const [manualSessionInput, setManualSessionInput] = useState('');

  const initializeSession = useCallback(() => {
    setSessionId(null);
    setCurrentStep(1);
    setConversationData({});
    setCompleted(false);
    setChatHistory([]);
    setAwaitingResponse(false);
    setGeneratedTemplate(null);
    setTemplatePreview(null);
    setShowTemplate(false);
    setManualSessionInput('');
  }, []);

  const resetSession = useCallback(() => {
    initializeSession();
  }, [initializeSession]);

  const addChatMessage = useCallback((message) => {
    setChatHistory(prev => [...prev, message]);
  }, []);

  const updateConversationData = useCallback((data) => {
    setConversationData(data);
    setCurrentStep(data.step_number || currentStep);
    setCompleted(data.completed || false);
  }, [currentStep]);

  const loadSessionData = useCallback((data, sessionIdToLoad) => {
    setSessionId(sessionIdToLoad);
    setConversationData(data);
    setCompleted(data.completed || false);
    
    // Determine current step
    const steps = data.steps || [];
    if (steps.length > 0) {
      if (data.completed) {
        setCurrentStep(steps[steps.length - 1].step_number);
      } else {
        const incomplete = steps.find(s => !s.completed);
        setCurrentStep(incomplete ? incomplete.step_number : steps[steps.length - 1].step_number);
      }
    } else {
      setCurrentStep(1);
    }
    
    // Reset chat history to avoid mismatches
    setChatHistory([]);
  }, []);

  return {
    // State values
    sessionId,
    currentStep,
    conversationData,
    completed,
    chatHistory,
    awaitingResponse,
    generatedTemplate,
    templatePreview,
    showTemplate,
    manualSessionInput,
    
    // Setters
    setSessionId,
    setCurrentStep,
    setConversationData,
    setCompleted,
    setChatHistory,
    setAwaitingResponse,
    setGeneratedTemplate,
    setTemplatePreview,
    setShowTemplate,
    setManualSessionInput,
    
    // Helper functions
    initializeSession,
    resetSession,
    addChatMessage,
    updateConversationData,
    loadSessionData,
  };
};
