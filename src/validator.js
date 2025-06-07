export class Validator {
    constructor () {
        this.nameConstraint = /^[A-Za-zÀ-ÖØ-öø-ÿ'’\- ]+$/
        this.passConstraints = [
            { pattern: /[a-z]/, message: "You need at least one lowercase letter" },
            { pattern: /[A-Z]/, message: "You need at least one uppercase letter" },
            { pattern: /\d/, message: "You need at least one digit" },
            { pattern: /[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]/, message: "You need at least one special character" }
        ]
        this.postalConstraints = {
            ch: [
                "^(CH-)?\\d{4}$",
                "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
            ],
            fr: [
                "^(F-)?\\d{5}$",
                "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
            ],
            de: [
                "^(D-)?\\d{5}$",
                "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
            ],
            nl: [
                "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
                "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
            ],
            za: [
                "^\\d{4}$",
                "South African postal codes must have exactly 4 digits: e.g. 8001 or 1234",
            ],
        }
    }

    groupValidation (nameEl, emailEl, countryEl, postalEl, passEl, confirmEl) {
        const errors            = {}
        const nameError         = this.nameValidation(nameEl);
        const emailError        = this.emailValidation(emailEl);
        const countryError      = this.countryValidation(countryEl);
        const postalError       = this.postalValidation(countryEl.value, postalEl);
        const passError         = this.passValidation(passEl);
        const confirmationError = this.passConfirmationValidation(passEl,confirmEl);

        errors.name         = nameError;
        errors.email        = emailError;
        errors.country      = countryError;
        errors.postal       = postalError;
        errors.pass         = passError;
        errors.confirmation = confirmationError;

        return errors;
    }

    nameValidation (nameElement) {
        const trimmed = nameElement.value.trim()
        let error = null;

        if (nameElement.validity.tooShort) {
            error = `Name must be at least ${nameElement.minLength} characters.`
        } else if (nameElement.validity.tooLong) {
            error = `Name can't be longer than ${nameElement.maxLength} characters.`
        } else if (nameElement.validity.valueMissing) {
            error = "Please enter your name";
        } else {
            error = this.findInvalidCharacter(trimmed, this.nameConstraint);
        }

        nameElement.setCustomValidity(error || "");
        return error;
    }

    findInvalidCharacter (value, pattern) {
        if (!pattern.test(value)) {
            for (let char of value) {
                if (!pattern.test(char)) {
                    return `The character "${char}" isn't allowed in a name.`;
                }
            }

            return "Your name contains invalid characters";
        }
        return null;
    }

    emailValidation (emailElement) {
        let error = null;

        if (emailElement.validity.typeMismatch) {
            error = "You need to enter an email address."
        } else if (emailElement.validity.tooShort) {
            error = `Email should be at least ${emailElement.minLength} characters; you entered ${emailElement.value.length}`;
        } else if (emailElement.validity.valueMissing) {
            error = "Please enter your email";
        }

        emailElement.setCustomValidity(error || "");
        return error;
    }

    countryValidation (countryElement) {
        let error = null;

        if (countryElement.selectedIndex === 0) {
            error = "Please choose a country"
        }

        countryElement.setCustomValidity(error || "");
        return error;
    }

    postalValidation (countryValue, postalElement) {
        const constraint = new RegExp(this.postalConstraints[countryValue][0], "");
        let error = null;

        if (postalElement.validity.valueMissing) {
            error = "Please enter your postal code";
        } else if (!constraint.test(postalElement.value)) {
            error = this.postalConstraints[countryValue][1];
        }

        postalElement.setCustomValidity(error || "");
        return error;
    }

    passValidation (passElement) {
        const trimmed = passElement.value.trim()
        let error = null;

        if (passElement.validity.tooLong) {
            error = "Your password can't be longer than 24 characters";
        } else if (passElement.validity.tooShort) {
            error = "Your password can't be shorter than 8 characters";
        } else if (passElement.validity.valueMissing) {
            error = "Please set your password";
        } else {
            const passwordErrors = this.getPasswordErrors(trimmed, this.passConstraints);
            if (passwordErrors.length > 0) {
                error = passwordErrors.join("\n");
            }
        }

        passElement.setCustomValidity(error || "");
        return error;
    }

    getPasswordErrors (value, constraints) {
        const errorArray = [];
        
        for (let constraint of constraints) {
            if (!constraint.pattern.test(value)) {
                errorArray.push(constraint.message)
            }
        }

        return errorArray;
    }

    passConfirmationValidation (passElement, confirmationElement) {
        const password = passElement.value.trim();
        const confirmation = confirmationElement.value.trim();
        let error = null;

        if (confirmation !== password) {
            error = "Your passwords don't match"
        } else if (confirmationElement.validity.valueMissing) {
            error = "Please confirm your password";
        }
        
        confirmationElement.setCustomValidity(error || "");
        return error;
    }
}