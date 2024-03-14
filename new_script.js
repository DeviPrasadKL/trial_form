// enabling variable inputs
function checkVariableVisibility() {
    var textareaValue = document.getElementById('templateBodyInput').value;
    var textSearch = '';
    var matchFound = false;

    for (var i = 1; i <= 10; i++) {
        textSearch = `\{\{${i}\}\}`;
        var bodyVariable = document.getElementById('ptemplateBodyvariable' + i + 'Input');

        // Check if the textarea contains "{{1}}"
        if (textareaValue.includes(textSearch)) {
            // Show the input field
            bodyVariable.hidden = false;
            matchFound = true; // Set flag to true if match is found
        } else {
            // Hide the input field if the condition is not met for this iteration
            bodyVariable.hidden = true;
        }
    }

    // If no match was found, hide all input fields
    if (!matchFound) {
        for (var j = 1; j <= 10; j++) {
            var inputField = document.getElementById('ptemplateBodyvariable' + j + 'Input');
            inputField.hidden = true;
        }
    }
}

function toggleInputField(inputfield) {

    if (inputfield === 'ptemplateCallButton') {
        var checkbox = document.getElementById(inputfield);
        var inputTagElement = document.getElementById('pdisplayCallButton');
        if (checkbox.checked) {
            inputTagElement.hidden = false;
        } else {
            inputTagElement.hidden = true;
        }
    }

    if (inputfield === 'phone') {
        var buttonInput = document.getElementById('ptemplateButtonCTACallPhoneInput');
        buttonInput.hidden = false;
        // buttonInput = document.getElementById('ptemplateButtonCTACallWAInput');
        // buttonInput.hidden = true;

    }
    if (inputfield === 'whatsapp') {
        var buttonInput = document.getElementById('ptemplateButtonCTACallPhoneInput');
        buttonInput.hidden = true;
        // buttonInput = document.getElementById('ptemplateButtonCTACallWAInput');
        // buttonInput.hidden = false;

    }
    if (inputfield === 'website1') {
        var checkbox = document.getElementById(inputfield);
        var CTAWebsitebuttonName = document.getElementById('ptemplateButtonCTAWebsite1TextInput');
        var CTAWebsitebuttonUrl = document.getElementById('ptemplateButtonCTAWebsite1URLInput');
        if (checkbox.checked) {
            CTAWebsitebuttonName.hidden = false;
            CTAWebsitebuttonUrl.hidden = false;
        } else {
            CTAWebsitebuttonName.hidden = true;
            CTAWebsitebuttonUrl.hidden = true;
        }
    }
    if (inputfield === 'website2') {
        var checkbox = document.getElementById(inputfield);
        var CTAWebsitebuttonName = document.getElementById('ptemplateButtonCTAWebsite2TextInput');
        var CTAWebsitebuttonUrl = document.getElementById('ptemplateButtonCTAWebsite2URLInput');
        if (checkbox.checked) {
            CTAWebsitebuttonName.hidden = false;
            CTAWebsitebuttonUrl.hidden = false;
        } else {
            CTAWebsitebuttonName.hidden = true;
            CTAWebsitebuttonUrl.hidden = true;
        }
    }
    if (inputfield === 'offercode') {
        var checkbox = document.getElementById(inputfield);
        var buttonInput = document.getElementById('ptemplateButtonCTAOfferCodeInput');
        if (checkbox.checked) {
            buttonInput.hidden = false;
        } else {
            buttonInput.hidden = true;
        }
    }
    if (inputfield === 'optout') {
        var checkbox = document.getElementById(inputfield);
        var buttonInput = document.getElementById('ptemplateButtonCTAOptOut');
        if (checkbox.checked) {
            buttonInput.hidden = false;
        } else {
            buttonInput.hidden = true;
        }
    }

    for (j = 1; j <= 6; j++) {
        if (inputfield === 'custombutton' + j) {
            var checkbox = document.getElementById(inputfield);
            var buttonInput = document.getElementById('ptemplateCustomButton' + j + 'Input');
            console.log(checkbox)
            if (checkbox.checked) {
                buttonInput.hidden = false;
            } else {
                buttonInput.hidden = true;
            }
            break;
        }
    }
}

//-----------------------------------------------------------------------------------------------------------//
function gatherFormData() {
    var formData = {
        templateName: getValueOrNull('templateNameInput'),
        templateStatus: getValueOrNull('templateStatusInput'),
        templateCategory: getValueOrNull('templateCategoryInput'),
        templateCategoryType: getValueOrNull('templateCategoryTypeInput'),
        templateLanguages: getValueOrNull('templateLanguagesInput'),
        templateBody: getValueOrNull('templateBodyInput'),
        templateBodyVariables: [],
        templateHeaderType: getValueOrNull('TemplateHeaderTypeInput'),
        templateHeaderContent: getValueOrNull('TemplateHeaderContentInput'),
        templateHeaderContentUrlText: getValueOrNull('TemplateHeaderContentUrlTextInput'),
        templateHeaderVariable1: getValueOrNull('TemplateHeaderVariable1Input'),
        templateHeaderVariable2: getValueOrNull('TemplateHeaderVariable2Input'),
        templateHeaderVariable3: getValueOrNull('TemplateHeaderVariable3Input'),
        templateBodyVariable1: getValueOrNull('TemplateBodyVariable1Input'),
        templateBodyVariable2: getValueOrNull('TemplateBodyVariable2Input'),
        templateBodyVariable3: getValueOrNull('TemplateBodyVariable3Input'),
        templateBodyVariable4: getValueOrNull('TemplateBodyVariable4Input'),
        templateBodyVariable5: getValueOrNull('TemplateBodyVariable5Input'),
        templateBodyVariable6: getValueOrNull('TemplateBodyVariable6Input'),
        templateBodyVariable7: getValueOrNull('TemplateBodyVariable7Input'),
        templateBodyVariable8: getValueOrNull('TemplateBodyVariable8Input'),
        templateBodyVariable9: getValueOrNull('TemplateBodyVariable9Input'),
        templateBodyVariable10: getValueOrNull('TemplateBodyVariable10Input'),
        templateFooterText: getValueOrNull('TemplateFooterTextInput'),
        templateFooterTextVariable1: getValueOrNull('TemplateFooterTextVariable1Input'),
        templateFooterTextVariable2: getValueOrNull('TemplateFooterTextVariable2Input'),
        templateFooterTextVariable3: getValueOrNull('TemplateFooterTextVariable3Input'),
        templateCustomButton1: getValueOrNull('TemplateCustomButton1Input'),
        templateCustomButton2: getValueOrNull('TemplateCustomButton2Input'),
        templateCustomButton3: getValueOrNull('TemplateCustomButton3Input'),
        templateCustomButton4: getValueOrNull('TemplateCustomButton4Input'),
        templateCustomButton5: getValueOrNull('TemplateCustomButton5Input'),
        templateCustomButton6: getValueOrNull('TemplateCustomButton6Input'),
        templateButtonCTACallPhone: getValueOrNull('TemplateButtonCTACallPhoneInput'),
        templateButtonCTACallWA: getValueOrNull('TemplateButtonCTACallWAInput'),
        templateButtonCTAWebsite1Text: getValueOrNull('TemplateButtonCTAWebsite1TextInput'),
        templateButtonCTAWebsite1URL: getValueOrNull('TemplateButtonCTAWebsite1URLInput'),
        templateButtonCTAWebsite2Text: getValueOrNull('TemplateButtonCTAWebsite2TextInput'),
        templateButtonCTAWebsite2URL: getValueOrNull('TemplateButtonCTAWebsite2URLInput'),
        templateButtonCTAOfferCode: getValueOrNull('TemplateButtonCTAOfferCodeInput'),
        templateButtonCTAForm: getValueOrNull('TemplateButtonCTAFormInput')
    };

    for (var i = 1; i <= 10; i++) {
        var bodyVariableInput = document.getElementById('templateBodyvariable' + i + 'Input');
        if (bodyVariableInput && !bodyVariableInput.hidden) {
            formData.templateBodyVariables.push(bodyVariableInput.value);
        }
    }

    return formData;
}

function getValueOrNull(elementId) {
    var element = document.getElementById(elementId);
    return element ? (element.value !== null ? element.value : null) : null;
}

function populateTemplate(formData) {
    var formContainer = document.getElementById('formContainer');
    formContainer.innerHTML = '';

    for (var key in formData) {
        if (formData.hasOwnProperty(key)) {
            var value = formData[key];
            if (value !== null && value !== "" && key !== 'templateBody' && key !== 'templateBodyVariables') {
                var element = document.createElement('p');
                element.textContent = key + ": " + value;
                formContainer.appendChild(element);
            }
        }
    }

    var templateBody = formData.templateBody;
    var templateBodyVariables = formData.templateBodyVariables;
    if (templateBody && templateBodyVariables) {
        var replacedBody = replaceVariables(templateBody, templateBodyVariables);
        var templateBodyElement = document.createElement('p');
        templateBodyElement.textContent = "Template Body: " + replacedBody;
        formContainer.appendChild(templateBodyElement);
    }
}

function replaceVariables(templateBody, templateBodyVariables) {
    for (var i = 1; i <= 10; i++) {
        var variable = '{{' + i + '}}';
        var value = templateBodyVariables[i - 1] || '';
        templateBody = templateBody.replace(new RegExp(variable, 'g'), value);
    }
    return templateBody;
}


function replaceVariables(templateBody, templateBodyVariables) {
    var words = templateBody.split(' ');

    for (var i = 0; i < words.length; i++) {
        if (words[i].includes('{{')) {
            var index = parseInt(words[i].match(/\d+/)[0]) - 1;
            if (templateBodyVariables[index]) {
                words[i] = templateBodyVariables[index];
            }
        }
    }
    return words.join(' ');
}

function sendForm() {
    var formData = gatherFormData();
    populateTemplate(formData);
}