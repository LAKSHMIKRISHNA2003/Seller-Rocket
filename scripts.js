// Fetch list of countries from REST Countries API
fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        const countrySelect = document.getElementById('country');
        data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.cca2;  // Using the country code (cca2)
            option.textContent = country.name.common;  // Display country name
            countrySelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error fetching country data:', error));

// Handle form step navigation
document.querySelectorAll('.next').forEach(button => {
    button.addEventListener('click', function() {
        const currentStep = this.closest('.form-step');
        const nextStep = document.querySelector(`.form-step[data-step="${parseInt(currentStep.dataset.step) + 1}"]`);
        currentStep.classList.remove('active');
        nextStep.classList.add('active');
        document.querySelector(`.step[data-step="${parseInt(currentStep.dataset.step) + 1}"]`).classList.add('active');
    });
});

document.querySelectorAll('.prev').forEach(button => {
    button.addEventListener('click', function() {
        const currentStep = this.closest('.form-step');
        const prevStep = document.querySelector(`.form-step[data-step="${parseInt(currentStep.dataset.step) - 1}"]`);
        currentStep.classList.remove('active');
        prevStep.classList.add('active');
        document.querySelector(`.step[data-step="${parseInt(currentStep.dataset.step) - 1}"]`).classList.add('active');
    });
});

// Handle email radio buttons
document.getElementById('same-email').addEventListener('change', function() {
    document.getElementById('different-email-row').style.display = 'none';
});

document.getElementById('different-email').addEventListener('change', function() {
    document.getElementById('different-email-row').style.display = 'block';
});

// Handle form submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission (prevents page reload)

    // Collect form data
    const formData = new FormData(this);  // Using `this` for form reference

    // Send form data to the PHP script via AJAX
    fetch('send_email.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Check if the email was sent successfully
        if (data.status === 'success') {
            // Hide form and show success message
            document.querySelector('.form-section').style.display = 'none';
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Registration successful! A confirmation email has been sent.';
            successMessage.classList.add('success-message');
            document.body.appendChild(successMessage);
        } else {
            alert('Error sending email. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error sending email. Please try again.');
    });
});
