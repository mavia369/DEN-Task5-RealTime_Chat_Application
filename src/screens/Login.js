import { Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, TextInput } from 'react-native-paper'
import { loginUser } from '../firebase/Auth'

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const handleLogin = async () => {
        setShowLoader(true);
        if (email.trim().length === 0 || password.trim().length === 0) {
            Alert.alert('Error', 'Please fill all fields.');
            setShowLoader(false);
            return;
        }
        try {
            await loginUser(email, password);
            Alert.alert('Success!', 'You are logged in!');
            setShowLoader(false);
        } catch (error) {
            Alert.alert('Error Login user: ', error.message);
            setShowLoader(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                placeholder='Enter Email'
                value={email}
                onChangeText={setEmail}
                mode='outlined'
                activeOutlineColor='black'
                style={styles.input}
            />

            <TextInput
                placeholder='Enter Password'
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry={!showPassword}
                mode='outlined'
                activeOutlineColor='black'
                right={
                    <TextInput.Icon
                        icon={showPassword ? "eye-off" : "eye"}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />

            <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                {
                    showLoader ?
                        <ActivityIndicator size={24} color={'white'} />
                        :
                        <Text style={styles.btnText}>Login</Text>
                }
            </TouchableOpacity>

            <Text
                style={styles.orSignup}
                onPress={() => navigation.navigate('Signup')}>or Sign Up</Text>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 50
    },

    input: {
        width: '90%',
        height: 50,
        marginBottom: 20,
        fontSize: 18,
        backgroundColor: 'white'
    },

    btn: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        backgroundColor: 'black',
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    btnText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },

    orSignup: {
        textDecorationLine: 'underline',
        fontSize: 20,
        marginTop: 20,
        fontWeight: '600'
    }

})