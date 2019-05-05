import SendFailureInfoLambda from '../lambdas/sendfailureinfo/send-failure-info-lambda';

describe('Test lambda for sns communication', () => {
    test('verify hander exists', () => {
        expect(SendFailureInfoLambda).toBeTruthy();
    });

    test('Verify correct params for sns', () => {
        const snsPublishMock = jest.fn(()=>{});
        const event = {
            "validationState": "bad-email",
            "user": {
                "userId": "1122",
                "username": "simon",
                "email": "monsi@gmail.com"
            }
        }
        const context = {};
        const expectedParams = {
            Subject: "Wrong user creation tried",
            Message: `Bad User tried to be added. \n Reason: ${event.validationState} \n Entered data: ${JSON.stringify(event.user)}`,
            TopicArn: "arn:aws:sns:eu-central-1:675043311651:BadUserInsertionTopic"
        };

        new SendFailureInfoLambda().publishMessage(event, context, snsPublishMock);

        expect(snsPublishMock).toHaveBeenCalled();
        expect(snsPublishMock).toHaveBeenCalledWith(expectedParams, context);
    });
});