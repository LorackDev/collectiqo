document.addEventListener('DOMContentLoaded', function() {
    const customCollectionCheckbox = document.getElementById('customCollection');
    const presetGroup = document.getElementById('presetGroup');
    const customOptions = document.getElementById('customOptions');

    customCollectionCheckbox.addEventListener('change', function() {
        if (customCollectionCheckbox.checked) {
            presetGroup.style.display = 'none';
            customOptions.style.display = 'block';
            customOptions.innerHTML = '';
        } else {
            presetGroup.style.display = 'block';
            customOptions.style.display = 'none';
            customOptions.innerHTML = '';
        }
    });
});