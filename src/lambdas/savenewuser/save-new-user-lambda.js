export default class SaveNewUserLambda {

    insertUserIntoDatabase(event, putIntoDbFunction) {
        let tableName = 'users';
        let item = {
            'user_id': {S: event.user.userId},
            'username': {S: event.user.username},
            'email': {S: event.user.email}
        }

        putIntoDbFunction(tableName, item);
    }
}