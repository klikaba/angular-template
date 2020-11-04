export class ValidationMessage {
    static get email(): any {
        return {
            required    : 'You must enter a value',
            email       : 'Not a valid email'
        };
    }

    static get password(): any {
        return {
            required    : 'You must enter a value'
        };
    }
}
