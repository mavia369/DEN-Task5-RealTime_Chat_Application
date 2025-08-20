import { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import auth from "@react-native-firebase/auth";

const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            try {
                const unsubscribe = auth().onAuthStateChanged((user) => {
                    navigation.reset({ routes: [{ name: user ? 'ChatList' : 'Login' }] });
                });
            } catch (error) {
                Alert.alert(
                    "Error", "Failed to check authentication. Please try again.",
                    [{ text: "OK", onPress: () => { navigation.reset({ routes: [{ name: 'Login' }] }) } }]
                );
            }
        }, 2000);
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Chat-App</Text>
            <Text style={styles.subLogo}>{'(Firebase)'}</Text>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },

    logo: {
        fontSize: 40,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },

    subLogo: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        //fontWeight: 'bold'
    }
})