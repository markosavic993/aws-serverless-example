const SUBJECT_TEXT = "Wrong user creation tried";
const SNS_TOPIC_ARN = "arn:aws:sns:eu-central-1:675043311651:BadUserInsertionTopic";

export default  class SendFailureInfoLambda {

    publishMessage(event, context, publishMessageToSns) {
        let message = this.createNotificationText(event);
        let params = {
            Subject: SUBJECT_TEXT,
            Message: message,
            TopicArn: SNS_TOPIC_ARN
        };

        publishMessageToSns(params,context);
    }

    createNotificationText(event) {
        return `Bad User tried to be added. \n Reason: ${event.validationState} \n Entered data: ${JSON.stringify(event.user)}`;
    }
}