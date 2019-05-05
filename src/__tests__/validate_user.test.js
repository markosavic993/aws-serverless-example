import { handler as lambdaHandler } from '../lambdas/validateuser/validate-user';
import badUsernameData from '../__tests__/mocks/bad_username.json';
import badEmailData from '../__tests__/mocks/bad_email.json';
import validUserData from '../__tests__/mocks/valid_user.json';

describe('Test lambda for validation of user', () => {
    test("verify hander exists", () => {
        expect(lambdaHandler).toBeTruthy();
    });

    test('no user response for empty event', () => {
        let result = lambdaHandler({}, {}, ()=>{});

        expect(result.validationState).toBeTruthy();
        expect(result.validationState).toEqual("no-user");
        expect(result.user).toBeTruthy();
        expect(result.user).toEqual({});
    });

    test('no user response for existing event without body', () => {
        let result = lambdaHandler('{"path": "/users","httpMethod": "POST"}', {}, ()=>{});

        expect(result.validationState).toBeTruthy();
        expect(result.validationState).toEqual("no-user");
        expect(result.user).toBeTruthy();
        expect(result.user).toEqual({});
    });

    test('bad username response when empty username provided', () => {
        let result = lambdaHandler(badUsernameData, {}, ()=>{});    
        
        expect(result.validationState).toBeTruthy();
        expect(result.validationState).toEqual("bad-username");
        expect(result.user).toBeTruthy();
        expect(result.user.userId).toEqual("1234");
    });
    
    test('bad email response when invalid email provided', () => {
        let result = lambdaHandler(badEmailData, {}, ()=>{});    
        
        expect(result.validationState).toBeTruthy();
        expect(result.validationState).toEqual("bad-email");
        expect(result.user).toBeTruthy();
        expect(result.user.userId).toEqual("1234");
    });

    test('valid user', () => {
        let result = lambdaHandler(validUserData, {}, ()=>{});    
        
        expect(result.validationState).toBeTruthy();
        expect(result.validationState).toEqual("valid");
        expect(result.user).toBeTruthy();
        expect(result.user.userId).toEqual("1234");
        expect(result.user.username).toEqual("msav");
        expect(result.user.email).toEqual("savicmarko993@gmail.com");
    });
});