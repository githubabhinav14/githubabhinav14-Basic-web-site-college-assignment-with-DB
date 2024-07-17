document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        password: document.getElementById('password').value,
        age: document.getElementById('age').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        branch: document.getElementById('branch').value
    };

    try {
        const response = await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Registration successful!');
        } else {
            alert('Registration failed.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing your request.');
    }
});

