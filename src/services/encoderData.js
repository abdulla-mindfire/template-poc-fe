import axios from "axios";


  const data = {
    "A": [
      {
        "edit": true,
        "disable": false,
        "resize": true,
        "type": "col1",
        "label": "Container Column(s)",
        "columns": [
          [
            {
              "type": "label",
              "placeholder": "<img src=\"https://s3-us-west-2.amazonaws.com/jp.company.resources/public/uploads/templates/media/1495799902_2088826355.jpg\" alt=\"Company Logo\" style=\"height: auto; width: 200px\" />",
              "label": "Text",
              "icon": "label-icon",
              "style": [
                "margin:0;"
              ],
              "textSize": 14,
              "rqdTxtColor": true,
              "lineHeight": 25,
              "height": "25px",
              "width": "150px",
              "textColor": "#555555",
              "edit": true,
              "bold": false,
              "italic": false,
              "underline": false,
              "disable": false,
              "resize": true,
              "id": 1
            }
          ],
          [
            {
              "type": "label",
              "placeholder": "<p style=\"font-family: Arial, sans-serif; margin: 20px 0; text-align: center; font-size: 28px; font-weight: bold; color: #2c3e50\">Proposal</p>",
              "label": "Text",
              "icon": "label-icon",
              "style": [
                "margin:0;"
              ],
              "textSize": 14,
              "rqdTxtColor": true,
              "lineHeight": 25,
              "height": "25px",
              "width": "150px",
              "textColor": "#555555",
              "edit": true,
              "bold": false,
              "italic": false,
              "underline": false,
              "disable": false,
              "resize": true,
              "id": 2
            }
          ],
          [
            {
              "type": "label",
              "placeholder": "<p style=\"font-family: Arial, sans-serif; margin: 10px 0; text-align: right; font-size: 14px; line-height: 1.5; color: #34495e\">719 S 50th St,<br>Tampa, FL 33619, USA<br>contact@americancsi.com</p>",
              "label": "Text",
              "icon": "label-icon",
              "style": [
                "margin:0;"
              ],
              "textSize": 14,
              "rqdTxtColor": true,
              "lineHeight": 25,
              "height": "25px",
              "width": "150px",
              "textColor": "#555555",
              "edit": true,
              "bold": false,
              "italic": false,
              "underline": false,
              "disable": false,
              "resize": true,
              "id": 3
            }
          ]
        ],
        "border": false,
        "totalLength": "3",
        "icon": "column5-icon",
        "id": "3f0bd8c1"
      },
      {
        "edit": false,
        "disable": false,
        "resize": true,
        "type": "space",
        "label": "Spacer",
        "icon": "spacer-icon",
        "height": "40px",
        "width": "40px",
        "minHeight": "40",
        "maxHeight": "40",
        "id": "5397f18a"
      },
      {
        "edit": true,
        "disable": false,
        "resize": true,
        "type": "label",
        "placeholder": "Building future",
        "label": "Text",
        "icon": "label-icon",
        "style": [
          "margin:0;"
        ],
        "textSize": 14,
        "rqdTxtColor": true,
        "lineHeight": 25,
        "height": "25px",
        "width": "150px",
        "textColor": "#555555",
        "bold": false,
        "italic": false,
        "underline": false,
        "id": "6bf46ecf"
      },
      {
        "type": "line",
        "label": "Line Break",
        "icon": "line-break-icon",
        "edit": false,
        "disable": false,
        "resize": false,
        "id": "5120e5a8"
      },
      {
        "edit": false,
        "disable": false,
        "resize": true,
        "type": "img",
        "label": "Image",
        "icon": "image-icon",
        "imgPath": "cover_image.jpg",
        "alt": "Professional Cover Image",
        "height": "50px",
        "width": "50px",
        "image": true,
        "id": "50a8669f"
      },
      {
        "type": "line",
        "label": "Line Break",
        "icon": "line-break-icon",
        "edit": false,
        "disable": false,
        "resize": false,
        "id": "a1885a7f"
      },
      {
        "edit": true,
        "disable": false,
        "resize": true,
        "type": "label",
        "placeholder": "Contact us for reliable and quality contracting services.",
        "label": "Text",
        "icon": "label-icon",
        "style": [
          "margin:0;"
        ],
        "textSize": 14,
        "rqdTxtColor": true,
        "lineHeight": 25,
        "height": "25px",
        "width": "150px",
        "textColor": "#555555",
        "bold": false,
        "italic": false,
        "underline": false,
        "id": "b41ae238"
      },
      {
        "type": "line",
        "label": "Line Break",
        "icon": "line-break-icon",
        "edit": false,
        "disable": false,
        "resize": false,
        "id": "b2827fce"
      },
      {
        "edit": true,
        "disable": false,
        "resize": true,
        "type": "label",
        "placeholder": "About Hudson Contracting",
        "label": "Text",
        "icon": "label-icon",
        "style": [
          "margin:0;"
        ],
        "textSize": 14,
        "rqdTxtColor": true,
        "lineHeight": 25,
        "height": "25px",
        "width": "150px",
        "textColor": "#555555",
        "bold": false,
        "italic": false,
        "underline": false,
        "id": "e85c8aab"
      },
      {
        "type": "line",
        "label": "Line Break",
        "icon": "line-break-icon",
        "edit": false,
        "disable": false,
        "resize": false,
        "id": "74d9646a"
      },
      {
        "edit": true,
        "disable": false,
        "resize": true,
        "type": "label",
        "placeholder": "At Hudson Contracting, roofing isn’t just our business — it’s our legacy. Proudly serving our community since 1990, we’ve built our reputation on craftsmanship, integrity, and a relentless commitment to doing the job right. As a GAF Master Elite® Certified Contractor, we’re part of an elite group — only 2% of roofers in North America meet the rigorous standards it takes to earn this title. That means our customers benefit from enhanced warranty options, trained crews, and roofing systems backed by America’s leading manufacturer.",
        "label": "Text",
        "icon": "label-icon",
        "style": [
          "margin:0;"
        ],
        "textSize": 14,
        "rqdTxtColor": true,
        "lineHeight": 25,
        "height": "25px",
        "width": "150px",
        "textColor": "#555555",
        "bold": false,
        "italic": false,
        "underline": false,
        "id": "c168ebbf"
      },
      {
        "type": "line",
        "label": "Line Break",
        "icon": "line-break-icon",
        "edit": false,
        "disable": false,
        "resize": false,
        "id": "a94db5fd"
      },
      {
        "edit": true,
        "disable": false,
        "resize": true,
        "type": "label",
        "placeholder": "Please provide your signature below:",
        "label": "Text",
        "icon": "label-icon",
        "style": [
          "margin:0;"
        ],
        "textSize": 14,
        "rqdTxtColor": true,
        "lineHeight": 25,
        "height": "25px",
        "width": "150px",
        "textColor": "#555555",
        "bold": false,
        "italic": false,
        "underline": false,
        "id": "d8ba05d7"
      },
      {
        "type": "line",
        "label": "Line Break",
        "icon": "line-break-icon",
        "edit": false,
        "disable": false,
        "resize": false,
        "id": "249fccac"
      },
      {
        "edit": false,
        "disable": false,
        "resize": true,
        "type": "sign",
        "label": "Signature",
        "icon": "checkbox-icon",
        "width": "230px",
        "height": "80px",
        "minHeight": "80",
        "isJobrep": false,
        "id": "9b98a985"
      },
      {
        "type": "line",
        "label": "Line Break",
        "icon": "line-break-icon",
        "edit": false,
        "disable": false,
        "resize": false,
        "id": "033b9397"
      },
      {
        "edit": true,
        "disable": false,
        "resize": true,
        "type": "label",
        "placeholder": "Terms & Conditions",
        "label": "Text",
        "icon": "label-icon",
        "style": [
          "margin:0;"
        ],
        "textSize": 14,
        "rqdTxtColor": true,
        "lineHeight": 25,
        "height": "25px",
        "width": "150px",
        "textColor": "#555555",
        "bold": false,
        "italic": false,
        "underline": false,
        "id": "864e4d7d"
      },
      {
        "edit": true,
        "disable": false,
        "resize": true,
        "type": "label",
        "placeholder": "Scope of Work\nHudson Contracting will perform all labor, material installation, and services as detailed in the project proposal. This scope may include removal of the existing roof,  \npreparation of the roof deck, installation of new materials, and cleanup. Any work not explicitly outlined in the proposal is considered additional and may be subject to  \na separate quote or Change Order. Our team reserves the right to adjust the scope if field conditions require modifications to ensure proper installation and  \ncompliance with building codes.",
        "label": "Text",
        "icon": "label-icon",
        "style": [
          "margin:0;"
        ],
        "textSize": 14,
        "rqdTxtColor": true,
        "lineHeight": 25,
        "height": "25px",
        "width": "150px",
        "textColor": "#555555",
        "bold": false,
        "italic": false,
        "underline": false,
        "id": "655be9c6"
      },
      {
        "edit": false,
        "disable": false,
        "resize": true,
        "type": "space",
        "label": "Spacer",
        "icon": "spacer-icon",
        "height": "20px",
        "width": "40px",
        "minHeight": "20",
        "maxHeight": "20",
        "id": "63701e87"
      }
    ]
  }

/**
 * Converts object + HTML into x-www-form-urlencoded string
 * suitable for your API
 */
function buildFormData(html, pagesObj) {
    const params = new URLSearchParams();
  
    // Add top-level params
    params.append("type", "estimate");
    params.append("title", "My Proposal");
    params.append("trades", "");
    params.append("all_divisions_access", "1");
    params.append("for_all_trades", "1");
    params.append("content", "vale");
  
    // Encode HTML safely
    params.append("pages[0][content]", html);
    params.append("pages[0][editable_content]", JSON.stringify(pagesObj));
  
    // Convert dropzones object into nested keys
    function appendNested(obj, prefix = "") {
      if (typeof obj === "object" && obj !== null) {
        if (Array.isArray(obj)) {
          obj.forEach((val, i) => {
            appendNested(val, `${prefix}[${i}]`);
          });
        } else {
          Object.entries(obj).forEach(([k, v]) => {
            appendNested(v, `${prefix}[${k}]`);
          });
        }
      } else {
        // primitive value → append
        params.append(prefix, obj);
      }
    }
  
    appendNested(pagesObj, "pages[0][dropzones]");
  
    // Add page number (required in your curl)
    params.append("pages[0][page]", "1");
    // console.log(params.toString(),'=================');
    return params.toString(); // returns a valid form body
  }
  
  /**
   * Example usage with fetch
   */
  async function sendToApi(html, pagesObj) {
    const body = buildFormData(html, pagesObj);
  
    const response = await axios.post(
        "https://dev.jobprog.net/api/v1/templates",
        body,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
            "Authorization": "Bearer <token>"
          }
        }
      );
    
      return response.data;
  }

  
  
  // Example call
  const html = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Proposal Template</title>
            <style>
            
    body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        
        .template-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        
        .section {
            margin-bottom: 30px;
            padding: 20px 0;
        }
        
        .section:not(:last-child) {
            border-bottom: 1px solid #eee;
        }
        
        h1, h2, h3 {
            color: #333;
            margin-bottom: 15px;
        }
        
        h1 {
            text-align: center;
            font-size: 2.5em;
            margin-bottom: 30px;
        }
        
        input, textarea {
            margin-bottom: 15px;
            font-size: 14px;
        }
        
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #555;
        }
        
        .projects-container {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
        }
        
        .project-item {
            background: white;
            margin-bottom: 15px;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .signature {
            margin: 20px 0;
        }
        
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 15px 0;
            font-size: 14px;
        }
        
        table th {
            background-color: #f8f9fa;
            font-weight: bold;
            text-align: left;
            padding: 12px 8px;
            border: 1px solid #dee2e6;
        }
        
        table td {
            padding: 10px 8px;
            border: 1px solid #dee2e6;
            vertical-align: top;
        }
        
        table tr:nth-child(even) {
            background-color: #f8f9fa;
        }
        
        table tr:hover {
            background-color: #e9ecef;
        }
        
        table caption {
            font-weight: bold;
            margin-bottom: 10px;
            text-align: left;
            font-size: 16px;
        }

        @media print {
            body {
                background: white;
                padding: 0;
            }
            
            .template-container {
                box-shadow: none;
                max-width: none;
            }
            
            table tr:hover {
                background-color: transparent;
            }
        }

            </style>
        </head>
        <body>
            <div class="template-container">
        <div class="section header">
  <div style="display: flex; gap: 20px; display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 30px; padding: 20px; border-bottom: 2px solid #3498db; align-items: center"><div style="flex: 1;"><img src="https://s3-us-west-2.amazonaws.com/jp.company.resources/public/uploads/templates/media/1495799902_2088826355.jpg" alt="Company Logo" style="height: auto; width: 200px" /></div><div style="flex: 1;"><p style="font-family: Arial, sans-serif; margin: 20px 0; text-align: center; font-size: 28px; font-weight: bold; color: #2c3e50">Proposal</p></div><div style="flex: 1;"><p style="font-family: Arial, sans-serif; margin: 10px 0; text-align: right; font-size: 14px; line-height: 1.5; color: #34495e">719 S 50th St,<br>Tampa, FL 33619, USA<br>contact@americancsi.com</p></div></div>
<div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
  <div style="height: 40px; width: 100%; display: block;"></div>
<div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
</div>
<div class="section title---cover-page">
  <p style="font-family: Arial, sans-serif; margin: 10px 0">Building future</p>
<div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
  <div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
<div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
  <img src="cover_image.jpg" alt="Professional Cover Image" style="height: 50px; width: 50px" />
<div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
  <div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
<div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
  <p style="font-family: Arial, sans-serif; margin: 10px 0">Contact us for reliable and quality contracting services.</p>
<div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
  <div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
<div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
</div>
<div class="section intro---about-us">
  <p style="font-family: Arial, sans-serif; margin: 10px 0">About Hudson Contracting</p>
<div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
  <div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
<div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
  <p style="font-family: Arial, sans-serif; margin: 10px 0">At Hudson Contracting, roofing isn’t just our business — it’s our legacy. Proudly serving our community since 1990, we’ve built our reputation on craftsmanship, integrity, and a relentless commitment to doing the job right. As a GAF Master Elite® Certified Contractor, we’re part of an elite group — only 2% of roofers in North America meet the rigorous standards it takes to earn this title. That means our customers benefit from enhanced warranty options, trained crews, and roofing systems backed by America’s leading manufacturer.</p>
<div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
  <div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
<div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
</div>
<div class="section signature">
  <p style="font-family: Arial, sans-serif; margin: 10px 0">Please provide your signature below:</p>
<div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
  <div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
<div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
  <div class="sign" style="margin: 20px 0;">
                    <div class="jp-border jp-signature" style="width: 230px; height: 80px; border: 1px solid #ccc; position: relative; background-color: #fafafa;">
                        <img class="sign-temp" src="https://dev-app.jobprog.net/img/sign.png" alt="Signature placeholder" style="width: 100%; height: 60%; object-fit: contain; opacity: 0.3;" />
                        <div class="sign-date" style="position: absolute; bottom: 5px; left: 10px; font-size: 12px; color: #666;">Signature Date</div>
                    </div>
                </div>
            
<div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
  <div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
<div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
</div>
<div class="section terms-&-conditions">
  <p style="font-family: Arial, sans-serif; margin: 10px 0">Terms & Conditions</p>
<div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
  <p style="font-family: Arial, sans-serif; margin: 10px 0; white-space: pre-wrap; line-height: 1.6">Scope of Work
Hudson Contracting will perform all labor, material installation, and services as detailed in the project proposal. This scope may include removal of the existing roof,  
preparation of the roof deck, installation of new materials, and cleanup. Any work not explicitly outlined in the proposal is considered additional and may be subject to  
a separate quote or Change Order. Our team reserves the right to adjust the scope if field conditions require modifications to ensure proper installation and  
compliance with building codes.</p>
<div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
  <div style="height: medium; width: 100%; display: block;"></div>
<div class="line" dnd-dragend="onSelectElOptions(item)" ng-style="item.defaultStyle"><div class="new-line"></div></div>
</div>
</div>
        </body>
        </html>
  `
  
  sendToApi(html, data)
    .then(res => console.log("✅ Success:", res.status, res.data))
    .catch(err => {
        // console.error("❌ Error:", err)
        console.error(err.response.data.error);
    });
  
//   const encoded = toFormEncoded({ "pages": [{ dropzones: data }] });
//   console.log(encoded);