import { SNS } from 'aws-sdk';

export default class SnsCommunicationWrapper {

    publishMessageToSns(params, context) {
        let snsClient = new SNS();
        snsClient.publish(params, context.done); 
    }
}