import { Validator } from "./validator";

export class Elements {
    constructor () {
        this.formContainer   = document.querySelector('.form-container')
        this.name            = document.querySelector('#name')
        this.email           = document.querySelector('#email')
        this.country         = document.querySelector('#country')
        this.postal          = document.querySelector('#postal-code')
        this.password        = document.querySelector('#password')
        this.confirmPassword = document.querySelector('#pass-confirmation')
    }
}