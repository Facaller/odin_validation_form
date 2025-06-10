import { Validator } from "./validator";

export class Elements {
    constructor () {
        this.form          = document.querySelector('.form-container');
        this.nameInput     = document.querySelector('#name');
        this.emailInput    = document.querySelector('#email');
        this.countryInput  = document.querySelector('#country');
        this.postalInput   = document.querySelector('#postal-code');
        this.passwordInput = document.querySelector('#password');
        this.confirmInput  = document.querySelector('#pass-confirmation');

        this.nameError     = document.querySelector('#name-error');
        this.emailError    = document.querySelector('#email-error');
        this.countryError  = document.querySelector('#country-error');
        this.postalError   = document.querySelector('#postal-error');
        this.passwordError = document.querySelector('#password-error');
        this.confirmError  = document.querySelector('#confirm-error');
    }
}

export class DOMHandler {
    constructor () {
        this.elements = new Elements();
        this.validator = new Validator();

        this.checkNameValidation();
        this.checkEmailValidation();
        this.checkCountryValidation();
        this.checkPostalValidation();
        this.checkPasswordValidation();
        this.checkConfirmValidation();
    }

    checkNameValidation = () => {
        const name = this.elements.nameInput;

        name.addEventListener('input', () => {
            this.validator.nameValidation(name);
        });
    }

    checkEmailValidation = () => {
        const email = this.elements.emailInput;
        
        email.addEventListener('input', () => {
            this.validator.emailValidation(email);
            console.log("emailValidation called");
        });
    }

    checkCountryValidation = () => {
        const country = this.elements.countryInput;

        country.addEventListener('change', () => {
            this.validator.countryValidation(country);
            console.log(`${country.value}`);
        });
    }

    checkPostalValidation = () => {
        const postal = this.elements.postalInput;
        const countryValue = this.elements.countryInput.value;

        postal.addEventListener('input', () => {
            this.validator.postalValidation(countryValue, postal);
        });
    }

    checkPasswordValidation = () => {
        const password = this.elements.passwordInput;

        password.addEventListener('input', () => {
            this.validator.passValidation(password);
        });
    }

    checkConfirmValidation = () => {
        const confirm = this.elements.confirmInput;
        const password = this.elements.passwordInput;

        confirm.addEventListener('input', () => {
            this.validator.passConfirmationValidation(password, confirm);
        });
    }



        // checkFormValidation = () => {
    //     const form     = this.elements.form;
    //     const name     = this.elements.nameInput;
    //     const email    = this.elements.emailInput;
    //     const country  = this.elements.countryInput;
    //     const postal   = this.elements.postalInput;
    //     const password = this.elements.passwordInput;
    //     const confirm  = this.elements.confirmInput;

    //     form.addEventListener('input', () => {
    //         this.validator.groupValidation(name, email, country, postal, password, confirm);
    //     })
    // }
}