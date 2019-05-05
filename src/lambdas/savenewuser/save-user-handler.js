import DynamoDbCommunicationWrapper from './dynamodb-communication-wrapper';
import SaveNewUserLambda from './save-new-user-lambda';

export function handler(event, context, callback) {
    return new SaveNewUserLambda().insertUserIntoDatabase(event, new DynamoDbCommunicationWrapper().putItem);
}