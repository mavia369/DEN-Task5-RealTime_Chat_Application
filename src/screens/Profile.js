import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native-paper';

const Profile = () => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);

    const handleLogout = async () => {
        await auth().signOut();
    };

    useEffect(() => {
        const user = auth().currentUser;
        if (user) {
            setName(user.displayName);
            setEmail(user.email);
        }
    }, [])

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Profile</Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.infoTxt}>
                        <Text style={styles.label}>Name: </Text>{name}
                    </Text>
                    <Text style={styles.infoTxt}>
                        <Text style={styles.label}>Email: </Text>{email}
                    </Text>
                    <Button
                        onPress={handleLogout}
                        style={styles.logoutBtn}
                        labelStyle={styles.logoutBtnTxt}
                    >Logout</Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: 'black'
    },

    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    header: {
        elevation: 10,
        backgroundColor: 'black',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },

    headerText: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold'
    },

    logoutBtn: {
        backgroundColor: 'red',
        borderRadius: 10,
        width: '25%',
        marginTop: 40,
        alignSelf: 'flex-end',
    },

    logoutBtnTxt: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600'
    },

    contentContainer: {
        flex: 1,
        padding: 14,
    },

    infoTxt: {
        fontSize: 18,
        marginVertical: 6,
    },

    label: {
        fontWeight: 'bold'
    },
})
