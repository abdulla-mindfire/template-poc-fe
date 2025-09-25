import React, { useState } from 'react';
import { templateAPI } from '../services/api';
import TemplateSelectionModal from './TemplateSelectionModal';

const CompletionScreen = ({ 
  conversationData, 
  sessionId, 
  templatePreview, 
  setGeneratedTemplate, 
  generatedTemplate,
  setTemplatePreview, 
  setShowTemplate,
  onStartNew,
  onEditTemplate 
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showFullData, setShowFullData] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templateVariants, setTemplateVariants] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const proposalData = conversationData.proposal_data || {};

  const handleGeneratePreview = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await templateAPI.generateTemplatePreview(sessionId);
      setTemplatePreview(data.layout_plan || {});
    } catch (err) {
      setError(`Failed to generate preview: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateTemplate = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await templateAPI.generateHtmlTemplate(sessionId);
      setGeneratedTemplate(data.html_template || '');
      setShowTemplate(true);
    } catch (err) {
      setError(`Failed to generate template: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMultipleTemplates = async () => {
    setLoading(true);
    setError('');
    setShowTemplateModal(true);
    setGeneratedTemplate(null);
    try {
      const data = await templateAPI.generateMultipleTemplates(sessionId);
      setTemplateVariants(data.templates || []);
    } catch (err) {
      setError(`Failed to generate template variants: ${err.message}`);
      setShowTemplateModal(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setGeneratedTemplate(template.html_template);
    setShowTemplate(true);
  };

  const handleEditTemplateFromModal = (template) => {
    setSelectedTemplate(template);
    setGeneratedTemplate(template.html_template);
    setShowTemplate(true);
    
    // Navigate to ContentEditor with the selected template
    if (onEditTemplate) {
      onEditTemplate(template);
    }
  };





  return (
    <div className="space-y-6 relative">
      {/* Success Message */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          🎉 Template Ready!
        </h2>
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <p className="text-green-800">
            {conversationData.message || "Great! Your template is ready."}
          </p>
        </div>
      </div>

      {/* Collected Information Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          📊 Collected Information Summary
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-1">Template Type:</h4>
              <p className="text-gray-600">{proposalData.template_type || "Not specified"}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-1">Job Type:</h4>
              <p className="text-gray-600">{proposalData.job_type || "Not specified"}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-1">Brand Description:</h4>
              <p className="text-gray-600">{proposalData.brand_description || "Not provided"}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-1">Selected Sections:</h4>
              <ul className="text-gray-600 space-y-1">
                {(proposalData.selected_sections || []).map((section, index) => (
                  <li key={index}>• {section}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-1">Job Data Integration:</h4>
              <ul className="text-gray-600 space-y-1">
                {Object.entries(proposalData.job_data_integration || {}).map(([key, value]) => {
                  if (value) {
                    return (
                      <li key={key}>• {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-1">Special Highlights:</h4>
              <p className="text-gray-600">{proposalData.special_highlights || "None specified"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Template Generation Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          🚀 Generate Your Template
        </h3>
        
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Primary Action - Generate Multiple Templates */}
          <button
            onClick={handleGenerateMultipleTemplates}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 font-medium text-lg shadow-lg"
          >
            {loading ? '⏳ Generating...' : '🎨 Generate Template'}
          </button>

          {generatedTemplate && 
            <button
            onClick={() => {
              setShowTemplateModal(true)
              setSelectedTemplate(null)
              setGeneratedTemplate(null)
            }}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 font-medium text-lg shadow-lg"
          >
            Switch Template
          </button>
          }

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onStartNew}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors text-sm"
          >
            🔄 Start New
          </button>
            
          </div>
        </div>

        {/* Show Full Data */}
        {showFullData && (
          <div className="mb-6 bg-gray-50 rounded-md p-4">
            <h4 className="font-medium text-gray-700 mb-2">Full Proposal Data:</h4>
            <pre className="text-xs text-gray-600 overflow-auto max-h-64">
              {JSON.stringify(proposalData, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Template Preview (Layout JSON) */}
      {templatePreview && Object.keys(templatePreview).length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            🔍 Template Layout Preview
          </h3>
          
          <div className="bg-gray-50 rounded-md p-4 mb-4">
            <h4 className="font-medium text-gray-700 mb-3">📋 Layout Structure</h4>
            <div className="space-y-3">
              {(templatePreview.layout || []).map((section, index) => (
                <div key={index} className="border-l-2 border-blue-200 pl-3">
                  <h5 className="font-medium text-gray-800">
                    {index + 1}. {section.section || 'Unknown Section'}
                  </h5>
                  <div className="ml-4 space-y-1">
                    {(section.tags || []).map((tag, tagIndex) => {
                      const tagType = tag.type || 'Unknown';
                      const tagContent = tag.content || tag.label || tag.name || 'No content';
                      return (
                        <p key={tagIndex} className="text-sm text-gray-600">
                          {tagIndex + 1}. {tagType}: {tagContent}
                        </p>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerateTemplate}
            disabled={loading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
          >
            {loading ? '⏳ Generating...' : '📄 Generate Full HTML from this Layout'}
          </button>
        </div>
      )}

      {/* Template Selection Modal */}
      <TemplateSelectionModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        templates={templateVariants}
        onSelectTemplate={handleSelectTemplate}
        onEditTemplate={handleEditTemplateFromModal}
        loading={loading && showTemplateModal}
      />

    </div>
  );
};

export default CompletionScreen;
