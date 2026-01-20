// Vent til siden er færdig med at loade
document.addEventListener('DOMContentLoaded', function () {
    // Finder formularen og alle felterne
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Finder hvor fejlmeddelelser skal vises
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    // Tjekker om navnet er okay
    function validateName(name) {
        const trimmedName = name.trim();

        // Tjek om navnet er tomt
        if (!trimmedName) {
            return 'Navn er påkrævet';
        }

        // Navnet skal være mindst 2 tegn
        if (trimmedName.length < 2) {
            return 'Navn skal være mindst 2 tegn';
        }

        // Navnet må max være 50 tegn
        if (trimmedName.length > 50) {
            return 'Navn må maksimalt være 50 tegn';
        }

        // Tjek om navnet kun har bogstaver, mellemrum, bindestreger og apostroffer
        const namePattern = /^[a-zA-ZæøåÆØÅ\s\-']+$/;
        if (!namePattern.test(trimmedName)) {
            return 'Navn kan kun indeholde bogstaver, mellemrum, bindestreger og apostroffer';
        }

        return '';
    }

    // Tjekker om emailen er okay
    function validateEmail(email) {
        const trimmedEmail = email.trim();

        // Tjek om emailen er tom
        if (!trimmedEmail) {
            return 'Email er påkrævet';
        }

        // Tjek om emailen har det rigtige format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(trimmedEmail)) {
            return 'Indtast en gyldig email-adresse (fx: Carsten@rts.dk)';
        }

        // Email må ikke have to punktummer i træk
        if (trimmedEmail.includes('..')) {
            return 'Email må ikke indeholde to punktummer i træk';
        }

        // Email må ikke starte eller slutte med punktum
        if (trimmedEmail.startsWith('.') || trimmedEmail.endsWith('.')) {
            return 'Email må ikke starte eller slutte med et punktum';
        }

        return '';
    }

    // Tjekker om beskeden er okay
    function validateMessage(message) {
        const trimmedMessage = message.trim();

        // Tjek om beskeden er tom
        if (!trimmedMessage) {
            return 'Besked er påkrævet';
        }

        // Beskeden skal være mindst 10 tegn
        if (trimmedMessage.length < 10) {
            return 'Besked skal være mindst 10 tegn';
        }

        // Beskeden må max være 1000 tegn
        if (trimmedMessage.length > 1000) {
            return 'Besked må maksimalt være 1000 tegn';
        }

        return '';
    }

    // Viser en fejlmeddelelse
    function showError(input, errorElement, message) {
        // Giv feltet en rød border
        input.classList.add('error');
        // Vis fejlmeddelelsen
        errorElement.textContent = message;
        errorElement.setAttribute('aria-live', 'polite');
    }

    // Fjerner fejlmeddelelsen
    function clearError(input, errorElement) {
        // Fjern rød border
        input.classList.remove('error');
        // Fjern fejlmeddelelsen
        errorElement.textContent = '';
    }

    // Viser en notifikation når beskeden er sendt
    function showNotification(message) {
        // Opret notifikation element
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.textContent = message;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');

        // Tilføj til body
        document.body.appendChild(notification);

        // Vis notifikationen med animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Fjern notifikationen efter 4 sekunder
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    // Tjekker et felt og viser/fjerner fejl
    function validateField(input, errorElement, validator) {
        const value = input.value;
        const error = validator(value);

        if (error) {
            // Hvis der er fejl, vis den
            showError(input, errorElement, error);
            return false;
        } else {
            // Hvis der ikke er fejl, fjern eventuelle gamle fejl
            clearError(input, errorElement);
            return true;
        }
    }

    // Tjek navn når man klikker væk fra feltet
    nameInput.addEventListener('blur', function () {
        validateField(nameInput, nameError, validateName);
    });

    // Tjek email når man klikker væk fra feltet
    emailInput.addEventListener('blur', function () {
        validateField(emailInput, emailError, validateEmail);
    });

    // Tjek besked når man klikker væk fra feltet
    messageInput.addEventListener('blur', function () {
        validateField(messageInput, messageError, validateMessage);
    });

    // Holder styr på om felterne allerede er blevet tjekket
    let nameValidated = false;
    let emailValidated = false;
    let messageValidated = false;

    // Tjek navn mens man skriver (efter første gang man har klikket væk)
    nameInput.addEventListener('input', function () {
        if (nameValidated) {
            validateField(nameInput, nameError, validateName);
        }
    });

    // Tjek email mens man skriver (efter første gang man har klikket væk)
    emailInput.addEventListener('input', function () {
        if (emailValidated) {
            validateField(emailInput, emailError, validateEmail);
        }
    });

    // Tjek besked mens man skriver (efter første gang man har klikket væk)
    messageInput.addEventListener('input', function () {
        if (messageValidated) {
            validateField(messageInput, messageError, validateMessage);
        }
    });

    // Håndterer når man trykker send
    form.addEventListener('submit', function (event) {
        // Stopper formularen fra at sende normalt
        event.preventDefault();

        // Marker alle felter som tjekket
        nameValidated = true;
        emailValidated = true;
        messageValidated = true;

        // Tjek alle felter
        const isNameValid = validateField(nameInput, nameError, validateName);
        const isEmailValid = validateField(emailInput, emailError, validateEmail);
        const isMessageValid = validateField(messageInput, messageError, validateMessage);

        // Hvis alt er okay, send formularen
        if (isNameValid && isEmailValid && isMessageValid) {
            // Vis notifikation
            showNotification('Besked sendt!');
            // Nulstil formularen
            form.reset();

            // Nulstil tjek-flagene
            nameValidated = false;
            emailValidated = false;
            messageValidated = false;

            // Fjern alle fejlmeddelelser
            clearError(nameInput, nameError);
            clearError(emailInput, emailError);
            clearError(messageInput, messageError);
        } else {
            // Hvis der er fejl, sæt fokus på det første felt med fejl
            if (!isNameValid) {
                nameInput.focus();
            } else if (!isEmailValid) {
                emailInput.focus();
            } else if (!isMessageValid) {
                messageInput.focus();
            }
        }
    });
});
