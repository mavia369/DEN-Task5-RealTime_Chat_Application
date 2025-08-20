import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

const MessageBubble = ({ item }) => {
    const isMe = item.senderId === auth().currentUser.uid;

    const formatTime = (ts) => {
        if (!ts) return '';
        const date = new Date(ts);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: isMe ? '#DCF8C6' : '#EEE',
                    alignSelf: isMe ? 'flex-end' : 'flex-start',
                }
            ]}
        >
            <Text style={styles.msgTxt}>{item.text}</Text>
            <Text style={styles.timeTxt}>
                {formatTime(item.timestamp)}
            </Text>
        </View>
    );
};

export default MessageBubble;

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: '70%'
    },

    msgTxt:{
        fontSize:16
    },

    timeTxt:{ 
        fontSize: 12, 
        color: 'gray', 
        marginTop: 3, 
        textAlign: 'right' 
    }
})