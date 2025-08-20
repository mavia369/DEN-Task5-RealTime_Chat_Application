import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';

//get all users except current
export const getAllUsers = async () => {
    try {
        const currentUser = auth().currentUser;

        const snapshot = await database()
            .ref('/users')
            .once('value');

        const usersData = snapshot.val() || {};
        const allUsers = Object.values(usersData);

        // filter out current user
        const otherUsers = allUsers.filter(user => user.uid !== currentUser.uid);

        return otherUsers;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
};