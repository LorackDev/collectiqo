//var modal = document.getElementById("myModal");
//
//function resetModal() {
//    var presetSelect = document.getElementById("preset");
//    var colorInput = document.getElementById("color");
//    var collectionInput = document.getElementById("collection");
//    var customOptions = document.querySelector(".custom-options");
//    var customInputGroups = customOptions.querySelectorAll(".input-group");
//    presetSelect.value = "x";
//    colorInput.value = "#000000";
//    collectionInput.value = "";
//
//    // Hide additional custom fields, starting from the second one
//    for (var i = 1; i < customInputGroups.length; i++) {
//        customInputGroups[i].style.display = "none";
//    }
//
//    // Reset the value of additional custom fields (starting from the second one)
//    for (var j = 1; j < customInputGroups.length; j++) {
//        var input = customInputGroups[j].querySelector("input");
//        input.value = "";
//        input.id = "custom" + (j);
//        input.name = "custom" + (j);
//    }
//
//    customOptions.classList.remove("show-custom-options");
//}
//
//function closeModal() {
//    modal.style.display = "none";
//}
//document.addEventListener('DOMContentLoaded', function() {
//    document.getElementById("cancelBtn").addEventListener("click", function () {
//        resetModal();
//        closeModal();
//    });
//});
//
//window.addEventListener("click", function (event) {
//    if (event.target === modal) {
//        resetModal();
//        modal.style.display = "none";
//    }
//});
//
//document.getElementById("preset").addEventListener("change", function () {
//    var customOptions = document.getElementsByClassName("custom-options")[0];
//    if (this.value === "custom") {
//        customOptions.classList.add("show-custom-options");
//        if (customOptions.querySelectorAll(".input-group").length === 0) {
//            document.getElementById("addCustomField").click();
//        }
//    } else {
//        customOptions.classList.remove("show-custom-options");
//    }
//});
//
//document.getElementById("addCustomField").addEventListener("click", function () {
//    var customOptions = document.getElementsByClassName("custom-options")[0];
//    var customInputGroups = customOptions.getElementsByClassName("input-group");
//    var inputCount = customInputGroups.length;
//
//    var newInputGroup = document.createElement("div");
//    newInputGroup.className = "input-group";
//
//    var label = document.createElement("label");
//    label.setAttribute("for", "custom" + (inputCount + 1));
//    label.textContent = "Row " + (inputCount + 1) + ": ";
//
//    var input = document.createElement("input");
//    input.type = "text";
//    input.id = "custom" + (inputCount + 1);
//    input.name = "custom" + (inputCount + 1);
//
//    var removeBtn = document.createElement("span");
//    removeBtn.className = "remove-btn";
//    removeBtn.textContent = "🗑️";
//    removeBtn.onclick = function () {
//        this.parentNode.remove();
//    };
//
//    newInputGroup.appendChild(label);
//    newInputGroup.appendChild(input);
//    newInputGroup.appendChild(removeBtn);
//
//    customOptions.appendChild(newInputGroup);
//
//    if (inputCount >= 9) {
//        document.getElementById("addCustomField").style.display = "none";
//    }
//});
//
//document.getElementById('selectionForm').addEventListener('submit', async function (event) {
//    event.preventDefault();
//
//    const formData = {
//        templateName: document.getElementById('preset').value,
//        color: document.getElementById('color').value,
//        collectionName: document.getElementById('collection').value,
//        customFields: []
//    };
//
//    var customOptions = document.getElementsByClassName("custom-options")[0];
//    var customInputs = customOptions.getElementsByClassName("input-group");
//
//    for (let i = 0; i < customInputs.length; i++) {
//        const input = customInputs[i].querySelector('input');
//        formData.customFields.push({
//            name: input.name
//        });
//    }
//
//    console.log(formData);
//
//    const collectionName = document.getElementById('collection').value;
//    const templateName = document.getElementById('preset').value;
//    try {
//        const response = await fetch('/create-new-collection-from-template', {
//            method: 'POST',
//            headers: { 'Content-Type': 'application/json' },
//            body: JSON.stringify({
//                collectionName: collectionName,
//                templateName: templateName
//            })
//        });
//
//        if (response.ok) {
//            alert('Collection saved successfully');
//            window.location.reload();
//        } else {
//            const errorData = await response.json();
//            alert('Failed to save collection: ' + errorData.message);
//        }
//    } catch (error) {
//        console.error('Error:', error);
//        alert('Failed to save collection');
//    }
//});

document.addEventListener('DOMContentLoaded', function() {
    const customCollectionCheckbox = document.getElementById('customCollection');
    const presetGroup = document.getElementById('presetGroup');
    const customOptions = document.getElementById('customOptions');
    const addCustomFieldButton = document.getElementById('addCustomField');
    let customFieldCount = 0;

    customCollectionCheckbox.addEventListener('change', function() {
        if (customCollectionCheckbox.checked) {
            presetGroup.style.display = 'none';
            customOptions.style.display = 'block';
            customOptions.innerHTML = ''; // Clear previous fields
        } else {
            presetGroup.style.display = 'block';
            customOptions.style.display = 'none';
            customOptions.innerHTML = ''; // Clear custom fields
        }
    });

    addCustomFieldButton.addEventListener('click', function() {
        customFieldCount++;
        const newField = document.createElement('div');
        newField.className = 'input-group';
        newField.innerHTML = `
            <label for="custom${customFieldCount}">Row ${customFieldCount}: </label>
            <input type="text" id="custom${customFieldCount}" name="custom${customFieldCount}">
        `;
        customOptions.appendChild(newField);
    });

    document.getElementById('selectionForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        console.log('Form Data:', Object.fromEntries(formData.entries()));
        // Implement further logic to save the collection
    });

    document.getElementById('saveBtn').addEventListener('click', async () => {
    // Extract values from modal inputs
    const collectionName = document.getElementById('collectionNameInput').value;
    const columns = Array.from(document.querySelectorAll('.fieldNameInput')).map(input => input.value);

    // Construct payload
    const payload = {
        collectionName: collectionName,
        columns: columns,
        username: 'currentUsername' // Replace with actual username logic
    };

    try {
        const response = await fetch('/create-new-collection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Error creating collection:', error);
        alert('An unexpected error occurred.');
    }
});




});
