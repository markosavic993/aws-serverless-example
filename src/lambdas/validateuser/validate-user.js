const validationState = {
    VALID: 'valid',
    NO_USER: 'no-user',
    BAD_USERNAME: 'bad-username',
    BAD_EMAIL: 'bad-email'
}

export function handler(event, context, callback) {
    return new ValidateUserLambda(event);
}


class ValidateUserLambda {
    constructor (event) {
        let user = this.fetchUserFromEvent(event);
        if(!user) {
            return this.noUserResponse();
        }

        return this.validateUser(user);
    }

    fetchUserFromEvent (event) {
        if(!event || !event.userId) {
            return null;
        }

        return event;
    }

    noUserResponse() {
        return new UserResponse(validationState.NO_USER, {});
    }

    validateUser(user) {
        if(!user.username || user.username === '') {
            return new UserResponse(validationState.BAD_USERNAME, user);
        }

        if(!this.validateEmail(user.email)) {
            return new UserResponse(validationState.BAD_EMAIL, user);
        }

        return new UserResponse(validationState.VALID, user);
    }

    validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    } 
}

class UserResponse {
    constructor(validationState, user) {
        this.validationState = validationState;
        this.user = user;
    }
}
