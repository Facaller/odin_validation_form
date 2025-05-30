export class Validator {
    constructor () {
        this.name = /^[A-Za-zÀ-ÖØ-öø-ÿ'’\- ]+$/

    }

    groupValidation () {

    }

    nameValidation (nameElement) {
        if (nameElement.validity.valueMissing) {
            return "Please enter your name."
        } else if (nameElement.validity.tooShort) {
            return `Name must be at least ${nameElement.minlength}.`
        } else if (nameElement.validity.tooLong) {
            return `Name can't be longer than ${nameElement.maxlength}.`
        } else if (nameElement.validity.patternMismatch) {
            return "Your name contains characters that aren't allowed.";
        }
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