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
    }

    checkFormValidation = () => {
        const form = this.elements.form;

        form.addEventListener('input', () => {

        })
    }
}