import SendFailureInfoLambda from './send-failure-info-lambda';
import SnsCommuncationWrapper from './sns-communication-wrapper';

export function handler(event, context, callback) {
    return new SendFailureInfoLambda().publishMessage(
        event,
        context, 
        new SnsCommuncationWrapper().publishMessageToSns);
}
