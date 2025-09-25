import React from 'react';

const ChatMessage = ({ message }) => {
  const isAssistant = message.role === 'assistant';
  
  const formatUserContent = (content) => {
    if (typeof content === 'string' && content.startsWith('{') && content.endsWith('}')) {
      try {
        const data = JSON.parse(content);
        if (data && Object.keys(data).length > 0) {
          return (
            <div>
              <div className="font-semibold text-gray-700 mb-2">Section Details Provided:</div>
              <ul className="space-y-1">
                {Object.entries(data).map(([key, value]) => {
                  if (value) {
                    const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    return (
                      <li key={key} className="text-sm text-gray-600">
                        • {formattedKey}: {value}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          );
        } else {
          return <span className="italic text-gray-500">Skipped section - AI will generate content</span>;
        }
      } catch {
        return content;
      }
    }
    return content;
  };

  if (isAssistant) {
    return (
      <div className="flex items-start space-x-3 mb-4">
        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">🤖</span>
        </div>
        <div className="flex-1 bg-gray-50 rounded-lg p-4">
          <div className="font-semibold text-gray-800 mb-1">
            {message.step_name || 'AI Assistant'}
          </div>
          <div className="text-gray-700 whitespace-pre-wrap">
            {message.content}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-start space-x-3 mb-4 justify-end">
        <div className="flex-1 bg-blue-500 text-white rounded-lg p-4 max-w-md ml-12">
          <div className="whitespace-pre-wrap">
            {formatUserContent(message.content)}
          </div>
        </div>
        <div className="flex-shrink-0 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">👤</span>
        </div>
      </div>
    );
  }
};

export default ChatMessage;
