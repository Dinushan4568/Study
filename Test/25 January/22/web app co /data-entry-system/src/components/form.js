function createForm() {
    const form = document.createElement('form');
    form.id = 'data-entry-form';

    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name:';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.required = true;

    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email:';
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'email';
    emailInput.required = true;

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';

    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(submitButton);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        // Handle form submission logic here
        const formData = new FormData(form);
        console.log('Form submitted:', Object.fromEntries(formData));
    });

    return form;
}

export default createForm;