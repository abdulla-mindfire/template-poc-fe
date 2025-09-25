  import React, { useEffect, useRef, useState } from 'react';
import MediumEditor from 'medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import { FORM_ELEMENTS, PROJECTS_FORM_ELEMENTS } from '../constants';

const TEST_HTML = `
  <div>
    <h1>Test Document</h1>
    <p>This is a test document to demonstrate the content editor functionality.</p>
    <h2>Section 1</h2>
    <p>Here is some sample text for section 1.</p>
    <h2>Section 2</h2>
    <p>Here is some sample text for section 2.</p>
    <h2>Section 3</h2>
    <p>Here is some sample text for section 3.</p>
  </div>
`;

const ContentEditor = ({ aiGeneratedContent = "", isInspectionPage = false, content, setContent }) => {
  const editorRef = useRef(null);
  const mediumEditorRef = useRef(null);
  const [title, setTitle] = useState('');
  const [savedContent, setSavedContent] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [elementProperties, setElementProperties] = useState({});

  // Section toggles state
  const [sectionToggles, setSectionToggles] = useState({
    inspectionPage: isInspectionPage,
    projects: true
  });

  // Inspection page modal state
  const [showInspectionModal, setShowInspectionModal] = useState(false);
  const [selectedImageLayout, setSelectedImageLayout] = useState(1);
  const [hasInspectionPage, setHasInspectionPage] = useState(isInspectionPage);

  useEffect(() => {
    if (editorRef.current && !mediumEditorRef.current) {
      mediumEditorRef.current = new MediumEditor(editorRef.current, {
        toolbar: {
          buttons: [
            'bold',
            'italic',
            'underline',
            'anchor',
            'h2',
            'h3',
            'quote',
            'unorderedlist',
            'orderedlist',
            'removeFormat'
          ]
        },
        placeholder: {
          text: 'Start writing your content here...',
          hideOnClick: true
        }
      });

      mediumEditorRef.current.setContent(aiGeneratedContent);
      setContent(aiGeneratedContent);

      mediumEditorRef.current.subscribe('editableInput', () => {
        setContent(mediumEditorRef.current.getContent());
      });

      // Add click event listener for element selection
      editorRef.current.addEventListener('click', handleElementClick);
    }

    return () => {
      if (mediumEditorRef.current) {
        mediumEditorRef.current.destroy();
        mediumEditorRef.current = null;
      }
    };
  }, []);

    const handleClear = () => {
      setTitle('');
      setContent('');
      if (mediumEditorRef.current) {
        mediumEditorRef.current.setContent('');
      }
    };

    const handleSave = () => {
      if (title.trim() && content.trim()) {
        const newContent = {
          id: Date.now(),
          title: title.trim(),
          content: content,
          createdAt: new Date().toLocaleString(),
          wordCount: content?.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length || 0
        };
        
        setSavedContent(prev => [newContent, ...prev]);
        setTitle('');
        setContent('');
        if (mediumEditorRef.current) {
          mediumEditorRef.current.setContent('');
        }
      }
    };

    const handleLoad = (savedItem) => {
      setTitle(savedItem.title);
      setContent(savedItem.content);
      if (mediumEditorRef.current) {
        mediumEditorRef.current.setContent(savedItem.content);
      }
    };

    const handleDelete = (id) => {
      setSavedContent(prev => prev.filter(item => item.id !== id));
    };

    // Handle element click for property editing
    const handleElementClick = (event) => {
      event.stopPropagation();
      const target = event.target;
      
      // Check if clicked element is editable (input, select, textarea, img, button, table)
      const editableElements = ['INPUT', 'SELECT', 'TEXTAREA', 'IMG', 'BUTTON', 'TABLE', 'TD', 'TH'];
      if (editableElements.includes(target.tagName)) {
        // For table cells, select the parent table
        const elementToSelect = target.tagName === 'TD' || target.tagName === 'TH' ? target.closest('table') : target;
        setSelectedElement(elementToSelect);
        extractElementProperties(elementToSelect);
      } else {
        setSelectedElement(null);
        setElementProperties({});
      }
    };

    // Extract properties from selected element
    const extractElementProperties = (element) => {
      const props = {
        tagName: element.tagName,
        width: element.style.width || element.width || '',
        height: element.style.height || element.height || '',
        margin: element.style.margin || '',
        padding: element.style.padding || '',
        border: element.style.border || '',
        borderRadius: element.style.borderRadius || '',
        backgroundColor: element.style.backgroundColor || '',
        color: element.style.color || '',
      };

      // Element-specific properties
      switch (element.tagName) {
        case 'INPUT':
          props.type = element.type;
          props.placeholder = element.placeholder;
          props.value = element.value;
          props.name = element.name;
          break;
        case 'SELECT':
          props.options = Array.from(element.options).map(opt => ({
            value: opt.value,
            text: opt.text,
            selected: opt.selected
          }));
          props.name = element.name;
          break;
        case 'TEXTAREA':
          props.placeholder = element.placeholder;
          props.value = element.value;
          props.rows = element.rows;
          props.cols = element.cols;
          break;
        case 'IMG':
          props.src = element.src;
          props.alt = element.alt;
          break;
        case 'BUTTON':
          props.type = element.type;
          props.text = element.textContent;
          break;
        case 'TABLE':
          const tbody = element.querySelector('tbody');
          const thead = element.querySelector('thead');
          props.rows = tbody ? tbody.rows.length : element.rows.length;
          props.columns = element.rows[0] ? element.rows[0].cells.length : 0;
          props.borderCollapse = element.style.borderCollapse || 'collapse';
          props.borderSpacing = element.style.borderSpacing || '';
          props.hasHeader = thead && thead.rows.length > 0;
          break;
      }

      setElementProperties(props);
    };

    // Update element properties
    const updateElementProperty = (property, value) => {
      if (!selectedElement) return;

      const newProps = { ...elementProperties, [property]: value };
      setElementProperties(newProps);

      // Apply changes to the actual element
      switch (property) {
        case 'width':
          selectedElement.style.width = value;
          break;
        case 'height':
          selectedElement.style.height = value;
          break;
        case 'margin':
          selectedElement.style.margin = value;
          break;
        case 'padding':
          selectedElement.style.padding = value;
          break;
        case 'border':
          selectedElement.style.border = value;
          break;
        case 'borderRadius':
          selectedElement.style.borderRadius = value;
          break;
        case 'backgroundColor':
          selectedElement.style.backgroundColor = value;
          break;
        case 'color':
          selectedElement.style.color = value;
          break;
        case 'placeholder':
          if (selectedElement.tagName === 'INPUT' || selectedElement.tagName === 'TEXTAREA') {
            selectedElement.placeholder = value;
          }
          break;
        case 'value':
          if (selectedElement.tagName === 'INPUT' || selectedElement.tagName === 'TEXTAREA') {
            selectedElement.value = value;
          }
          break;
        case 'text':
          if (selectedElement.tagName === 'BUTTON') {
            selectedElement.textContent = value;
          }
          break;
        case 'src':
          if (selectedElement.tagName === 'IMG') {
            selectedElement.src = value;
          }
          break;
        case 'alt':
          if (selectedElement.tagName === 'IMG') {
            selectedElement.alt = value;
          }
          break;
        case 'rows':
          if (selectedElement.tagName === 'TEXTAREA') {
            selectedElement.rows = value;
          }
          break;
        case 'borderCollapse':
          if (selectedElement.tagName === 'TABLE') {
            selectedElement.style.borderCollapse = value;
          }
          break;
        case 'borderSpacing':
          if (selectedElement.tagName === 'TABLE') {
            selectedElement.style.borderSpacing = value;
          }
          break;
      }

      // Update content state
      setContent(mediumEditorRef.current.getContent());
    };

    // Handle select options management
    const updateSelectOptions = (options) => {
      if (!selectedElement || selectedElement.tagName !== 'SELECT') return;

      // Clear existing options
      selectedElement.innerHTML = '';

      // Add new options
      options.forEach(option => {
        const optElement = document.createElement('option');
        optElement.value = option.value;
        optElement.textContent = option.text;
        optElement.selected = option.selected;
        selectedElement.appendChild(optElement);
      });

      setElementProperties(prev => ({ ...prev, options }));
      setContent(mediumEditorRef.current.getContent());
    };

    // Handle image upload
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file && selectedElement && selectedElement.tagName === 'IMG') {
        const reader = new FileReader();
        reader.onload = (e) => {
          updateElementProperty('src', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };

    // Table manipulation functions
    const addTableRow = () => {
      if (!selectedElement || selectedElement.tagName !== 'TABLE') return;
      
      const table = selectedElement;
      const tbody = table.querySelector('tbody') || table;
      const newRow = tbody.insertRow();
      const columnCount = elementProperties.columns || 2;
      
      for (let i = 0; i < columnCount; i++) {
        const cell = newRow.insertCell();
        cell.textContent = `Row ${tbody.rows.length}, Cell ${i + 1}`;
        cell.style.border = '1px solid #ccc';
        cell.style.padding = '8px';
        cell.style.verticalAlign = 'top';
      }
      
      // Force content reflow by refreshing table layout
      table.style.margin = '16px 0';
      table.style.width = '100%';
      table.style.maxWidth = '100%';
      table.style.clear = 'both';
      table.style.display = 'table';
      table.style.tableLayout = 'auto';
      table.style.position = 'static';
      table.style.overflow = 'visible';
      table.style.height = 'auto';
      
      // Force complete DOM reflow
      void table.offsetHeight;
      
      // Force Medium Editor to recalculate content
      if (mediumEditorRef.current) {
        const currentContent = mediumEditorRef.current.getContent();
        mediumEditorRef.current.setContent(currentContent);
      }
      
      // Trigger a layout recalculation on the parent container
      const editorContainer = editorRef.current;
      if (editorContainer) {
        void editorContainer.offsetHeight;
      }
      
      extractElementProperties(table);
      setContent(mediumEditorRef.current.getContent());
    };

    const removeTableRow = () => {
      if (!selectedElement || selectedElement.tagName !== 'TABLE') return;
      
      const table = selectedElement;
      const tbody = table.querySelector('tbody');
      const totalRows = tbody ? tbody.rows.length : table.rows.length;
      
      if (totalRows > 1) {
        if (tbody) {
          tbody.deleteRow(tbody.rows.length - 1);
        } else {
          table.deleteRow(table.rows.length - 1);
        }
        
        // Maintain proper spacing and force reflow
        table.style.margin = '16px 0';
        table.style.width = '100%';
        table.style.maxWidth = '100%';
        table.style.clear = 'both';
        table.style.display = 'table';
        table.style.tableLayout = 'auto';
        table.style.position = 'static';
        table.style.overflow = 'visible';
        table.style.height = 'auto';
        
        // Force complete DOM reflow
        void table.offsetHeight;
        
        // Force Medium Editor to recalculate content
        if (mediumEditorRef.current) {
          const currentContent = mediumEditorRef.current.getContent();
          mediumEditorRef.current.setContent(currentContent);
        }
        
        // Trigger a layout recalculation on the parent container
        const editorContainer = editorRef.current;
        if (editorContainer) {
          void editorContainer.offsetHeight;
        }
        
        extractElementProperties(table);
        setContent(mediumEditorRef.current.getContent());
      }
    };

    const addTableColumn = () => {
      if (!selectedElement || selectedElement.tagName !== 'TABLE') return;
      
      const table = selectedElement;
      const thead = table.querySelector('thead');
      const tbody = table.querySelector('tbody');
      
      // Add header cell if thead exists
      if (thead && thead.rows.length > 0) {
        const headerCell = thead.rows[0].insertCell();
        headerCell.textContent = `Header ${thead.rows[0].cells.length}`;
        headerCell.style.border = '1px solid #ccc';
        headerCell.style.padding = '12px 8px';
        headerCell.style.backgroundColor = '#f8f9fa';
        headerCell.style.fontWeight = 'bold';
        headerCell.style.textAlign = 'left';
      }
      
      // Add body cells
      const bodyRows = tbody ? tbody.rows : table.rows;
      for (let i = 0; i < bodyRows.length; i++) {
        const cell = bodyRows[i].insertCell();
        cell.textContent = `Row ${i + 1}, Cell ${bodyRows[i].cells.length}`;
        cell.style.border = '1px solid #ccc';
        cell.style.padding = '8px';
        cell.style.verticalAlign = 'top';
      }
      
      // Maintain proper spacing
      table.style.margin = '16px 0';
      table.style.width = '100%';
      table.style.maxWidth = '100%';
      table.style.clear = 'both';
      
      extractElementProperties(table);
      setContent(mediumEditorRef.current.getContent());
    };

    const removeTableColumn = () => {
      if (!selectedElement || selectedElement.tagName !== 'TABLE') return;
      
      const table = selectedElement;
      const thead = table.querySelector('thead');
      const tbody = table.querySelector('tbody');
      
      // Check if we have more than 1 column
      const firstRow = thead ? thead.rows[0] : (tbody ? tbody.rows[0] : table.rows[0]);
      if (firstRow && firstRow.cells.length > 1) {
        // Remove from header if exists
        if (thead && thead.rows.length > 0) {
          thead.rows[0].deleteCell(thead.rows[0].cells.length - 1);
        }
        
        // Remove from body rows
        const bodyRows = tbody ? tbody.rows : table.rows;
        for (let i = 0; i < bodyRows.length; i++) {
          if (bodyRows[i].cells.length > 0) {
            bodyRows[i].deleteCell(bodyRows[i].cells.length - 1);
          }
        }
        
        // Maintain proper spacing and force reflow
        table.style.margin = '16px 0';
        table.style.width = '100%';
        table.style.maxWidth = '100%';
        table.style.clear = 'both';
        table.style.display = 'table';
        table.style.tableLayout = 'auto';
        table.style.position = 'static';
        table.style.overflow = 'visible';
        table.style.height = 'auto';
        
        // Force complete DOM reflow
        void table.offsetHeight;
        
        // Force Medium Editor to recalculate content
        if (mediumEditorRef.current) {
          const currentContent = mediumEditorRef.current.getContent();
          mediumEditorRef.current.setContent(currentContent);
        }
        
        // Trigger a layout recalculation on the parent container
        const editorContainer = editorRef.current;
        if (editorContainer) {
          void editorContainer.offsetHeight;
        }
        
        extractElementProperties(table);
        setContent(mediumEditorRef.current.getContent());
      }
    };

    const toggleTableHeader = () => {
      if (!selectedElement || selectedElement.tagName !== 'TABLE') return;
      
      const table = selectedElement;
      const firstRow = table.rows[0];
      if (firstRow) {
        const isHeader = firstRow.cells[0].tagName === 'TH';
        
        for (let i = 0; i < firstRow.cells.length; i++) {
          const cell = firstRow.cells[i];
          if (isHeader) {
            // Convert TH to TD
            const newCell = document.createElement('td');
            newCell.innerHTML = cell.innerHTML;
            newCell.style.cssText = cell.style.cssText;
            newCell.style.fontWeight = 'normal';
            newCell.style.backgroundColor = 'transparent';
            firstRow.replaceChild(newCell, cell);
          } else {
            // Convert TD to TH
            const newCell = document.createElement('th');
            newCell.innerHTML = cell.innerHTML;
            newCell.style.cssText = cell.style.cssText;
            newCell.style.fontWeight = 'bold';
            newCell.style.backgroundColor = '#f5f5f5';
            firstRow.replaceChild(newCell, cell);
          }
        }
        
        setContent(mediumEditorRef.current.getContent());
      }
    };

    // Direct insertion functions for form elements
    const insertFormElement = (elementHtml) => {
      
      if (mediumEditorRef.current) {
        // Focus the editor first to ensure proper insertion
        editorRef.current.focus();
        
        // Get current content and append the new element
        const currentContent = mediumEditorRef.current.getContent();
        const newContent = currentContent + elementHtml;
        
        // Set the new content
        mediumEditorRef.current.setContent(newContent);
        
        // Update the state
        setContent(newContent);
                
        // Move cursor to end
        setTimeout(() => {
          const range = document.createRange();
          const selection = window.getSelection();
          range.selectNodeContents(editorRef.current);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        }, 100);
      } else {
        console.error('mediumEditorRef.current is null');
      }
    };

    const formElements = FORM_ELEMENTS;

    // Handle section toggle
    const handleSectionToggle = (section) => {
      setSectionToggles(prev => {
        const newToggles = { ...prev, [section]: !prev[section] };
        
        if (section === 'inspectionPage') {
          if (!prev[section] && !hasInspectionPage) {
            // Turning on inspection page and it doesn't exist yet
            setShowInspectionModal(true);
          } else if (prev[section] && hasInspectionPage) {
            // Turning off inspection page and it exists - remove it
            removeInspectionSection();
            setHasInspectionPage(false);
          }
        }
        return newToggles;
      });
    };

    // Handle inspection page layout selection
    const handleInspectionLayoutSelect = (layout) => {
      setSelectedImageLayout(layout);
      setShowInspectionModal(false);
      
      // Insert inspection section with selected layout only if it doesn't exist
      if (!hasInspectionPage) {
        insertInspectionSection(layout);
        setHasInspectionPage(true);
      }
    };

    // Insert inspection section based on layout
    const insertInspectionSection = (layout) => {
      if (layout < 1 || layout > 4) return;

      // Generate images dynamically
      const images = Array.from({ length: layout }, (_, i) => `
        <img 
          src="https://pcdn.jobprogress.com/app/images/no-image-placeholder.png" 
          alt="Inspection Image ${i + 1}" 
          style="width: 100%; height: auto; border: 1px solid #d1d5db; border-radius: 4px;" 
        />`
      ).join('');

      // For layout 1, center the image; for others, use grid
      const imageContainerStyle = layout === 1
        ? `text-align: center; margin-bottom: 15px;`
        : `display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px;`;

      const inspectionHtml = `
        <div class="inspection-section" id="inspection-section-unique" style="margin: 20px 0; padding: 20px; border: 2px solid #e5e7eb; border-radius: 8px;">
          <h3 style="margin-bottom: 15px; color: #374151;">Inspection Page</h3>
          <div class="image-container" style="${imageContainerStyle}">
            ${images}
          </div>
          <textarea 
            placeholder="Inspection notes and details..." 
            style="width: 100%; height: 120px; padding: 10px; border: 1px solid #d1d5db; border-radius: 4px; resize: vertical;">
          </textarea>
        </div>`;

      insertFormElement(inspectionHtml);
    };

    // Remove inspection section from content
    const removeInspectionSection = () => {
      if (mediumEditorRef.current) {
        // Use DOM manipulation instead of regex for reliable removal
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = mediumEditorRef.current.getContent();
        
        // Find and remove the inspection section by ID
        const inspectionSection = tempDiv.querySelector('#inspection-section-unique');
        if (inspectionSection) {
          inspectionSection.remove();
        }
        
        // Get the updated content
        const updatedContent = tempDiv.innerHTML;
        
        // Update the editor and state
        mediumEditorRef.current.setContent(updatedContent);
        setContent(updatedContent);
      }
    };


    const handleExport = (format) => {
      if (!content.trim()) return;

      let exportContent = '';
      let fileName = '';
      let mimeType = '';

      switch (format) {
        case 'html':
          exportContent = `<!DOCTYPE html>
  <html>
  <head>
      <title>${title || 'Untitled'}</title>
      <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1, h2, h3 { color: #333; }
      </style>
  </head>
  <body>
      <h1>${title || 'Untitled'}</h1>
      ${content}
  </body>
  </html>`;
          fileName = `${title || 'content'}.html`;
          mimeType = 'text/html';
          break;
        case 'txt':
          exportContent = `${title || 'Untitled'}\n\n${content?.replace(/<[^>]*>/g, '')}`;
          fileName = `${title || 'content'}.txt`;
          mimeType = 'text/plain';
          break;
        default:
          return;
      }

      const blob = new Blob([exportContent], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">Content Editor</h1>
              <p className="text-gray-600 mt-1">Create and edit rich content with form elements</p>
            </div>

            <div className="flex">
              {/* Form Elements Sidebar */}
              <div className="w-64 border-r border-gray-200 p-4">
                {/* Document Sections */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📄 Document Sections</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">
                        Inspection Page {hasInspectionPage && '✓'}
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sectionToggles.inspectionPage}
                          onChange={() => handleSectionToggle('inspectionPage')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">
                      Completed projects
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sectionToggles.projects}
                          onChange={() => handleSectionToggle('projects')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                      
                    </div>
                    {sectionToggles.projects && (
                      <div className="pl-6 pb-2 cursor-pointer">
                        <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-200">
                          <span onClick={() => insertFormElement(PROJECTS_FORM_ELEMENTS)} className="text-sm font-medium text-gray-700">
                            ➕ Add Projects
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🔧 Form Elements</h3>
                <div className="space-y-2">
                  {formElements.map((element, index) => (
                    <button
                      key={index}
                      onClick={() => insertFormElement(element.html)}
                      className="w-full flex items-center gap-3 p-3 text-left bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-colors"
                    >
                      <span className="text-xl">{element.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{element.name}</span>
                    </button>
                  ))}
                </div>
                
                {/* Quick Tips */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Quick Tips</h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Toggle sections on/off</li>
                    <li>• Click any element to insert</li>
                    <li>• Elements are added at cursor</li>
                    <li>• Use toolbar for text formatting</li>
                    <li>• Export as HTML for forms</li>
                  </ul>
                </div>
              </div>

              {/* Main Editor Area */}
              <div className="flex-1 p-6">
                {/* Title Input */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter document title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Editor */}
                <div className="mb-4">
                  <div
                    ref={editorRef}
                    className="min-h-96 p-4 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent"
                    style={{ minHeight: '400px' }}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    💾 Save
                  </button>
                  <button
                    onClick={handleClear}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    🗑️ Clear
                  </button>
                  <button
                    onClick={() => handleExport('html')}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    📄 Export HTML
                  </button>
                  <button
                    onClick={() => handleExport('txt')}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    📝 Export Text
                  </button>
                </div>

                {/* Word Count */}
                <div className="text-sm text-gray-500 mb-4">
                  Word count: {content?.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length}
                </div>
              </div>

              {/* Properties Sidebar */}
              <div className="w-80 border-l border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">⚙️ Element Properties</h3>
                
                {!selectedElement ? (
                  <p className="text-gray-500 text-sm">Click on any element in the editor to edit its properties.</p>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <h4 className="font-medium text-blue-800 mb-2">Selected: {elementProperties.tagName}</h4>
                    </div>

                    {/* Common Properties */}
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-700">Dimensions & Spacing</h5>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Width</label>
                          <input
                            type="text"
                            value={elementProperties.width || ''}
                            onChange={(e) => updateElementProperty('width', e.target.value)}
                            placeholder="e.g., 100px, 50%"
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Height</label>
                          <input
                            type="text"
                            value={elementProperties.height || ''}
                            onChange={(e) => updateElementProperty('height', e.target.value)}
                            placeholder="e.g., 100px, auto"
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Margin</label>
                        <input
                          type="text"
                          value={elementProperties.margin || ''}
                          onChange={(e) => updateElementProperty('margin', e.target.value)}
                          placeholder="e.g., 10px, 5px 10px"
                          className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Padding</label>
                        <input
                          type="text"
                          value={elementProperties.padding || ''}
                          onChange={(e) => updateElementProperty('padding', e.target.value)}
                          placeholder="e.g., 8px, 4px 8px"
                          className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Styling Properties */}
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-700">Styling</h5>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Border</label>
                        <input
                          type="text"
                          value={elementProperties.border || ''}
                          onChange={(e) => updateElementProperty('border', e.target.value)}
                          placeholder="e.g., 1px solid #ccc"
                          className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Border Radius</label>
                        <input
                          type="text"
                          value={elementProperties.borderRadius || ''}
                          onChange={(e) => updateElementProperty('borderRadius', e.target.value)}
                          placeholder="e.g., 4px, 50%"
                          className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Background</label>
                          <input
                            type="color"
                            value={elementProperties.backgroundColor || '#ffffff'}
                            onChange={(e) => updateElementProperty('backgroundColor', e.target.value)}
                            className="w-full h-8 border border-gray-300 rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Text Color</label>
                          <input
                            type="color"
                            value={elementProperties.color || '#000000'}
                            onChange={(e) => updateElementProperty('color', e.target.value)}
                            className="w-full h-8 border border-gray-300 rounded"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Element-specific Properties */}
                    {elementProperties.tagName === 'INPUT' && (
                      <div className="space-y-3">
                        <h5 className="font-medium text-gray-700">Input Properties</h5>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Placeholder</label>
                          <input
                            type="text"
                            value={elementProperties.placeholder || ''}
                            onChange={(e) => updateElementProperty('placeholder', e.target.value)}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Default Value</label>
                          <input
                            type="text"
                            value={elementProperties.value || ''}
                            onChange={(e) => updateElementProperty('value', e.target.value)}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    )}

                    {elementProperties.tagName === 'TEXTAREA' && (
                      <div className="space-y-3">
                        <h5 className="font-medium text-gray-700">Textarea Properties</h5>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Placeholder</label>
                          <input
                            type="text"
                            value={elementProperties.placeholder || ''}
                            onChange={(e) => updateElementProperty('placeholder', e.target.value)}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Rows</label>
                          <input
                            type="number"
                            value={elementProperties.rows || ''}
                            onChange={(e) => updateElementProperty('rows', e.target.value)}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    )}

                    {elementProperties.tagName === 'IMG' && (
                      <div className="space-y-3">
                        <h5 className="font-medium text-gray-700">Image Properties</h5>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Upload New Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
                          <input
                            type="text"
                            value={elementProperties.src || ''}
                            onChange={(e) => updateElementProperty('src', e.target.value)}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Alt Text</label>
                          <input
                            type="text"
                            value={elementProperties.alt || ''}
                            onChange={(e) => updateElementProperty('alt', e.target.value)}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>

                        {elementProperties.src && (
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Preview</label>
                            <img 
                              src={elementProperties.src} 
                              alt="Preview" 
                              className="w-full max-h-32 object-contain border border-gray-300 rounded"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {elementProperties.tagName === 'BUTTON' && (
                      <div className="space-y-3">
                        <h5 className="font-medium text-gray-700">Button Properties</h5>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Button Text</label>
                          <input
                            type="text"
                            value={elementProperties.text || ''}
                            onChange={(e) => updateElementProperty('text', e.target.value)}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    )}

                    {elementProperties.tagName === 'SELECT' && (
                      <SelectOptionsManager 
                        options={elementProperties.options || []}
                        onUpdateOptions={updateSelectOptions}
                      />
                    )}

                    {elementProperties.tagName === 'TABLE' && (
                      <div className="space-y-3">
                        <h5 className="font-medium text-gray-700">Table Properties</h5>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Rows</label>
                            <div className="flex items-center gap-1">
                              <span className="text-sm text-gray-600">{elementProperties.rows || 0}</span>
                              <button
                                onClick={addTableRow}
                                className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200"
                              >
                                +
                              </button>
                              <button
                                onClick={removeTableRow}
                                className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200"
                              >
                                -
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Columns</label>
                            <div className="flex items-center gap-1">
                              <span className="text-sm text-gray-600">{elementProperties.columns || 0}</span>
                              <button
                                onClick={addTableColumn}
                                className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200"
                              >
                                +
                              </button>
                              <button
                                onClick={removeTableColumn}
                                className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200"
                              >
                                -
                              </button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Border Collapse</label>
                          <select
                            value={elementProperties.borderCollapse || 'collapse'}
                            onChange={(e) => updateElementProperty('borderCollapse', e.target.value)}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="collapse">Collapse</option>
                            <option value="separate">Separate</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Border Spacing</label>
                          <input
                            type="text"
                            value={elementProperties.borderSpacing || ''}
                            onChange={(e) => updateElementProperty('borderSpacing', e.target.value)}
                            placeholder="e.g., 2px"
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <button
                            onClick={toggleTableHeader}
                            className="w-full px-3 py-2 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
                          >
                            Toggle Header Row
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Inspection Page Modal */}
        {showInspectionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Image Layout</h3>
              <p className="text-gray-600 mb-6">Select the number of images for your inspection page:</p>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleInspectionLayoutSelect(1)}
                  className="w-full flex items-center gap-3 p-4 text-left bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-colors"
                >
                  <div className="w-12 h-8 bg-gray-300 rounded flex items-center justify-center text-xs font-medium">1</div>
                  <span className="text-sm font-medium text-gray-700">Single Image Layout</span>
                </button>
                <button
                  onClick={() => handleInspectionLayoutSelect(2)}
                  className="w-full flex items-center gap-3 p-4 text-left bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-colors"
                >
                  <div className="flex gap-1">
                    <div className="w-6 h-8 bg-gray-300 rounded flex items-center justify-center text-xs font-medium">1</div>
                    <div className="w-6 h-8 bg-gray-300 rounded flex items-center justify-center text-xs font-medium">2</div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Two Images Layout</span>
                </button>
                <button
                  onClick={() => handleInspectionLayoutSelect(3)}
                  className="w-full flex items-center gap-3 p-4 text-left bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-colors"
                >
                  <div className="flex gap-1">
                    <div className="w-6 h-8 bg-gray-300 rounded flex items-center justify-center text-xs font-medium">1</div>
                    <div className="w-6 h-8 bg-gray-300 rounded flex items-center justify-center text-xs font-medium">2</div>
                    <div className="w-6 h-8 bg-gray-300 rounded flex items-center justify-center text-xs font-medium">3</div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Three Images Layout</span>
                </button>

                
                
                <button
                  onClick={() => handleInspectionLayoutSelect(4)}
                  className="w-full flex items-center gap-3 p-4 text-left bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-colors"
                >
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-3 h-4 bg-gray-300 rounded flex items-center justify-center text-xs font-medium">1</div>
                    <div className="w-3 h-4 bg-gray-300 rounded flex items-center justify-center text-xs font-medium">2</div>
                    <div className="w-3 h-4 bg-gray-300 rounded flex items-center justify-center text-xs font-medium">3</div>
                    <div className="w-3 h-4 bg-gray-300 rounded flex items-center justify-center text-xs font-medium">4</div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Four Images Layout</span>
                </button>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowInspectionModal(false)
                    setSectionToggles(prev => ({
                      ...prev,
                      inspectionPage: false
                    }));
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // SelectOptionsManager component for managing select dropdown options
  const SelectOptionsManager = ({ options, onUpdateOptions }) => {
    const [localOptions, setLocalOptions] = useState(options || []);

    const addOption = () => {
      const newOptions = [...localOptions, { value: '', text: '', selected: false }];
      setLocalOptions(newOptions);
      onUpdateOptions(newOptions);
    };

    const updateOption = (index, field, value) => {
      const newOptions = localOptions.map((option, i) => 
        i === index ? { ...option, [field]: value } : option
      );
      setLocalOptions(newOptions);
      onUpdateOptions(newOptions);
    };

    const removeOption = (index) => {
      const newOptions = localOptions.filter((_, i) => i !== index);
      setLocalOptions(newOptions);
      onUpdateOptions(newOptions);
    };

    return (
      <div className="space-y-3">
        <h5 className="font-medium text-gray-700">Select Options</h5>
        
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {localOptions.map((option, index) => (
            <div key={index} className="flex gap-2 items-center p-2 bg-gray-50 rounded">
              <div className="flex-1">
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => updateOption(index, 'text', e.target.value)}
                  placeholder="Option text"
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={option.value}
                  onChange={(e) => updateOption(index, 'value', e.target.value)}
                  placeholder="Option value"
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={option.selected}
                  onChange={(e) => updateOption(index, 'selected', e.target.checked)}
                  className="mr-1"
                />
                <span className="text-xs">Default</span>
              </label>
              <button
                onClick={() => removeOption(index)}
                className="text-red-500 hover:text-red-700 text-xs px-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addOption}
          className="w-full px-3 py-2 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
        >
          + Add Option
        </button>
      </div>
    );
  };

  export default ContentEditor;
