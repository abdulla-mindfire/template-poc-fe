import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useSessionState } from './hooks/useSessionState';
import { conversationAPI, templateAPI } from './services/api';
import Navigation from './components/Navigation';
import ContentEditor from './components/ContentEditor';
import ChatMessage from './components/ChatMessage';
import SectionForm from './components/SectionForm';
import CompletionScreen from './components/CompletionScreen';
import ClassificationFlow from './components/ClassificationFlow';
import {
  GreetingStep,
  TemplateTypeStep,
  LegalSectionsStep,
  DocumentSectionsStep,
  JobDataIntegrationStep,
  ExtraAdditionsStep,
  FinalDescriptionStep,
  TextInputStep,
  SelectionStep,
  MultiSelectionStep
} from './components/StepComponents';
import { FinalHTMLScreen } from './components/FinalHTMLScreen';
// import { SECTION_FORMS } from './constants'; // Not used in this component

function App() {
  const {
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
    setSessionId,
    setCurrentStep,
    setConversationData,
    setCompleted,
    setChatHistory,
    setAwaitingResponse,
    setGeneratedTemplate,
    setTemplatePreview,
    setShowTemplate,
    resetSession,
    addChatMessage,
    loadSessionData,
    setManualSessionInput
  } = useSessionState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState('template-creator');
  const [selectedTemplateData, setSelectedTemplateData] = useState(null);
  const [useClassification, setUseClassification] = useState(false);
  const [classificationData, setClassificationData] = useState(null);
  const [showSteps, setShowSteps] = useState(false)
  const [content, setContent] = useState(generatedTemplate);
  
  // Refs for auto-scrolling chat containers
  const chatContainerRef = useRef(null);
  const completedChatContainerRef = useRef(null);

  // Auto-scroll to bottom when chat history changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    if (completedChatContainerRef.current) {
      completedChatContainerRef.current.scrollTop = completedChatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, completed]);

  // Start new conversation
  const startNewConversation = useCallback(async (classification = false) => {
    setLoading(true);
    setError('');
    setUseClassification(classification);
    setClassificationData(null);
    try {
      const data = await conversationAPI.startNewConversation(classification);
      setSessionId(data.session_id);
      setCurrentStep(data.step_number);
      setConversationData(data);
      setCompleted(false);
      setChatHistory([]);
      setAwaitingResponse(false);
      
      if (!classification) {
        // Add initial AI message to chat history for traditional flow
        addChatMessage({
          role: "assistant",
          content: data.question || "Welcome! Let's get started.",
          step: data.step_number || 1,
          step_name: data.step_name || "Getting Started"
        });
        setAwaitingResponse(true);
      }
    } catch (err) {
      setError(`Failed to start conversation: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [setSessionId, setCurrentStep, setConversationData, setCompleted, setChatHistory, setAwaitingResponse, addChatMessage]);

  // Handle classification completion
  const handleClassificationComplete = useCallback(async (data) => {
    setLoading(true);
    setError('');
    setClassificationData(data);
    
    try {
      // Submit the five classification responses in sequence
      await conversationAPI.submitResponse(sessionId, 1, data.companyDescription);
      await conversationAPI.submitResponse(sessionId, 2, data.termsConditions);
      await conversationAPI.submitResponse(sessionId, 3, data.extraInformation);
      await conversationAPI.submitResponse(sessionId, 4, data.templateType);
      const finalResponse = await conversationAPI.submitResponse(sessionId, 5, data.tone);
      
      if (finalResponse.completed) {
        setCompleted(true);
        setConversationData(finalResponse);
        setAwaitingResponse(false);
      }
    } catch (err) {
      setError(`Failed to process classification: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  // Submit response to backend
  const submitResponse = useCallback(async (stepNumber, responseData) => {
    setLoading(true);
    setError('');
    try {
      // Format response for display
      let displayContent = String(responseData);
      if (typeof responseData === 'object' && responseData !== null) {
        displayContent = JSON.stringify(responseData);
      } else if (Array.isArray(responseData)) {
        displayContent = responseData.length > 0 ? responseData.join(', ') : 'None selected';
      }
      
      // Add user response to chat history
      addChatMessage({
        role: "user",
        content: displayContent,
        step: stepNumber
      });
      
      const data = await conversationAPI.submitResponse(sessionId, stepNumber, responseData);
      
      if (data.completed) {
        setCompleted(true);
        setConversationData(data);
        setAwaitingResponse(false);
        // Add completion message
        addChatMessage({
          role: "assistant",
          content: data.message || "Great! Your template is ready.",
          step: "completion",
          step_name: "Completed"
        });
      } else {
        setCurrentStep(data.step_number);
        setConversationData(data);
        // Add next AI question to chat history
        addChatMessage({
          role: "assistant",
          content: data.question || "",
          step: data.step_number || stepNumber + 1,
          step_name: data.step_name || `Step ${stepNumber + 1}`
        });
        setAwaitingResponse(true);
      }
    } catch (err) {
      setError(`Failed to submit response: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [sessionId, addChatMessage, setCompleted, setConversationData, setAwaitingResponse, setCurrentStep]);

  // Load existing session
  const loadExistingSession = useCallback(async (sessionIdToLoad) => {
    setLoading(true);
    setError('');
    try {
      const data = await conversationAPI.loadSessionData(sessionIdToLoad);
      loadSessionData(data, sessionIdToLoad);
    } catch (err) {
      setError(`Failed to load session: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [loadSessionData, setGeneratedTemplate, setShowTemplate]);

  // Render current input based on step type
  const renderCurrentInput = () => {
    if (completed) return null;

    const stepType = conversationData.type || "text";
    const fields = conversationData.fields || [];
    const sectionName = conversationData.section_name;

    const handleStepSubmit = (response) => {
      submitResponse(currentStep, response);
    };

    switch (stepType) {
      case "greeting":
        return <GreetingStep conversationData={conversationData} onSubmit={handleStepSubmit} />;
      
      case "selection":
        return <SelectionStep conversationData={conversationData} onSubmit={handleStepSubmit} />;
      
      case "multi_selection":
        return <MultiSelectionStep conversationData={conversationData} onSubmit={handleStepSubmit} />;
      
      case "section_form":
        return (
          <SectionForm
            fields={fields}
            sectionName={sectionName}
            onSubmit={handleStepSubmit}
            onSkip={() => handleStepSubmit({})}
          />
        );
      
      case "text":
        return <TextInputStep conversationData={conversationData} onSubmit={handleStepSubmit} />;
      
      default:
        // Handle specific steps by number for backward compatibility
        switch (currentStep) {
          case 1:
            return <GreetingStep conversationData={conversationData} onSubmit={handleStepSubmit} />;
          case 2:
            return <TemplateTypeStep conversationData={conversationData} onSubmit={handleStepSubmit} />;
          case 3:
            return <LegalSectionsStep conversationData={conversationData} onSubmit={handleStepSubmit} />;
          case 4:
            return <DocumentSectionsStep conversationData={conversationData} onSubmit={handleStepSubmit} />;
          case 5:
            return <JobDataIntegrationStep conversationData={conversationData} onSubmit={handleStepSubmit} />;
          case 6:
            return <ExtraAdditionsStep conversationData={conversationData} onSubmit={handleStepSubmit} />;
          case 7:
            return <FinalDescriptionStep conversationData={conversationData} onSubmit={handleStepSubmit} />;
          default:
            return <TextInputStep conversationData={conversationData} onSubmit={handleStepSubmit} />;
        }
    }
  };

  // Progress calculation
  const getProgress = () => {
    if (completed) return 1.0;
    const totalSteps = 7;
    return Math.min(Math.max((currentStep - 1) / totalSteps, 0.0), 1.0);
  };

  // Base steps for progress display
  const baseSteps = [
    "Template Type",
    "Company Description",
    "Terms & Conditions",
    "Extra Information",
    "Document Tone"
  ]
  // [
  //   "Greeting & Purpose",
  //   "Template Type",
  //   "Legal Sections",
  //   "Document Sections",
  //   "Job Data Integration",
  //   "Extra Additions",
  //   "Final Description"
  // ];

  // Handle template selection and navigation to content editor
  const handleEditTemplate = (templateData) => {
    setSelectedTemplateData(templateData);
    setCurrentPage('content-editor');
  };

  // Handle content changes from ContentEditor
  const handleContentChange = (newContent) => {
    if (selectedTemplateData) {
      setSelectedTemplateData({
        ...selectedTemplateData,
        html_template: newContent
      });
    }
  };

  // Render content based on current page
  const renderPageContent = () => {
    if (currentPage === 'content-editor') {
      return (
        <ContentEditor 
          aiGeneratedContent={""}
          content={content}
          setContent={setContent}
        />
      );
    }
    
    // Template Creator content (existing logic)
    return (
      <>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-lg h-screen overflow-y-auto">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Progress</h2>
            
            {sessionId && (
              <div className="mb-6">
                {completed ? (
                  <div className="text-green-600 font-medium mb-2">✅ Completed!</div>
                ) : (
                  <div className="text-gray-600 mb-2">
                    {conversationData.type === "section_form" 
                      ? `Step ${currentStep} - Section Configuration`
                      : `Step ${currentStep} of ~7`
                    }
                  </div>
                )}
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgress() * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Step List */}
            {sessionId && (
              <div className="space-y-2 mb-6">
                {baseSteps.map((stepName, index) => {
                  const stepNumber = index + 1;
                  let icon = "⏳";
                  if (stepNumber < currentStep || completed) {
                    icon = "✅";
                  } else if (stepNumber === currentStep && !completed) {
                    icon = "🔄";
                  }
                  
                  return (
                    <div key={stepNumber} className="text-sm text-gray-600">
                      {icon} {stepNumber}. {stepName}
                    </div>
                  );
                })}
                
                {/* Show section-specific steps if applicable */}
                {currentStep > 4 && conversationData.type === "section_form" && (
                  <div className="text-sm text-gray-600">
                    🔄 {currentStep}. {conversationData.section_name || "Section Details"} Details
                  </div>
                )}
              </div>
            )}

            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={resetSession}
                className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors mb-4"
              >
                🔄 Start Over
              </button>

              {/* Load Existing Session */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">🔑 Load Existing Session</h3>
                <input
                  type="text"
                  value={manualSessionInput}
                  onChange={(e) => setManualSessionInput(e.target.value)}
                  placeholder="Enter Session ID:"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
                />
                <button
                  onClick={() => {
                    if (manualSessionInput.trim()) {
                      loadExistingSession(manualSessionInput.trim());
                    }
                  }}
                  disabled={!manualSessionInput.trim() || loading}
                  className="w-full bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                >
                  📂 Load Session
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto" id="main-content-container">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
                🤖 AI Document Template Generator
              </h1>
              <p className="text-gray-600">Create professional document templates through guided conversation</p>
            </header>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {!sessionId ? (
              /* Welcome Screen */
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome! 👋</h2>
                <p className="text-gray-600 mb-6">
                  Choose how you'd like to create your professional document template:
                </p>
                
                <div className={`grid grid-cols-1 md:grid-cols-${showSteps ? "2": "1"} gap-6 max-w-2xl mx-auto`}>
                  {/* Streamlined Classification Flow */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">⚡ Advanced document creator</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Paste all your information at once. AI will classify and structure it automatically.
                    </p>
                    <ul className="text-xs text-gray-500 mb-4 text-left space-y-1">
                      <li>• 5 simple steps</li>
                      <li>• AI-powered classification</li>
                      <li>• Instant template generation</li>
                    </ul>
                    <button
                      onClick={() => startNewConversation(true)}
                      disabled={loading}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 font-medium text-sm"
                    >
                      {loading ? '⏳ Starting...' : '🚀 Start Smart Flow'}
                    </button>
                  </div>

                  {/* Traditional Step-by-Step Flow */}
                  {showSteps && <div className="bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-200 rounded-lg p-6">
                    <div className="text-3xl mb-3">📝</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Step-by-Step</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Traditional guided conversation with detailed questions for each section.
                    </p>
                    <ul className="text-xs text-gray-500 mb-4 text-left space-y-1">
                      <li>• Detailed guidance</li>
                      <li>• Section-by-section</li>
                      <li>• Complete customization</li>
                    </ul>
                    <button
                      onClick={() => startNewConversation(false)}
                      disabled={loading}
                      className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 font-medium text-sm"
                    >
                      {loading ? '⏳ Starting...' : '📋 Start Guided Flow'}
                    </button>
                  </div>}
                </div>
              </div>
            ) : completed ? (
              /* Completion Screen */
              <div>
                {/* Show conversation history only for traditional flow */}
                {!useClassification && chatHistory.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">💬 Conversation History</h2>
                    <div 
                      ref={completedChatContainerRef}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-h-96 overflow-y-auto"
                    >
                      {chatHistory.map((message, index) => (
                        <ChatMessage key={index} message={message} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Show classification summary for classification flow */}
                {useClassification && classificationData && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 Classification Summary</h2>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h3 className="font-medium text-gray-700 mb-1">Template Type</h3>
                          <p className="text-gray-900 capitalize">{classificationData.templateType}</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-700 mb-1">Document Tone</h3>
                          <p className="text-gray-900 capitalize">{classificationData.tone}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-medium text-gray-700 mb-2">Company Description</h3>
                          <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded">
                            {classificationData.companyDescription?.substring(0, 150)}...
                          </p>
                        </div>
                        {classificationData.extraInformation && (
                          <div>
                            <h3 className="font-medium text-gray-700 mb-2">Additional Information</h3>
                            <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded">
                              {classificationData.extraInformation.substring(0, 150)}...
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <CompletionScreen
                  conversationData={conversationData}
                  sessionId={sessionId}
                  templatePreview={templatePreview}
                  setGeneratedTemplate={setGeneratedTemplate}
                  generatedTemplate={generatedTemplate}
                  setTemplatePreview={setTemplatePreview}
                  setShowTemplate={setShowTemplate}
                  onStartNew={resetSession}
                  onEditTemplate={handleEditTemplate}
                />
              </div>
            ) : (
              /* Active Conversation */
              <div>
                {useClassification ? (
                  /* Classification Flow */
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">⚡ Smart Template Creation</h2>
                    <ClassificationFlow 
                      onComplete={handleClassificationComplete}
                      loading={loading}
                      error={error}
                      currentStep={currentStep}
                      setCurrentStep={setCurrentStep}
                    />
                  </div>
                ) : (
                  /* Traditional Step-by-Step Flow */
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">💬 Conversation</h2>
                    
                    {/* Current section being configured */}
                    {conversationData.type === "section_form" && conversationData.section_name && (
                      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-md p-3">
                        <p className="text-blue-800 text-sm flex items-center">
                          🎯 Currently configuring: <strong className="ml-1">{conversationData.section_name}</strong>
                        </p>
                      </div>
                    )}

                    {/* Chat History */}
                    <div 
                      ref={chatContainerRef}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 max-h-96 overflow-y-auto"
                    >
                      {chatHistory.map((message, index) => (
                        <ChatMessage key={index} message={message} />
                      ))}
                    </div>

                    {/* Current Input */}
                    <div className="border-t border-gray-200 pt-6">
                      {awaitingResponse ? (
                        renderCurrentInput()
                      ) : (
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-center">
                          <p className="text-blue-800">Processing your response...</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
        {completed && (
          <FinalHTMLScreen
            conversationData={conversationData}
            sessionId={sessionId}
            generatedTemplate={generatedTemplate}
            showTemplate={showTemplate}
            setGeneratedTemplate={setGeneratedTemplate}
            setShowTemplate={setShowTemplate}
            onStartNew={resetSession}
            content={content}
            setContent={setContent}
          />
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPageContent()}
    </div>
  );
}

export default App;
