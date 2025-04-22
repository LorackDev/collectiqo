document.addEventListener('DOMContentLoaded', function () {
    loadPresets();
    setupMultiFieldManagement();
    handlePresetChange();
});

/**
 * Loads user-defined templates into the preset selection dropdown.
 *
 * This function fetches a list of template names from the server and populates them into an HTML select element.
 * Each template name is added as an option in the dropdown, allowing users to select a preset.
 *
 * @return {void}
 */
function loadPresets() {
    fetch('/get-user-templates')
        .then(response => response.json())
        .then(templateNames => {
            const $presetSelect = document.getElementById('preset');
            $presetSelect.innerHTML = '<option value="x" disabled selected>Select preset...</option>';
            templateNames.forEach(name => {
                console.log('Name:', name);
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                $presetSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching presets:', error));
}

/**
 * Sets up multi-field management functionality for all elements with the class "multi-field-wrapper".
 * This includes adding event listeners to buttons for adding and removing fields dynamically.
 *
 * @return {void}
 */
function setupMultiFieldManagement() {
    document.querySelectorAll('.multi-field-wrapper').forEach(wrapper => {
        const $wrapper = wrapper.querySelector('.multi-fields');
        wrapper.querySelector('.add-field').addEventListener('click', function () {
            const firstField = $wrapper.querySelector('.multi-field:first-child');
            if (firstField) {
                const newField = firstField.cloneNode(true);
                newField.querySelectorAll('input').forEach(input => input.value = '');
                $wrapper.appendChild(newField);
                newField.querySelector('input').focus();
            }
        });

        $wrapper.addEventListener('click', function (event) {
            const target = event.target;
            if (target.classList.contains('remove-field')) {
                const fields = $wrapper.querySelectorAll('.multi-field');
                if (fields.length > 1) {
                    target.parentElement.remove();
                }
            }
        });
    });
}

/**
 * Adds an event listener to the 'preset' element that triggers when its value changes.
 * If the 'customCollection' checkbox is not checked, fetches template data based on the selected preset.
 * On successful data retrieval, logs the template data, clears existing fields,
 * and populates them with new data from the fetched template. Also sets the color picker value.
 * Logs errors if fetching fails or if there are issues in the response.
 */
function handlePresetChange() {
    document.getElementById('preset').addEventListener('change', async function () {
        if (!document.getElementById('customCollection').checked) {
            const selectedPreset = this.value;
            try {
                const response = await fetch(`/get-preset-data?templateName=${selectedPreset}`);
                if (response.ok) {
                    const templateData = await response.json();
                    console.log(`Template Data:`, templateData);
                    clearExistingFields();
                    populateFieldsFromTemplate(templateData);
                    setColorPickerValue(templateData.color); // Set the color picker value
                    if (templateData.image && templateData.imageType) {
                        const imageBlob = new Blob([new Uint8Array(templateData.image.data)], { type: templateData.imageType });
                        const imageUrl = URL.createObjectURL(imageBlob);
                        const fileInput = document.getElementById('imageUpload');

                        // Create a new File object and use DataTransfer to simulate file input
                        const fileName = `${selectedPreset}_image.${templateData.imageType.split('/')[1]}`;
                        const file = new File([imageBlob], fileName, { type: templateData.imageType });

                        const dataTransfer = new DataTransfer();
                        dataTransfer.items.add(file);
                        fileInput.files = dataTransfer.files;
                    }
                } else {
                    console.error('Failed to fetch preset data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching preset data:', error);
            }
        }
    });
}

/**
 * Clears all existing fields within the element with the class 'multi-fields'.
 *
 * @return {void} This function does not return any value.
 */
function clearExistingFields() {
    document.querySelector('.multi-fields').innerHTML = '';
}

/**
 * Populates form fields based on the provided template data.
 *
 * @param {Object} templateData - An object containing an array of columns to be used for field population.
 * @return {void} - This function does not return any value; it modifies the DOM directly.
 */
function populateFieldsFromTemplate(templateData) {
    const columns = Array.isArray(templateData.columns)
        ? templateData.columns
        : JSON.parse(templateData.columns || '[]');

    columns.forEach((column, index) => {
        const newField = document.createElement('div');
        newField.className = 'multi-field';
        newField.innerHTML = `
            <input type="text" name="customField[]" class="textbox" placeholder="Field ${index + 1}" value="${column}">
            <button type="button" class="remove-field">-</button>
        `;
        document.querySelector('.multi-fields').appendChild(newField);
    });
}

/**
 * Sets the color picker value based on the provided color.
 *
 * @param {string} color - The color value to be set in the color input field.
 * @return {void}
 */
function setColorPickerValue(color) {
    const $colorInput = document.getElementById('color');
    if ($colorInput) {
        $colorInput.value = color;
    }
}