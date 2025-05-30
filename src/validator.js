export class Validator {
    constructor () {
        this.name = /^[A-Za-zÀ-ÖØ-öø-ÿ'’\- ]+$/

    }

    groupValidation () {

    }

    nameValidation (nameElement) {
        const value = nameElement.value;
        const pattern = this.name;
        
        if (nameElement.validity.valueMissing) {
            return "Please enter your name."
        } else if (nameElement.validity.tooShort) {
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

    }

    countryValidation (countryElement) {

    }

    postalValidation (postalElement) {

    }

    passValidation (passElement) {

    }

    passConfirmationValidation (passConfirmElement) {

    }
}