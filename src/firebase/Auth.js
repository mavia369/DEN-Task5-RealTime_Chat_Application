import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';

//register user
export const registerUser = async (email, password, displayName) => {
    try {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        await userCredential.user.updateProfile({ displayName: displayName });
        
        // Save user in Realtime Database
        await database()
            .ref(`/users/${userCredential.user.uid}`)
            .set({
                uid: userCredential.user.uid,
                displayName: displayName,
                email: email,
            });

        return userCredential.user;
    } catch (error) {
        let errorMessage;
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'This email is already in use, please use a different email address.'
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid Email Address.'
                break;
            case 'auth/weak-password':
                errorMessage = 'Password is too weak. Please use at least 6 characters.'
                break;
            default:
                errorMessage = 'An unknown error occured'
        }
        throw new Error(errorMessage);
    }
}

//login user
export const loginUser = async (email, password) => {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        return user;
    } catch (error) {
        let errorMessage;
        switch (error.code) {
            case 'auth/invalid-credential':
                errorMessage = 'Incorrect Email or Password.'
                break;
            case 'auth/invalid-email':
                errorMessage = 'Please enter a valid email.'
                break;
            default:
                errorMessage = 'An unknown error occured'
        }
        throw new Error(errorMessage);
    }
}