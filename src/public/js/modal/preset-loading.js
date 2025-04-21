$(document).ready(function() {

    $.getJSON('https://dev.collectiqo.com:3000/get-user-templates', function(templateNames) {
        const $presetSelect = $('#preset');
        $presetSelect.empty();
        $presetSelect.append('<option value="x" disabled selected>Select preset...</option>');
        templateNames.forEach(name => {
            console.log('Name: ' + name)
            $presetSelect.append(`<option value="${name}">${name}</option>`);
        });
    });

    $('.multi-field-wrapper').each(function() {
    var $wrapper = $('.multi-fields', this);

    $(".add-field", $(this)).click(function() {
    $('.multi-field:first-child', $wrapper).clone(true).appendTo($wrapper).find('input').val('').focus();
});

    $wrapper.on('click', '.remove-field', function() {
    if ($('.multi-field', $wrapper).length > 1) {
    $(this).parent('.multi-field').remove();
}
});
});

    $('#preset').on('change', async function() {
    if (!$('#customCollection').is(':checked')) {
    const selectedPreset = $(this).val();

    try {
    const response = await fetch(
    `https://dev.collectiqo.com:3000/get-preset-data?templateName=${selectedPreset}`,
    );

    if (response.ok) {
    const templateData = await response.json();
    console.log(`Template Data: ${templateData}`)

    // Clear existing fields
    $('.multi-fields').empty();

    // Create a new field for each column entry in the template data
    let i = 0;
    templateData.columns.forEach((column) => {
    i++;
    console.log(`Create entry for column: ${column}`)
    const newField = $('<div class="multi-field">')
    .append(`<input type="text" name="customField[]" class="textbox" placeholder="Field ${i}" value="${column}">`)
    .append('<button type="button" class="remove-field">-</button>');
    $('.multi-fields').append(newField);
});
} else {
    console.error('Failed to fetch preset data:', response.statusText);
}
} catch (error) {
    console.error('Error fetching preset data:', error);
}
}
});

});
