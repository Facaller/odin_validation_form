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

    groupValidation () {
        if (param.validity.valueMissing) {
            return "This field cannot be empty."
        }
    }

    nameValidation (nameElement) {
        const value = nameElement.value.trim();
        const pattern = this.nameConstraint;
        
        if (nameElement.validity.tooShort) {
            return `Name must be at least ${nameElement.minLength} characters.`
        } else if (nameElement.validity.tooLong) {
            return `Name can't be longer than ${nameElement.maxLength} characters.`
        } else if (!pattern.test(value)) {
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
        if (emailElement.validity.typeMismatch) {
            return "You need to enter an email address."
        } else if (emailElement.validity.tooShort) {
            return `Email should be at least ${emailElement.minLength} characters; you entered ${emailElement.value.length}`;
        }
        return null;
    }

    countryValidation (countryElement) {
        if (countryElement.selectedIndex === 0) {
            return "Please choose a country"
        }
        return null;
    }

    postalValidation (countryValue, postalElement) {
        const constraint = new RegExp(this.postalConstraints[countryValue][0], "");
        
        if (constraint.test(postalElement.value)) {
            postalElement.setCustomValidity("");
        } else {
            postalElement.setCustomValidity(constraint[countryValue][1]);
        }
        return null;
    }

    passValidation (passElement) {
        const value = passElement.value;
        const constraints = this.passConstraints;

        if (passElement.validity.tooLong) {
            return "Your password can't be longer than 24 characters";
        } else if (passElement.validity.tooShort) {
            return "Your password can't be shorter than 8 characters";
        }

        const errorArray = [];
        
        for (let constraint of constraints) {
            if (!constraint.pattern.test(value)) {
                errorArray.push(constraint.message)
            }
        }

        if (!errorArray.length > 0) {
            return errorArray;
        }

        return null;
    }

    passConfirmationValidation (passConfirmElement, passElement) {
        const passValue = passElement.value;
        const confirmValue = passConfirmElement.value;

        if (confirmValue.trim() !== passValue.trim()) {
            return "Your passwords don't match"
        }
        return null;
    }
}