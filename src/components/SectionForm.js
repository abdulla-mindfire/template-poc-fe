import React, { useState } from 'react';

const SectionForm = ({ fields, sectionName, onSubmit, onSkip }) => {
  const [formData, setFormData] = useState({});

  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleSubmit = () => {
    // Only submit fields that have values and are relevant to this section
    // This matches the original Streamlit logic exactly
    const cleanFormData = {};
    fields.forEach(field => {
      const value = formData[field.name];
      const fieldOptional = field.optional || false;
      
      if (value) {
        if (typeof value === 'string') {
          if (value.trim() !== '' && value !== 'Not specified') {
            cleanFormData[field.name] = value;
          }
        } else {
          cleanFormData[field.name] = value;
        }
      } else if (!fieldOptional) {
        // For non-optional fields, include empty value
        cleanFormData[field.name] = value || '';
      }
    });
    onSubmit(cleanFormData);
  };

  const handleSkip = () => {
    onSkip({});
  };

  const renderField = (field) => {
    const { name, label, type, optional, placeholder, options } = field;
    const displayLabel = optional ? `${label} (Optional)` : label;
    const value = formData[name] || '';

    const baseInputClasses = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
    const baseTextareaClasses = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical";

    switch (type) {
      case 'text':
        return (
          <div key={name} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {displayLabel}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleFieldChange(name, e.target.value)}
              placeholder={placeholder}
              className={baseInputClasses}
            />
          </div>
        );

      case 'textarea':
        return (
          <div key={name} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {displayLabel}
            </label>
            <textarea
              value={value}
              onChange={(e) => handleFieldChange(name, e.target.value)}
              placeholder={placeholder}
              rows={4}
              className={baseTextareaClasses}
            />
          </div>
        );

      case 'selection':
        const displayOptions = [...(options || [])];
        if (optional && !displayOptions.includes("Not specified")) {
          displayOptions.unshift("Not specified");
        }

        return (
          <div key={name} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {displayLabel}
            </label>
            <select
              value={value}
              onChange={(e) => handleFieldChange(name, e.target.value)}
              className={baseInputClasses}
            >
              <option value="">Select an option...</option>
              {displayOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
        📝 {sectionName}
      </h3>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-6">
        <p className="text-sm text-blue-800 flex items-center">
          💡 All fields are optional. If you skip any, our AI will generate appropriate content based on your previous answers.
        </p>
      </div>

      <div className="space-y-4">
        {fields.map(renderField)}
      </div>

      <div className="flex space-x-3 mt-6">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Continue
        </button>
        <button
          onClick={handleSkip}
          className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Skip Section
        </button>
      </div>
    </div>
  );
};

export default SectionForm;
