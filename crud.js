window.addEventListener('DOMContentLoaded', function() {
    let el = document.getElementById('CRUDAction');
    updateForm(el.value);

    el.addEventListener('change', function(e) {
        updateForm(e.target.value);
    });

    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        crudAction(new FormData(document.querySelector('form')));
    });

});

function updateForm(selectedAction) {
    let form = document.querySelector('form');
    if(selectedAction == 'create') {
        form.action = "POST";
        form.querySelector('#form-info').innerHTML = `
            <legend>Create</legend>
            <label for="key">Key: </label>
            <input type="text" id="key" name="key" required>
            <label for="value">Value:</label>
            <textarea name="value" id="value" rows="10" required></textarea>
        `;
    }
    if(selectedAction == 'read') {
        form.action = "GET";
        form.querySelector('#form-info').innerHTML = `
            <legend>Read</legend>
            <label for="key">Key: </label>
            <input type="text" id="key" name="key" required>
        `;
    }
    if(selectedAction == 'update') {
        form.action = "POST";
        form.querySelector('#form-info').innerHTML = `
            <legend>Update</legend>
            <label for="key">Key: </label>
            <input type="text" id="key" name="key" required>
            <label for="value">Value:</label>
            <textarea name="value" id="value" rows="10" required></textarea>
        `;
    }
    if(selectedAction == 'delete') {
        form.action = "GET";
        form.querySelector('#form-info').innerHTML = `
            <legend>Delete</legend>
            <label for="key">Key: </label>
            <input type="text" id="key" name="key" required>
        `;
    }
}

function crudAction(formData) {
    let action = formData.get('CRUDAction');
    let key = formData.get('key');
    let value = formData.get('value');
    if(action == 'create') {
        if(localStorage.getItem(key)) {
            document.querySelector('output').innerHTML = `
                <p>There is already data associated with "${key}"</p>
            `;
        } else {
            localStorage.setItem(key,value);
            document.querySelector('output').innerHTML = `
                <p>The data associated with "${key}" has been created with a value of "${value}"</p>
            `;
        }
    }
    if(action == 'read') {
        if(localStorage.getItem(key)) {
            document.querySelector('output').innerHTML = `
                <p>The data associated with "${key}" has a value of "${localStorage.getItem(key)}"</p>
            `;
        } else {
            document.querySelector('output').innerHTML = `
                <p>There is no data associated with "${key}"</p>
            `;
        }
    }
    if(action == 'update') {
        if(localStorage.getItem(key)) {
            let prevVal = localStorage.getItem(key);
            localStorage.setItem(key, JSON.stringify(value));
            document.querySelector('output').innerHTML = `
                <p>The data associated with "${key}" has been updated from "${prevVal}" to "${localStorage.getItem(key)}"</p>
            `;
        } else {
            document.querySelector('output').innerHTML = `
                <p>There is no data associated with "${key}"</p>
            `;
        }
    }
    if(action == 'delete') {
        if(localStorage.getItem(key)) {
            localStorage.removeItem(key);
            document.querySelector('output').innerHTML = `
            <p>The data associated with "${key}" has been deleted</p>
            `;
        } else {
            document.querySelector('output').innerHTML = `
                <p>There is no data associated with "${key}"</p>
            `;
        }
    }
}
