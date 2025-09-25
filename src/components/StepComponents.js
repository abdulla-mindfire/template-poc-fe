import React, { useState } from 'react';

// Step 1: Greeting Component
export const GreetingStep = ({ conversationData, onSubmit }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        👋 Welcome to AI Template Creator
      </h3>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
        <p className="text-blue-800">
          {conversationData.question || "Welcome! Let's get started."}
        </p>
      </div>

      <button
        onClick={() => onSubmit("Ready to start")}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
      >
        Let's Get Started!
      </button>
    </div>
  );
};

// Step 2: Template Type Selection
export const TemplateTypeStep = ({ conversationData, onSubmit }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customTemplate, setCustomTemplate] = useState('');
  const [error, setError] = useState('');

  const options = conversationData.options || [];

  const handleSubmit = () => {
    const response = selectedTemplate === "Other" && customTemplate ? customTemplate : selectedTemplate;
    if (response) {
      setError('');
      onSubmit(response);
    } else {
      setError('Please select or specify a template type.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        📄 Template Type
      </h3>
      
      <p className="text-gray-700 mb-6">
        {conversationData.question || "Please select your template type:"}
      </p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select template type:
        </label>
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Choose an option...</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {selectedTemplate === "Other" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Please specify:
          </label>
          <input
            type="text"
            value={customTemplate}
            onChange={(e) => setCustomTemplate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your custom template type..."
          />
        </div>
      )}

      {error && (
        <div className="mb-4 text-red-600 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
      >
        Continue
      </button>
    </div>
  );
};

// Step 3: Legal Sections
export const LegalSectionsStep = ({ conversationData, onSubmit }) => {
  const [termsConditions, setTermsConditions] = useState('');
  const [warrantyPolicy, setWarrantyPolicy] = useState('');

  const handleSubmit = () => {
    let legalText = '';
    if (termsConditions.trim()) {
      legalText += `Terms & Conditions: ${termsConditions.trim()}`;
    }
    if (warrantyPolicy.trim()) {
      if (legalText) {
        legalText += '\n\n';
      }
      legalText += `Warranty/Payment Policy: ${warrantyPolicy.trim()}`;
    }
    
    onSubmit(legalText || "No legal sections provided");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        ⚖️ Legal Sections
      </h3>
      
      <p className="text-gray-700 mb-4">
        {conversationData.question || "Please provide your legal sections:"}
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-6">
        <p className="text-sm text-blue-800 flex items-center">
          💡 These sections will be inserted exactly as provided and won't be modified by AI.
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Terms & Conditions (Optional):
        </label>
        <textarea
          value={termsConditions}
          onChange={(e) => setTermsConditions(e.target.value)}
          placeholder="Enter your terms and conditions text here..."
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Warranty/Payment Policy (Optional):
        </label>
        <textarea
          value={warrantyPolicy}
          onChange={(e) => setWarrantyPolicy(e.target.value)}
          placeholder="Enter your warranty and payment policy text here..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
      >
        Continue
      </button>
    </div>
  );
};

// Step 4: Document Sections
export const DocumentSectionsStep = ({ conversationData, onSubmit }) => {
  const [selectedSections, setSelectedSections] = useState([
    "Title / Cover Page", 
    "Intro / About Us", 
    "Project Details / Scope"
  ]);
  const [error, setError] = useState('');

  const options = conversationData.options || [];

  const handleSectionToggle = (section) => {
    setSelectedSections(prev => {
      if (prev.includes(section)) {
        return prev.filter(s => s !== section);
      } else {
        return [...prev, section];
      }
    });
  };

  const handleSubmit = () => {
    if (selectedSections.length > 0) {
      setError('');
      onSubmit(selectedSections);
    } else {
      setError('Please select at least one section.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        📋 Document Sections
      </h3>
      
      <p className="text-gray-700 mb-6">
        {conversationData.question || "Select sections to include:"}
      </p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select sections to include:
        </label>
        <div className="space-y-2">
          {options.map((option, index) => (
            <label key={index} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedSections.includes(option)}
                onChange={() => handleSectionToggle(option)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 text-red-600 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
      >
        Continue
      </button>
    </div>
  );
};

// Step 5: Job Data Integration
export const JobDataIntegrationStep = ({ conversationData, onSubmit }) => {
  const [integrationOptions, setIntegrationOptions] = useState([]);

  const options = conversationData.options || [];

  const handleOptionToggle = (option) => {
    setIntegrationOptions(prev => {
      if (prev.includes(option)) {
        return prev.filter(o => o !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const handleSubmit = () => {
    onSubmit(integrationOptions);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        🔗 Job Data Integration
      </h3>
      
      <p className="text-gray-700 mb-6">
        {conversationData.question || "Select data to automatically include:"}
      </p>

      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 mb-3">
          Select data to automatically include:
        </h4>
        <div className="space-y-2">
          {options.map((option, index) => (
            <label key={index} className="flex items-center">
              <input
                type="checkbox"
                checked={integrationOptions.includes(option)}
                onChange={() => handleOptionToggle(option)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
      >
        Continue
      </button>
    </div>
  );
};

// Step 6: Extra Additions
export const ExtraAdditionsStep = ({ conversationData, onSubmit }) => {
  const [extraOptions, setExtraOptions] = useState([]);

  const options = conversationData.options || [];

  const handleOptionToggle = (option) => {
    setExtraOptions(prev => {
      if (prev.includes(option)) {
        return prev.filter(o => o !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const handleSubmit = () => {
    onSubmit(extraOptions);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        ➕ Extra Additions
      </h3>
      
      <p className="text-gray-700 mb-6">
        {conversationData.question || "Select optional extras:"}
      </p>

      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 mb-3">
          Optional extras:
        </h4>
        <div className="space-y-2">
          {options.map((option, index) => (
            <label key={index} className="flex items-center">
              <input
                type="checkbox"
                checked={extraOptions.includes(option)}
                onChange={() => handleOptionToggle(option)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* File upload sections */}
      {extraOptions.includes("Upload marketing brochures / PDFs") && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Marketing Brochures:
          </label>
          <input
            type="file"
            multiple
            accept=".pdf"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {extraOptions.includes("Add manufacturer logos or details") && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Manufacturer Logos:
            </label>
            <input
              type="file"
              multiple
              accept=".png,.jpg,.jpeg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Manufacturer Details:
            </label>
            <textarea
              placeholder="Enter manufacturer information..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            />
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
      >
        Continue
      </button>
    </div>
  );
};

// Step 7: Final Description
export const FinalDescriptionStep = ({ conversationData, onSubmit }) => {
  const [specialHighlights, setSpecialHighlights] = useState('');

  const example = conversationData.example || '';

  const handleSubmit = () => {
    const response = specialHighlights.trim() || "No special highlights";
    onSubmit(response);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        ✨ Final Touches
      </h3>
      
      <p className="text-gray-700 mb-4">
        {conversationData.question || "Add any special highlights:"}
      </p>

      {example && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-6">
          <p className="text-sm text-blue-800 flex items-center">
            💡 Example: {example}
          </p>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Special highlights for your documents:
        </label>
        <textarea
          value={specialHighlights}
          onChange={(e) => setSpecialHighlights(e.target.value)}
          placeholder="What would you like to emphasize in every document? (financing options, warranties, unique services, etc.)"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
      >
        Generate Template
      </button>
    </div>
  );
};

// Generic Text Input Step
export const TextInputStep = ({ conversationData, onSubmit }) => {
  const [textInput, setTextInput] = useState('');
  const [error, setError] = useState('');

  const example = conversationData.example || '';
  const optional = conversationData.optional || false;

  const handleSubmit = () => {
    const response = textInput.trim() || (optional ? "No response provided" : "");
    if (response || optional) {
      setError('');
      onSubmit(response);
    } else {
      setError('Please provide a response.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {example && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-6">
          <p className="text-sm text-blue-800 flex items-center">
            💡 Example: {example}
          </p>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your response:
        </label>
        <textarea
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder={`Enter your response here...${optional ? ' (Optional)' : ''}`}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
        />
      </div>

      {error && (
        <div className="mb-4 text-red-600 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
      >
        Continue
      </button>
    </div>
  );
};

// Generic Selection Step
export const SelectionStep = ({ conversationData, onSubmit }) => {
  const [selected, setSelected] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [error, setError] = useState('');

  const options = conversationData.options || [];

  const handleSubmit = () => {
    const response = selected === "Other" && customInput ? customInput : selected;
    if (response) {
      setError('');
      onSubmit(response);
    } else {
      setError('Please provide a response.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose an option:
        </label>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select an option...</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {selected === "Other" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Please specify:
          </label>
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your custom option..."
          />
        </div>
      )}

      {error && (
        <div className="mb-4 text-red-600 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
      >
        Continue
      </button>
    </div>
  );
};

// Generic Multi-Selection Step
export const MultiSelectionStep = ({ conversationData, onSubmit }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = conversationData.options || [];

  const handleOptionToggle = (option) => {
    setSelectedOptions(prev => {
      if (prev.includes(option)) {
        return prev.filter(o => o !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const handleSubmit = () => {
    const response = [...new Set(selectedOptions)];
    onSubmit(response);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-3">
          Select all that apply:
        </p>
        <div className="space-y-2">
          {options.map((option, index) => (
            <label key={index} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionToggle(option)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
      >
        Continue
      </button>
    </div>
  );
};
