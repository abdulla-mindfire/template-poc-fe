import { useState } from "react";
import { templateAPI } from "../services/api";
import ContentEditor from "./ContentEditor";

export const FinalHTMLScreen = ({ 
    conversationData, 
    sessionId, 
    generatedTemplate, 
    showTemplate,
    setGeneratedTemplate, 
    setShowTemplate,
    onStartNew,
    content,
    setContent 
  }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const proposalData = conversationData.proposal_data || {};

    const handleCopyToClipboard = async () => {
        if (generatedTemplate) {
          try {
            await navigator.clipboard.writeText(content);
            alert('HTML copied to clipboard!');
          } catch (err) {
            console.error('Failed to copy to clipboard:', err);
          }
        }
      };

      const handleDownload = () => {
        if (generatedTemplate) {
          const blob = new Blob([content], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `template_${sessionId}.html`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      };

      const handleRegenerateTemplate = async () => {
        setLoading(true);
        setError('');
        try {
          const data = await templateAPI.generateHtmlTemplate(sessionId);
          setGeneratedTemplate(data.html_template || '');
        } catch (err) {
          setError(`Failed to regenerate template: ${err.message}`);
        } finally {
          setLoading(false);
        }
      };

      const handleOpenInNewTab = () => {
        if (generatedTemplate) {
          const blob = new Blob([content], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          window.open(url, '_blank');
          // Clean up the URL after a short delay to allow the browser to load it
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        }
      };

    return (
      <>
        {/* Generated HTML Template - Full Width Section */}
        {showTemplate && generatedTemplate && (
          <div className="w-full bg-gray-50 px-6 py-6 mt-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                📄 Generated HTML Template
              </h3>
              
              {/* Template Tabs */}
              <div className="border-b border-gray-200 mb-4">
                <nav className="-mb-px flex space-x-8">
                  <button className="border-b-2 border-blue-500 py-2 px-1 text-sm font-medium text-blue-600">
                    🖥️ Preview
                  </button>
                </nav>
              </div>
  
              {/* Template Preview */}
              <ContentEditor 
                aiGeneratedContent={generatedTemplate}
                isInspectionPage={generatedTemplate.includes('inspection-section-unique')}
                content={content}
                setContent={setContent}
              />
  
              {/* HTML Source Code */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">HTML Source Code</h4>
                <div className="bg-gray-50 rounded-md p-4 max-h-64 overflow-auto">
                  <pre className="text-xs text-gray-600">
                    <code>{content}</code>
                  </pre>
                </div>
                
                <button
                  onClick={handleCopyToClipboard}
                  className="mt-2 bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  📋 Copy HTML to Clipboard
                </button>
              </div>
  
              {/* Download Template */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Template Actions</h4>
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={handleDownload}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                  >
                    💾 Download HTML File
                  </button>
                  <button
                    onClick={handleOpenInNewTab}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    🔗 Open in New Tab
                  </button>
                </div>
                
                <div className="mt-3 text-sm text-gray-600">
                  <p><strong>Template Statistics:</strong></p>
                  <p>• File size: {generatedTemplate.length} characters</p>
                  <p>• Session ID: {sessionId}</p>
                  <p>• Template type: {proposalData?.template_type || 'Unknown'}</p>
                </div>
              </div>
  
              {/* Template Actions */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleRegenerateTemplate}
                  disabled={loading}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                >
                  {loading ? '⏳ Regenerating...' : '🔄 Regenerate Template'}
                </button>
                
                <button
                  onClick={() => setShowTemplate(false)}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  ❌ Hide Template
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
  