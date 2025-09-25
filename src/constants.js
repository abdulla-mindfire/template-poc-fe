export const DEFAULT_COMPANY_DETAILS = {
  company_name: "ABC Construction LLC",
  address: "123 Main Street, Anytown, ST 12345",
  logo: "company_logo.png"
};

export const SECTION_FORMS = {
  "Title / Cover Page": [
    {
      name: "tagline",
      label: "Company Tagline/Slogan",
      type: "text",
      optional: true,
      placeholder: "e.g., 'Building Excellence Since 1995'"
    },
    {
      name: "cover_image_style",
      label: "Cover Image Style",
      type: "text",
      optional: true,
      placeholder: "Not specified"
    },
    {
      name: "contact_info_display",
      label: "Contact Info Display",
      type: "textarea",
      optional: true,
      placeholder: "Not specified"
    }
  ],

  "Intro / About Us": [
    {
      name: "company_story",
      label: "Company Story/History",
      type: "textarea",
      optional: true,
      placeholder: "Brief history, founding story, or mission statement"
    },
    {
      name: "key_values",
      label: "Key Values/Differentiators",
      type: "textarea",
      optional: true,
      placeholder: "What sets you apart from competitors?"
    },
    {
      name: "certifications_awards",
      label: "Certifications/Awards",
      type: "textarea",
      optional: true,
      placeholder: "Any relevant certifications, licenses, or awards"
    },
    {
      name: "team_info",
      label: "Team Information",
      type: "textarea",
      optional: true,
      placeholder: "Team size, years in business, etc."
    }
  ],

  "Project Details / Scope": [
    {
      name: "scope_format",
      label: "Scope Presentation Style",
      type: "text",
      optional: true,
      placeholder: "Not specified"
    },
    {
      name: "technical_specs",
      label: "Technical Specifications",
      type: "textarea",
      optional: true,
      placeholder: "Findings documentation for the project or image url"
    }
  ],

  "Quotes / Estimates": [
    {
      name: "pricing_display",
      label: "Pricing Display Style",
      type: "text",
      optional: true,
      placeholder: "Not specified"
    },
    {
      name: "payment_terms",
      label: "Payment Terms Display",
      type: "textarea",
      optional: true,
      placeholder: "e.g., '50% down, 50% on completion'"
    },
    {
      name: "validity_period",
      label: "Quote Validity Period",
      type: "text",
      optional: true,
      placeholder: "e.g., '30 days', '60 days'"
    },
    {
      name: "financing_info",
      label: "Financing Information",
      type: "textarea",
      optional: true,
      placeholder: "Details about financing options you offer"
    }
  ],

  "Inspection Page": [
    {
      name: "photo_layout",
      label: "Photo Layout Style",
      type: "text",
      optional: true,
      placeholder: "Not specified"
    },
    {
      name: "checklist",
      label: "Include Inspection Checklist",
      type: "text",
      optional: true,
      placeholder: "Not specified"
    },
    {
      name: "findings_doc",
      label: "Findings Documentation",
      type: "textarea",
      optional: true,
      placeholder: "Not specified"
    }
  ],

  "Materials Overview": [
    {
      name: "material_detail",
      label: "Material Detail Level",
      type: "text",
      optional: true,
      placeholder: "Not specified"
    },
    {
      name: "include_warranty",
      label: "Include Warranty Information",
      type: "text",
      optional: true,
      placeholder: "Not specified"
    },
    {
      name: "brand_partners",
      label: "Preferred Brand Partners",
      type: "textarea",
      optional: true,
      placeholder: "List your preferred manufacturers/brands along with details"
    }
  ],

  "Gallery / Projects": [
    {
      name: "gallery_layout",
      label: "Gallery Layout",
      type: "text",
      optional: true,
      placeholder: "Not specified"
    },
    {
      name: "include_descriptions",
      label: "Include Project Descriptions",
      type: "text",
      optional: true,
      placeholder: "Not specified"
    },
    {
      name: "customer_testimonials",
      label: "Include Customer Testimonials",
      type: "text",
      optional: true,
      placeholder: "Not specified"
    },
    {
      name: "project_categories",
      label: "Project Categories to Highlight",
      type: "textarea",
      optional: true,
      placeholder: "e.g., Residential, Commercial, Emergency Repairs"
    }
  ],

  "Authorization Page": [
    {
      name: "signature_method",
      label: "Signature Collection Method",
      type: "text",
      optional: true,
      placeholder: "Not specified"
    },
    {
      name: "approval_process",
      label: "Approval Process",
      type: "text",
      optional: true,
      placeholder: "Not specified"
    }
  ],

  "Signature": [
    {
      name: "signature_lines",
      label: "Number of Signature Lines",
      type: "text",
      optional: true,
      placeholder: "e.g., '2 signature lines'"
    },
    {
      name: "signature_labels",
      label: "Signature Labels",
      type: "textarea",
      optional: true,
      placeholder: "e.g., Customer Signature, Contractor Signature, Witness"
    },
    {
      name: "date_fields",
      label: "Include Date Fields",
      type: "text",
      optional: true,
      placeholder: "e.g., 'Yes, next to each signature'"
    },
    {
      name: "print_name_fields",
      label: "Include Print Name Fields",
      type: "text",
      optional: true,
      placeholder: "e.g., 'Yes, below signatures'"
    }
  ],

  "Terms & Conditions": [
    {
      name: "additional_legal",
      label: "Additional Legal Text",
      type: "textarea",
      optional: true,
      placeholder: "Any additional legal disclaimers or notices"
    },
    {
      name: "acceptance_terms",
      label: "Contract Acceptance Terms",
      type: "textarea",
      optional: true,
      placeholder: "Terms that must be acknowledged before signing"
    }
  ]
};

export const STEPS = [
  { step_number: 1, section: "Title / Cover Page" },
  { step_number: 2, section: "Intro / About Us" },
  { step_number: 3, section: "Project Details / Scope" },
  { step_number: 4, section: "Quotes / Estimates" },
  { step_number: 5, section: "Inspection Page" },
  { step_number: 6, section: "Materials Overview" },
  { step_number: 7, section: "Gallery / Projects" },
  { step_number: 8, section: "Authorization Page" },
  { step_number: 9, section: "Terms & Conditions" }
];

// Backend API URL
export const API_BASE_URL = "https://template-poc-be.onrender.com";

// Streamlined template creation flow constants
export const TEMPLATE_TYPES = [
  { value: "proposal", label: "Proposal", description: "Business proposals and project pitches" },
  // { value: "contract", label: "Contract", description: "Legal agreements and service contracts" },
  // { value: "estimate", label: "Estimate", description: "Cost estimates and project quotes" },
  // { value: "invoice", label: "Invoice", description: "Billing and payment requests" },
  // { value: "work_order", label: "Work Order", description: "Task assignments and work instructions" }
];

export const DOCUMENT_TONES = [
  { value: "professional", label: "Professional", description: "Business-focused and polished" },
  // { value: "friendly", label: "Friendly", description: "Warm and approachable tone" },
  { value: "formal", label: "Formal", description: "Official and structured language" },
  // { value: "conversational", label: "Conversational", description: "Casual and easy-going" },
  { value: "technical", label: "Technical", description: "Detailed and specification-focused" },
  // { value: "persuasive", label: "Persuasive", description: "Compelling and convincing" },
  // { value: "trustworthy", label: "Trustworthy", description: "Reliable and confidence-building" },
  { value: "modern", label: "Modern", description: "Contemporary and innovative" }
];

// Streamlined 5-step flow: Company → Terms → Extra Info → Type → Tone → Generate Templates
export const STREAMLINED_FLOW_STEPS = {
  1: {
    name: "Template Type",
    description: "Select the type of document template you want to create",
    type: "selection",
    options: TEMPLATE_TYPES
  },
  2: {
    name: "Company Description",
    description: "Tell us about your company - who you are and what you do",
    type: "textarea",
    placeholder: "Describe your company, services, experience, values, and what makes you unique..."
  },
  3: {
    name: "Terms & Conditions",
    description: "Do you have specific Terms & Conditions or Warranty language that should be included?",
    type: "terms_conditions",
    options: [
      {id: "terms", label: "Terms & Conditions", placeholder: "Enter your specific terms and conditions..."},
      {id: "warranty", label: "Warranty Information", placeholder: "Enter your warranty details..."}
    ]
  },
  4: {
    name: "Extra Information",
    description: "Paste all your project information, requirements, pricing, timeline, and any other relevant information",
    type: "textarea",
    placeholder: "Paste all your project details, pricing, requirements, timeline, materials, etc. here..."
  },
  5: {
    name: "Document Tone",
    description: "Choose the tone for your document",
    type: "selection",
    options: DOCUMENT_TONES
  }
};

// Complete streamlined process flow
export const COMPLETE_FLOW = {
  STEP_1: "User dumps all data",
  STEP_2: "AI classifies and structures data", 
  STEP_3: "Variant Selector Agent picks top 5 templates",
  STEP_4: "Content Generation Agent creates content",
  STEP_5: "HTML Finalization generates final templates"
};

export const SAMPLE_INPUT_EXAMPLES = {
  proposal: `ABC Roofing Company - established 1995
Team of 15 certified professionals
10-year warranty on installations

Project: Complete roof replacement
- Remove existing shingles
- Install new underlayment
- Install GAF Timberline HD shingles
- Replace gutters

Pricing: Labor $8,500, Materials $6,200, Total $14,850
Payment: 50% down, 50% completion
Timeline: 3-4 days`,
  
  contract: `XYZ Construction LLC
Licensed and insured contractor

Contract for kitchen renovation
- Demo existing kitchen
- Install new cabinets and countertops
- Electrical and plumbing updates
- Flooring installation

Total contract value: $45,000
Payment schedule: 25% down, 25% at rough-in, 50% completion
Project duration: 6-8 weeks
Warranty: 2 years on workmanship`,
  
  estimate: `Home Improvement Services
Free estimates, licensed contractor

Bathroom remodel estimate
- Tile work: $3,200
- Plumbing: $1,800
- Electrical: $900
- Labor: $2,100

Total estimate: $8,000
Valid for 30 days
Financing available`
};

// API endpoints for streamlined flow
export const API_ENDPOINTS = {
  START_CONVERSATION: '/conversation/start',
  GET_CONVERSATION: '/conversation',
  RESPOND_TO_QUESTION: '/conversation/{session_id}/respond',
  GENERATE_TEMPLATES: '/template/generate-multiple/{session_id}'
};

// Available document sections (auto-detected by AI)
export const AVAILABLE_SECTIONS = [
  "Title / Cover Page",
  "Intro / About Us",
  "Project Details / Scope",
  "Quotes / Estimates",
  "Inspection Page (with space for photos)",
  "Materials / Manufacturer Overview",
  "Gallery / Past Projects",
  "Authorization Page (signatures, approvals)",
  "Signature",
  "Terms & Conditions (locked section)"
];

// UI flow states
export const FLOW_STATES = {
  INPUT_DUMP: 'input_dump',
  TEMPLATE_TYPE: 'template_type',
  DOCUMENT_TONE: 'document_tone',
  GENERATING: 'generating_templates',
  TEMPLATES_READY: 'templates_ready',
  ERROR: 'error'
};

export const FORM_ELEMENTS = [
  {
    name: 'Text Input',
    icon: '📝',
    html: '<input type="text" placeholder="Enter text here" style="border: 1px solid #ccc; padding: 4px 8px; margin: 2px; border-radius: 4px;" />'
  },
  // {
  //   name: 'Password Input',
  //   icon: '🔒',
  //   html: '<input type="password" placeholder="Enter password" style="border: 1px solid #ccc; padding: 4px 8px; margin: 2px; border-radius: 4px;" />'
  // },
  // {
  //   name: 'Email Input',
  //   icon: '📧',
  //   html: '<input type="email" placeholder="Enter email" style="border: 1px solid #ccc; padding: 4px 8px; margin: 2px; border-radius: 4px;" />'
  // },
  // {
  //   name: 'Number Input',
  //   icon: '🔢',
  //   html: '<input type="number" placeholder="Enter number" style="border: 1px solid #ccc; padding: 4px 8px; margin: 2px; border-radius: 4px;" />'
  // },
  // {
  //   name: 'Date Input',
  //   icon: '📅',
  //   html: '<input type="date" style="border: 1px solid #ccc; padding: 4px 8px; margin: 2px; border-radius: 4px;" />'
  // },
  {
    name: 'Checkbox',
    icon: '☑️',
    html: '<label style="display: block; margin: 4px 0;"><input type="checkbox" style="margin-right: 8px;" /> Checkbox option</label>'
  },
  {
    name: 'Radio Button',
    icon: '🔘',
    html: '<label style="display: block; margin: 4px 0;"><input type="radio" name="radiogroup" style="margin-right: 8px;" /> Radio option</label>'
  },
  {
    name: 'Select Dropdown',
    icon: '📋',
    html: '<select style="border: 1px solid #ccc; padding: 4px 8px; margin: 2px; border-radius: 4px;"><option value="option1">Option 1</option><option value="option2">Option 2</option><option value="option3">Option 3</option></select>'
  },
  {
    name: 'Textarea',
    icon: '📄',
    html: '<textarea placeholder="Enter your message here" rows="3" style="border: 1px solid #ccc; padding: 8px; margin: 2px; border-radius: 4px; width: 100%; resize: vertical;"></textarea>'
  },
  {
    name: 'Button',
    icon: '🔲',
    html: '<button type="button" style="background: #3b82f6; color: white; padding: 8px 16px; border: none; border-radius: 4px; margin: 4px; cursor: pointer;">Click me</button>'
  },
  // {
  //   name: 'Submit Button',
  //   icon: '✅',
  //   html: '<button type="submit" style="background: #10b981; color: white; padding: 8px 16px; border: none; border-radius: 4px; margin: 4px; cursor: pointer;">Submit</button>'
  // },
  {
    name: 'Image',
    icon: '📁',
    html: '<img src="https://pcdn.jobprogress.com/app/images/no-image-placeholder.png" alt="" style="border: 1px solid #ccc; padding: 4px 8px; margin: 2px; border-radius: 4px; width: 50px; height: 50px;" />'
  },
  {
    name: 'New Line',
    icon: '↩️',
    html: '<br />'
  },
  {
    name: 'Signature',
    icon: '✍️',
    html: `<div class="sign" style="margin: 20px 0;">
              <div class="jp-border jp-signature" style="width: 230px; height: 80px; border: 1px solid #ccc; position: relative; background-color: #fafafa;">
                  <img class="sign-temp" src="https://dev-app.jobprog.net/img/sign.png" alt="Signature placeholder" style="width: 100%; height: 60%; object-fit: contain; opacity: 0.3;" />
                  <div class="sign-date" style="position: absolute; bottom: 5px; left: 10px; font-size: 12px; color: #666;">Signature Date</div>
              </div>
          </div>`
  },
  {
    name: 'Range Slider',
    icon: '🎚️',
    html: '<input type="range" min="0" max="100" value="50" style="margin: 8px;" />'
  },
  {
    name: 'Horizontal Rule',
    icon: '📏',
    html: '<hr style="margin: 8px;" />'
  },
  {
    name: "Table",
    icon: '📊',
    html: '<table style="border-collapse: collapse; margin: 16px 0; width: 100%; max-width: 100%; table-layout: auto; clear: both; display: table; position: static; overflow: visible;"><thead><tr><th style="border: 1px solid #ccc; padding: 12px 8px; background-color: #f8f9fa; font-weight: bold; text-align: left;">Header 1</th><th style="border: 1px solid #ccc; padding: 12px 8px; background-color: #f8f9fa; font-weight: bold; text-align: left;">Header 2</th></tr></thead><tbody><tr><td style="border: 1px solid #ccc; padding: 8px; vertical-align: top;">Row 1, Cell 1</td><td style="border: 1px solid #ccc; padding: 8px; vertical-align: top;">Row 1, Cell 2</td></tr><tr><td style="border: 1px solid #ccc; padding: 8px; vertical-align: top;">Row 2, Cell 1</td><td style="border: 1px solid #ccc; padding: 8px; vertical-align: top;">Row 2, Cell 2</td></tr></tbody></table>'
  },
  {
    name: 'Color Picker',
    icon: '🎨',
    html: '<input type="color" value="#3b82f6" style="border: 1px solid #ccc; padding: 2px; margin: 2px; border-radius: 4px; width: 50px; height: 30px;" />'
  }
];


export const PROJECTS_FORM_ELEMENTS = 
   `<div class="textarea" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle" style="">
          <h3><b>Projects: </b></h3>
          <div style="width:230px;height:auto; position: relative;" class="">
            <textarea jp-attr-id="" style="width:230px;height:80px;border: 1px solid #ccc;" ng-class="{{ 
                'input-filled': item.filled, 
                'public-input': item.public.id
            }}" filled-val="" type="text" class="form-control" ng-attr-maxlength="{{{{item.maxlength}}}}" name="textarea_"></textarea>
          </div>
        </div>`