import React, { useState } from 'react';
import { 
  TEMPLATE_TYPES, 
  DOCUMENT_TONES, 
  SAMPLE_INPUT_EXAMPLES,
  STREAMLINED_FLOW_STEPS 
} from '../constants';

const ClassificationFlow = ({ onComplete, loading, error, currentStep, setCurrentStep }) => {
  const [companyDescription, setCompanyDescription] = useState('');
  const [termsConditions, setTermsConditions] = useState({ terms: '', warranty: '' });
  const [extraInformation, setExtraInformation] = useState('');
  const [selectedTemplateType, setSelectedTemplateType] = useState('');
  const [selectedTone, setSelectedTone] = useState('');

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete the classification flow
      onComplete({
        companyDescription,
        termsConditions,
        extraInformation,
        templateType: selectedTemplateType,
        tone: selectedTone
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedTemplateType !== '';
      case 2:
        return companyDescription.trim().length > 20; // Minimum content requirement
      case 3:
        return true; // Terms & conditions are optional
      case 4:
        return extraInformation.trim().length > 20; // Minimum content requirement
      case 5:
        return selectedTone !== '';
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {STREAMLINED_FLOW_STEPS[1].name}
              </h3>
              <p className="text-gray-600 mb-4">
                {STREAMLINED_FLOW_STEPS[1].description}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {TEMPLATE_TYPES.map((type) => (
                <label
                  key={type.value}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedTemplateType === type.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="templateType"
                    value={type.value}
                    checked={selectedTemplateType === type.value}
                    onChange={(e) => setSelectedTemplateType(e.target.value)}
                    className="mr-3"
                    disabled={loading}
                  />
                  <div>
                    <div className="font-medium text-gray-900">{type.label}</div>
                    <div className="text-sm text-gray-600">{type.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {STREAMLINED_FLOW_STEPS[2].name}
              </h3>
              <p className="text-gray-600 mb-4">
                {STREAMLINED_FLOW_STEPS[2].description}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Description
              </label>
              <textarea
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                placeholder={STREAMLINED_FLOW_STEPS[2].placeholder}
                className="w-full h-64 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                disabled={loading}
              />
              <p className="text-sm text-gray-500 mt-1">
                Minimum 20 characters required. Current: {companyDescription.length}
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {STREAMLINED_FLOW_STEPS[3].name}
              </h3>
              <p className="text-gray-600 mb-4">
                {STREAMLINED_FLOW_STEPS[3].description}
              </p>
            </div>

            <div className="space-y-4">
              {STREAMLINED_FLOW_STEPS[3].options.map((option) => (
                <div key={option.id} className="border border-gray-300 rounded-lg p-4">
                  <label className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={termsConditions[option.id] !== ''}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setTermsConditions(prev => ({ ...prev, [option.id]: ' ' }));
                        } else {
                          setTermsConditions(prev => ({ ...prev, [option.id]: '' }));
                        }
                      }}
                      className="mr-2"
                      disabled={loading}
                    />
                    <span className="font-medium text-gray-900">{option.label}</span>
                  </label>
                  {termsConditions[option.id] !== '' && (
                    <textarea
                      value={termsConditions[option.id].trim()}
                      onChange={(e) => setTermsConditions(prev => ({ ...prev, [option.id]: e.target.value }))}
                      placeholder={option.placeholder}
                      className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      disabled={loading}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {STREAMLINED_FLOW_STEPS[4].name}
              </h3>
              <p className="text-gray-600 mb-4">
                {STREAMLINED_FLOW_STEPS[4].description}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Information
              </label>
              <textarea
                value={extraInformation}
                onChange={(e) => setExtraInformation(e.target.value)}
                placeholder={STREAMLINED_FLOW_STEPS[4].placeholder}
                className="w-full h-64 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                disabled={loading}
              />
              <p className="text-sm text-gray-500 mt-1">
                Minimum 20 characters required. Current: {extraInformation.length}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium text-gray-900 mb-2">Example Input:</h4>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {SAMPLE_INPUT_EXAMPLES.proposal}
              </pre>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {STREAMLINED_FLOW_STEPS[5].name}
              </h3>
              <p className="text-gray-600 mb-4">
                {STREAMLINED_FLOW_STEPS[5].description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {DOCUMENT_TONES.map((tone) => (
                <label
                  key={tone.value}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedTone === tone.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="tone"
                    value={tone.value}
                    checked={selectedTone === tone.value}
                    onChange={(e) => setSelectedTone(e.target.value)}
                    className="mr-3"
                    disabled={loading}
                  />
                  <div>
                    <div className="font-medium text-gray-900">{tone.label}</div>
                    <div className="text-sm text-gray-600">{tone.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of 5
          </span>
          <span className="text-sm text-gray-500">
            {Math.round((currentStep / 5) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        {renderStep()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 1 || loading}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            currentStep === 1 || loading
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!canProceed() || loading}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            !canProceed() || loading
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : currentStep === 3
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : currentStep === 5 ? (
            'Generate Templates'
          ) : (
            'Next'
          )}
        </button>
      </div>
    </div>
  );
};

export default ClassificationFlow;
