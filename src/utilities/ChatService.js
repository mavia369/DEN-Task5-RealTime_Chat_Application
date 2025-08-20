import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

// Generate consistent chatId between two users
export const getChatId = (uid1, uid2) => {
  return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
};

// Send a message
export const sendMessage = async (receiverId, text) => {
  const currentUser = auth().currentUser;
  if (!currentUser) return;

  const chatId = getChatId(currentUser.uid, receiverId);
  const newMessageRef = database()
    .ref(`/chats/${chatId}/messages`)
    .push();

  await newMessageRef.set({
    senderId: currentUser.uid,
    text: text,
    timestamp: database.ServerValue.TIMESTAMP,
    seen: false
  });
};

// Listen for messages
export const listenToMessages = (receiverId, callback) => {
  const currentUser = auth().currentUser;
  if (!currentUser) return;

  const chatId = getChatId(currentUser.uid, receiverId);

  return database()
    .ref(`/chats/${chatId}/messages`)
    .orderByChild('timestamp')   
    .on('value', snapshot => {
      const data = snapshot.val() || {};
      const messages = Object.entries(data).map(([id, msg]) => ({
        id,
        ...msg,
      }));

      messages.sort((a, b) => a.timestamp - b.timestamp);

      callback(messages);
    });
};

// Get last message between current user and another user
export const getLastMessage = async (otherUserId) => {
  const currentUser = auth().currentUser;
  if (!currentUser) return null;

  const chatId = getChatId(currentUser.uid, otherUserId);

  const snapshot = await database()
    .ref(`/chats/${chatId}/messages`)
    .orderByChild('timestamp')
    .limitToLast(1)
    .once('value');

  const data = snapshot.val();
  if (!data) return null;

  const [id, msg] = Object.entries(data)[0];
  return { id, ...msg };
};


// Get number of unseen messages for badge
export const getUnseenCount = async (otherUserId) => {
  const currentUser = auth().currentUser;
  const chatId = getChatId(currentUser.uid, otherUserId);

  const snapshot = await database()
    .ref(`/chats/${chatId}/messages`)
    .once('value');

  let unseenCount = 0;
  snapshot.forEach((child) => {
    const msg = child.val();
    if (msg.senderId !== currentUser.uid && msg.seen === false) {
      unseenCount++;
    }
  });

  return unseenCount;
};