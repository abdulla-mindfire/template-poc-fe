import React, { useState, useEffect } from 'react';

const TemplateSelectionModal = ({ 
  isOpen, 
  onClose, 
  templates, 
  onSelectTemplate,
  onEditTemplate,
  loading 
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewMode, setPreviewMode] = useState('thumbnail'); // 'thumbnail' or 'fullscreen'

  useEffect(() => {
    if (templates && templates.length > 0) {
      setSelectedTemplate(templates[0]);
    }
  }, [templates]);

  if (!isOpen) return null;

  const handleSelectTemplate = () => {
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate);
      onClose();
    }
  };

  const handleEditTemplate = () => {
    if (selectedTemplate) {
      onEditTemplate(selectedTemplate);
      onClose();
    }
  };

  const getVariantIcon = (variantName) => {
    const icons = {
      'Classic Professional': '🏛️',
      'Modern Minimalist': '✨',
      'Bold Corporate': '💪',
      'Technical Detailed': '🔧',
      'Creative Visual': '🎨'
    };
    return icons[variantName] || '📄';
  };

  const getVariantColor = (variantName) => {
    const colors = {
      'Classic Professional': 'border-blue-500 bg-blue-50',
      'Modern Minimalist': 'border-gray-500 bg-gray-50',
      'Bold Corporate': 'border-red-500 bg-red-50',
      'Technical Detailed': 'border-green-500 bg-green-50',
      'Creative Visual': 'border-purple-500 bg-purple-50'
    };
    return colors[variantName] || 'border-gray-300 bg-gray-50';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">🎨 Choose Your Template Design</h2>
              <p className="text-blue-100">Select from 5 professionally designed template variants</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Generating your template variants...</p>
              <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 min-h-0">
            {/* Template List Sidebar */}
            <div className="w-80 border-r border-gray-200 overflow-y-auto">
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-4">Available Designs</h3>
                <div className="space-y-3">
                  {templates?.map((template, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedTemplate(template)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedTemplate?.variant_name === template.variant_name
                          ? `${getVariantColor(template.variant_name)} border-opacity-100`
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">{getVariantIcon(template.variant_name)}</span>
                        <div>
                          <h4 className="font-semibold text-gray-800">{template.variant_name}</h4>
                          <p className="text-xs text-gray-600 mt-1">{template.variant_description}</p>
                        </div>
                      </div>
                      
                      {/* Design Config Preview */}
                      <div className="mt-3 flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: template.design_config?.primary_color }}
                          title="Primary Color"
                        ></div>
                        <div 
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: template.design_config?.accent_color }}
                          title="Accent Color"
                        ></div>
                        <span className="text-xs text-gray-500 ml-2">
                          {template.design_config?.layout_style}
                        </span>
                      </div>
                      {selectedTemplate?.variant_name === template.variant_name && (<>
                      <br />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setPreviewMode('thumbnail')}
                          className={`px-3 py-1 text-sm rounded ${
                            previewMode === 'thumbnail' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-white text-gray-600 border'
                          }`}
                        >
                          📱 Fit to Screen
                        </button>
                        <button
                          onClick={() => setPreviewMode('fullscreen')}
                          className={`px-3 py-1 text-sm rounded ${
                            previewMode === 'fullscreen' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-white text-gray-600 border'
                          }`}
                        >
                          🔍 Full Size
                        </button>
                      </div>
                      </>)}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 flex flex-col">
              {selectedTemplate && (
                <>
                  {/* HTML Preview */}
                  <div className="flex-1 overflow-auto bg-gray-100 p-4">
                    <div className={`bg-white shadow-lg mx-auto ${
                      previewMode === 'thumbnail' ? 'max-w-4xl transform scale-75 origin-top' : 'w-full'
                      }`}>
                      <iframe
                        srcDoc={selectedTemplate.html_template}
                        className="w-full h-[800px] border-0"
                        title={`${selectedTemplate.variant_name} Preview`}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Footer - Always visible at bottom */}
        <div className="flex-shrink-0 p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {templates?.length || 0} template variants available
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSelectTemplate}
                disabled={!selectedTemplate}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ✨ Use This Template
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelectionModal;
