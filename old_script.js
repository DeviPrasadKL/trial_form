// Perform an AJAX request to check the session
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 302) {
        const response = JSON.parse(xhr.responseText);

        // Check if redirection is needed
        if (response.redirect) {
            window.location.replace("signin.html");
        }
    }
};
xhr.open('GET', 'php/check_session.php', true);
xhr.send();

// Render localStorage JS:
if (localStorage.theme) document.documentElement.setAttribute("data-theme", localStorage.theme);
if (localStorage.layout) document.documentElement.setAttribute("data-nav", localStorage.navbar);
if (localStorage.layout) document.documentElement.setAttribute("dir", localStorage.layout);

const textInput = document.getElementById('templateNameSearch');
textInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchTemplate();
    }
});

// Call the function on page load
window.onload = function () {
    // checkTemplateName();
    hideAddTemplate(true);
    hideTemplateForm(true);
};

function hideAddTemplate(action) {
    var showTemplateForm = document.getElementById('ShowTemplate');
    var children = showTemplateForm.children;

    // Loop through all children of the 'ShowTemplate' div
    for (var i = 0; i < children.length; i++) {
        // Hide each child element
        children[i].hidden = action;
    }
}

function hideTemplateForm(action) {
    var showTemplateForm = document.getElementById('ShowFormCreateMessage');
    var children = showTemplateForm.children;

    // Loop through all children of the 'ShowTemplate' div
    for (var i = 0; i < children.length; i++) {
        // Hide each child element
        children[i].hidden = action;
    }
    var j = 0;
    for (j = 1; j <= 3; j++) {
        var inputIdName = 'ptemplateHeaderVariable' + j + 'Input';
        var inputId = document.getElementById(inputIdName);
        if (inputId) {
            inputId.hidden = true;
        }
    }
    for (j = 1; j <= 10; j++) {
        var inputIdName = 'ptemplateBodyvariable' + j + 'Input';
        var inputId = document.getElementById(inputIdName);
        if (inputId) {
            inputId.hidden = true;
        }
    }
    for (j = 1; j <= 3; j++) {
        var inputIdName = 'ptemplateFooterTextVariable' + j + 'Input';
        var inputId = document.getElementById(inputIdName);
        if (inputId) {
            inputId.hidden = true;
        }
    }
    for (j = 1; j <= 6; j++) {
        var inputIdName = 'ptemplateCustomButton' + j + 'Input';
        var inputId = document.getElementById(inputIdName);
        if (inputId) {
            inputId.hidden = true;
        }
    }
    for (j = 1; j <= 6; j++) {
        var inputIdName = 'ptemplateCustomButton' + j + 'Input';
        var inputId = document.getElementById(inputIdName);
        if (inputId) {
            inputId.hidden = true;
        }
    }
    var inputTagElement = document.getElementById('ptemplateHeaderContentTextInput');
    inputTagElement.hidden = true;
    inputTagElement = document.getElementById('ptemplateHeaderContentUrlInput');
    inputTagElement.hidden = true;
    inputTagElement = document.getElementById('ptemplateButtonCTACallPhoneInput');
    inputTagElement.hidden = false;
    // inputTagElement = document.getElementById('ptemplateButtonCTACallWAInput');
    // inputTagElement.hidden = true;
    inputTagElement = document.getElementById('ptemplateButtonCTAWebsite1TextInput');
    inputTagElement.hidden = true;
    inputTagElement = document.getElementById('ptemplateButtonCTAWebsite1URLInput');
    inputTagElement.hidden = true;
    inputTagElement = document.getElementById('ptemplateButtonCTAWebsite2TextInput');
    inputTagElement.hidden = true;
    inputTagElement = document.getElementById('ptemplateButtonCTAWebsite2URLInput');
    inputTagElement.hidden = true;
    inputTagElement = document.getElementById('ptemplateButtonCTAOfferCodeInput');
    inputTagElement.hidden = true;
    inputTagElement = document.getElementById('ptemplateButtonCTAOptOut');
    inputTagElement.hidden = true;
    inputTagElement = document.getElementById('pdisplayCallButton');
    inputTagElement.hidden = true;

}

function SendMessage() {
    console.log("SendMessage function called");
    console.log(document.getElementById("templateName").innerText);
}

function AddTemplate() {
    hideTemplateForm(false);
    hideAddTemplate(true);
}

function clearSearch() {
    console.log("Called Search");
    var searchid = document.getElementById('templateNameSearch');
    searchid.value = '';
    hideTemplateForm(true);
    hideAddTemplate(true);
}

// parsing entry in text area for Body
document.getElementById('templateBodyInput').addEventListener('input', function (event) {
    var textareaValue = event.target.value;
    var matches = textareaValue.match(/{{(\d+)}}/g);
    var lastVariable = null;

    if (matches !== null) {
        // Extract variable numbers from matches
        var variableNumbers = matches.map(match => parseInt(match.match(/\d+/)[0]));
        // Find the maximum variable number
        lastVariable = Math.max(...variableNumbers);
    }

    if (textareaValue.endsWith('\{\{')) {
        // If the textarea ends with '{{', add the next variable number
        var nextVariable = lastVariable !== null ? lastVariable + 1 : 1;
        event.target.value += nextVariable + '\}\}';
    }
});


function populateHeaderTypeOptions() {
    var headerTypeOptions = document.getElementById('templateHederTypeInput').value;
    var headerContentInput = '';
    if (headerTypeOptions === 'Text') {
        headerContentInput = document.getElementById('ptemplateHeaderContentTextInput');
        headerContentInput.hidden = false;
        headerContentInput = document.getElementById('ptemplateHeaderContentUrlInput');
        headerContentInput.hidden = true;
    }
    if (headerTypeOptions === 'Media') {
        headerContentInput = document.getElementById('ptemplateHeaderContentUrlInput');
        headerContentInput.hidden = false;
        headerContentInput = document.getElementById('ptemplateHeaderContentTextInput');
        headerContentInput.hidden = true;
    }
    if (headerTypeOptions === 'None') {
        headerContentInput = document.getElementById('ptemplateHeaderContentTextInput');
        headerContentInput.hidden = true;
        headerContentInput = document.getElementById('ptemplateHeaderContentUrlInput');
        headerContentInput.hidden = true;
    }
}

function searchTemplate() {
    var templateName = document.getElementById("templateNameSearch").value;
    // Implement AJAX request to search for the template
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.status === "found") {
                // Template found, update HTML elements with record details
                updateDetails(response.record);
                hideTemplateForm(true);
                hideAddTemplate(false);
            } else {
                console.log("Template not found");
                // Display a message indicating template not found
            }
        }
    };
    xhttp.open("GET", "php/search_template.php?templateName=" + templateName, true);
    xhttp.send();
}

// Function to generate and populate the form based on the record structure
function generateAndPopulateForm(record) {
    // Get the container element for the form
    var formContainer = document.getElementById("formContainer");
    // Clear any existing content in the container
    formContainer.innerHTML = "";

    // Iterate over the record structure to generate HTML elements for each field
    for (var key in record) {
        if (record.hasOwnProperty(key)) {
            var value = record[key];
            if (value !== null && value !== "") {
                // Create a label element for the field
                var label = document.createElement("label");
                label.textContent = key + ": ";

                // Create an input element for the field value
                var input = document.createElement("input");
                input.type = "text";
                input.value = value;
                // Disable the input element to avoid editing
                input.disabled = true;

                // Create a div element to contain the label and input
                var fieldContainer = document.createElement("div");
                fieldContainer.appendChild(label);
                fieldContainer.appendChild(input);

                // Append the field container to the form container
                formContainer.appendChild(fieldContainer);
            }
        }
    }
}

// Function to update HTML elements with record details
function updateDetails(record) {
    // Update the HTML elements with the details from the record
    document.getElementById("templateName").textContent = record.company_social_template_name;
    document.getElementById("templateCategory").textContent = record.company_social_template_category;
    document.getElementById("templateCategoryType").textContent = record.company_social_template_category_type;
    document.getElementById("templateLanguages").textContent = record.company_social_template_languages
    document.getElementById("templateHederType").textContent = record.company_social_template_header_type
    document.getElementById("templateHeaderContent").textContent = record.company_social_template_header_content
    document.getElementById("templateHeaderContentUrlText").textContent = record.company_social_template_header_content_url_text
    document.getElementById("templateHeaderVariable1").textContent = record.company_social_template_header_content_variable_1
    document.getElementById("templateHeaderVariable2").textContent = record.company_social_template_header_content_variable_2
    document.getElementById("templateHeaderVariable3").textContent = record.company_social_template_header_content_variable_3
    document.getElementById("templateBody").textContent = record.company_social_template_body
    document.getElementById("templateBodyvariable1").textContent = record.company_social_template_body_variable_1
    document.getElementById("templateBodyvariable2").textContent = record.company_social_template_body_variable_2
    document.getElementById("templateBodyvariable3").textContent = record.company_social_template_body_variable_3
    document.getElementById("templateBodyvariable4").textContent = record.company_social_template_body_variable_4
    document.getElementById("templateBodyvariable5").textContent = record.company_social_template_body_variable_5
    document.getElementById("templateBodyvariable6").textContent = record.company_social_template_body_variable_6
    document.getElementById("templateBodyvariable7").textContent = record.company_social_template_body_variable_7
    document.getElementById("templateBodyvariable8").textContent = record.company_social_template_body_variable_8
    document.getElementById("templateBodyvariable9").textContent = record.company_social_template_body_variable_9
    document.getElementById("templateBodyvariable10").textContent = record.company_social_template_body_variable_10
    document.getElementById("templateFooterText").textContent = record.company_social_template_footer_text
    document.getElementById("templateFooterTextVariable1").textContent = record.company_social_template_footer_text_variable_1
    document.getElementById("templateFooterTextVariable2").textContent = record.company_social_template_footer_text_variable_2
    document.getElementById("templateFooterTextVariable3").textContent = record.company_social_template_footer_text_variable_3
    document.getElementById("templateCustomButton1").textContent = record.company_social_template_button_custom_1
    document.getElementById("templateCustomButton2").textContent = record.company_social_template_button_custom_2
    document.getElementById("templateCustomButton3").textContent = record.company_social_template_button_custom_3
    document.getElementById("templateCustomButton4").textContent = record.company_social_template_button_custom_4
    document.getElementById("templateCustomButton5").textContent = record.company_social_template_button_custom_5
    document.getElementById("templateCustomButton6").textContent = record.company_social_template_button_custom_6
    document.getElementById("templateButtonCTACallPhone").textContent = record.company_social_template_button_cta_call_phone
    document.getElementById("templateButtonCTACallWA").textContent = record.company_social_template_button_cta_call_whatsapp
    document.getElementById("templateButtonCTAWebsite1Text").textContent = record.company_social_template_button_cta_website_1_text
    document.getElementById("templateButtonCTAWebsite1URL").textContent = record.company_social_template_button_cta_website_1_url
    document.getElementById("templateButtonCTAWebsite2Text").textContent = record.company_social_template_button_cta_website_2_text
    document.getElementById("templateButtonCTAWebsite2URL").textContent = record.company_social_template_button_cta_website_2_url
    document.getElementById("templateButtonCTAOfferCode").textContent = record.company_social_template_button_cta_offer_code
    document.getElementById("templateButtonCTAForm").textContent = record.company_social_template_button_cta_form
    document.getElementById("templateStatus").textContent = record.company_social_template_status
    // Update other HTML elements with corresponding record details
}

function callAPI(templateName) {
    // Implement code to call the API here
    console.log("Calling API for template: " + templateName);
    // You can use fetch or another XMLHttpRequest to call the API
}

// populateHeaderTypeOptions

function populateCategoryTypeOptions() {
    var categoryInput = document.getElementById("templateCategoryInput");
    var categoryTypeInput = document.getElementById("templateCategoryTypeInput");
    categoryTypeInput.innerHTML = ""; // Clear previous options

    if (categoryInput.value === "MARKETING") {
        // Populate options for Marketing category
        var options = ["Custom", "Form", "Product Message"];
        populateOptions(categoryTypeInput, options);
    } else if (categoryInput.value === "UTILITY") {
        // Populate options for Utility category
        var options = ["Custom", "Order Details", "Order Status"];
        populateOptions(categoryTypeInput, options);
    }
}

function populateOptions(selectElement, options) {
    options.forEach(function (option) {
        var optionElement = document.createElement("option");
        optionElement.text = option;
        optionElement.value = option;
        selectElement.appendChild(optionElement);
    });
}

// Call populateCategoryTypeOptions initially to populate the options based on the default value
populateCategoryTypeOptions();

window.addEventListener('DOMContentLoaded', function () {
    // Get the .geex-content__wrapper element
    var wrapperElement = document.querySelector('.geex-content__section');

    // Get the width of the .geex-content__wrapper element
    var wrapperWidth = wrapperElement.offsetWidth;

    // Log the width to the console
    console.log("Width of .geex-content__wrapper:", wrapperWidth, "pixels");
});

// function sendForm() {
//     var mainDiv = document.getElementById('ShowFormCreateMessage');
//     var elements = mainDiv.querySelectorAll('input, select, textarea');
//     var values = {};

//     elements.forEach(function (element) {
//         if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'select' || element.tagName.toLowerCase() === 'textarea') {
//             if (element.type === 'checkbox') {
//                 if (element.checked) {
//                     values[element.id] = 'on';
//                 }
//             } else {
//                 var value = element.value.trim();
//                 if (value) {
//                     values[element.id] = value;
//                 }
//             }
//         }
//     });

//     var originalPayload = JSON.stringify(values, null, 2);
//     console.log(originalPayload);
//     var transformedValues = transformValues(values);
//     var transformedPayload = JSON.stringify(transformedValues, null, 2)
//     console.log(transformedPayload);

//     logSessionVariables(function (sessionVariables) {
//         // console.log('Session variables:', sessionVariables);
//         sendPayloadforApproval(transformedPayload, sessionVariables.uuid);
//     });

//     //--------------------------------------------------------------------------//
//     var formContainer = document.getElementById('formContainer');
//     formContainer.innerHTML = ''; // Clear previous content

//     var templateName = document.getElementById('templateNameInput').value;
//     var templateBody = document.getElementById('templateBodyInput').value;

//     // Create a preview element
//     var previewElement = document.createElement('div');
//     previewElement.classList.add('preview');

//     // Display template name
//     var nameParagraph = document.createElement('p');
//     nameParagraph.textContent = 'Template Name: ' + templateName;
//     previewElement.appendChild(nameParagraph);

//     // Display template body with replaced variables
//     var bodyParagraph = document.createElement('p');
//     bodyParagraph.textContent = 'Template Body: ' + templateBody;
//     previewElement.appendChild(bodyParagraph);

//     // Display custom buttons
//     for (var i = 1; i <= 6; i++) {
//         var customButtonCheckbox = document.getElementById('custombutton' + i);
//         if (customButtonCheckbox.checked) {
//             var customButtonInput = document.getElementById('templateCustomButton' + i + 'Input').value;
//             var customButtonParagraph = document.createElement('p');
//             customButtonParagraph.textContent = 'Custom Button ' + i + ': ' + customButtonInput;
//             previewElement.appendChild(customButtonParagraph);
//         }
//     }

//     // Append preview element to the form container
//     formContainer.appendChild(previewElement);
// }

function sendPayloadforApproval(payload, uuid) {
    const apiUrl = 'https://api.versal.one/';
    // Construct the URL for the API endpoint
    const endpointUrl = apiUrl + uuid + '/getapprovalwatemplate';
    console.log('endpoint', endpointUrl)
    // Make a POST request to the API endpoint
    fetch(endpointUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the response from the API if needed
            console.log('API response:', data);
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Error sending data to API:', error);
        });
}

// // Call the function inside sendForm() after fetching session variables
// logSessionVariables(function(sessionVariables) {
//     console.log('Session variables:', sessionVariables);
//     sendPayloadforApproval(transformedValues, sessionVariables.uuid);
// });


// function sendPayloadforApproval(payload, uuid) {
//     // Construct the URL for the API endpoint
//     var endpointUrl = 'https://api.versal.one/' + uuid + '/getapprovalwatemplate';

//     // Make a POST request to the endpoint
//     fetch(endpointUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//     })
//     .then(function(response) {
//         if (!response.ok) {
//             throw new Error('Failed to send payload to endpoint: ' + response.statusText);
//         }
//         return response.json();
//     })
//     .then(function(data) {
//         console.log('Payload sent successfully:', data);
//     })
//     .catch(function(error) {
//         console.error('Error sending payload to endpoint:', error);
//     });
// }



function transformValues(originalValues) {
    // console.log(originalValues);
    var transformedValues = {
        "name": originalValues.templateNameInput,
        "language": originalValues.templateLanguagesInput,
        "category": originalValues.templateCategoryInput,
        "components": [
            {
                "type": "HEADER",
                "format": originalValues.templateHederTypeInput === 'Text' ? "TEXT" : "MEDIA",
                "text": originalValues.templateHederTypeInput === 'Text' ? originalValues.templateHeaderContentTextInput : originalValues.templateHeaderContentUrlInput
            },
            {
                "type": "BODY",
                "text": originalValues.templateBodyInput,
                "example": {
                    "body_text": populateBodyText(originalValues.templateBodyInput)
                }
            },
            {
                "type": "FOOTER",
                "text": originalValues.templateFooterTextInput
            },
            {
                "type": "BUTTONS",
                "buttons": []
            }
        ]
    };

    // Find the checked radio button value
    var callTypeRadios = document.getElementsByName('callType');
    var callButtonType;
    for (var i = 0; i < callTypeRadios.length; i++) {
        if (callTypeRadios[i].checked) {
            callButtonType = callTypeRadios[i].value;
            break;
        }
    }


    var buttons = [];

    // Iterate over custom buttons
    for (var i = 1; i <= 6; i++) {
        var customButtonId = 'custombutton' + i;
        if (originalValues[customButtonId] === 'on') {
            var customButtonInputId = 'templateCustomButton' + i + 'Input';
            buttons.push({
                "type": "QUICK_REPLY",
                "text": originalValues[customButtonInputId] || ''
            });
        }
    }

    // Param components must be one of {QUICK_REPLY, URL, PHONE_NUMBER, OTP, MPM, CATALOG, VOICE_CALL}
    // Check if optout is checked
    if (originalValues.optout === 'on') {
        buttons.push({
            "type": "QUICK_REPLY",
            "text": originalValues.templateButtonCTAOptOut || ''
        });
    }

    if (callButtonType === 'WhatsApp') {
        buttons.push({
            "type": "VOICE_CALL",
            "text": "WhatsApp",
        });
    }
    if (callButtonType === 'PHONE_NUMBER') {
        buttons.push({
            "type": "PHONE_NUMBER",
            "text": "Call",
            "phone_number": originalValues.templateButtonCTACallPhoneInput
        });
    }
    if (callButtonType === 'website1') {
        buttons.push({
            "type": "URL",
            "text": originalValues.templateButtonCTAWebsite1TextInput,
            "url": originalValues.templateButtonCTAWebsite1URLInput
        });
    }
    if (callButtonType === 'website2') {
        buttons.push({
            "type": "URL",
            "text": originalValues.templateButtonCTAWebsite2TextInput,
            "url": originalValues.templateButtonCTAWebsite2URLInput
        });
    }
    if (callButtonType === 'offercode') {
        buttons.push({
            "type": "COPY_CODE",
            "example": originalValues.templateButtonCTAOfferCodeInput,
        });
    }

    // Add buttons array to the transformedValues
    transformedValues.components[3].buttons = buttons;

    return transformedValues;
}

function populateBodyText(templateBodyInput) {
    var bodyText = [[]];
    var variables = templateBodyInput.match(/{{\d+}}/g);
    if (variables) {
        for (var i = 1; i <= variables.length; i++) {
            var variableInputId = 'templateBodyvariable' + i + 'Input';
            var variableInput = document.getElementById(variableInputId);
            if (variableInput) {
                bodyText[0].push(variableInput.value || '');
            }
        }
    }
    return bodyText;
}

function logSessionVariables(callback) {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Define the URL of the PHP script that echoes session variables
    var url = 'php/getuuid.php';

    // Set up the request
    xhr.open('GET', url, true);

    // Define what happens on successful response
    xhr.onload = function () {
        if (xhr.status == 200) {
            // Parse the JSON response
            var sessionVariables = JSON.parse(xhr.responseText);

            // Call the callback function with session variables
            callback(sessionVariables);
        } else {
            console.error('Failed to fetch session variables:', xhr.status);
        }
    };

    // Define what happens in case of error
    xhr.onerror = function () {
        console.error('Error fetching session variables');
    };

    // Send the request
    xhr.send();
}

// // Example usage:
// logSessionVariables(function(sessionVariables) {
//     console.log('Session variables:', sessionVariables);
// });

