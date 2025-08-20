import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

const ChatListItem = ({ item, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.listItem}
            onPress={onPress}
        >
            <Image
                source={require('../images/user1.png')}
                style={styles.userImage}
            />
            <View style={styles.chatItemContainer}>
                <Text style={styles.nameTxt}>
                    {item.displayName}
                </Text>
                {item.lastMsg ? (
                    <Text style={styles.msgTxt}>
                        {item.lastMsg.text.length > 45
                            ? item.lastMsg.text.substring(0, 40) + '...'
                            : item.lastMsg.text}
                        {'\n'}
                        {new Date(item.lastMsg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </Text>
                ) : (
                    <Text>{'\n'}</Text>
                )}
            </View>
            {item.unseenCount > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeTxt}>{item.unseenCount}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default ChatListItem;

const styles = StyleSheet.create({

    chatItemContainer: {
        width: '70%'
    },

    msgTxt: {
        fontSize: 14,
        color: 'gray'
    },

    nameTxt: {
        fontSize: 16,
        fontWeight: '500'
    },

    listItem: {
        paddingLeft: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 30
    },

    userImage: {
        height: 40,
        width: 40,
        marginRight: 18,
    },

    badge: {
        backgroundColor: 'red',
        borderRadius: 50,
        alignSelf: 'center',
        marginLeft: 'auto',
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },

    badgeTxt: {
        color: 'white',
        fontWeight: 'bold',
    },
});
