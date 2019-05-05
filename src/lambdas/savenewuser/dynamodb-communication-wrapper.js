import { DynamoDB } from 'aws-sdk';
const dynamodb = new DynamoDB({apiVersion: '2012-08-10'});

export default class DynamoDbCommunicationWrapper {
    
    putItem(tableName, item) {
        dynamodb.putItem({
            'TableName': tableName,
            'Item' : item
        }, (err, data) => {
            if(err) {
                console.log('Error: ' + err);
            } else {
                console.log('Success: ' + data);
            }
        });
    }
}