import { Stack } from 'expo-router';
import { useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Message = {
  id: string;
  text: string;
  me: boolean;
  time?: string;
};

const initialMessages: Message[] = [
  { id: '1', text: 'Người bán hiện đang offline.', me: false, time: '09:10' },
  { id: '2', text: 'Hãy để lại tin nhắn hoặc số điện thoại, người bán sẽ liên hệ lại sớm nhất có thể!', me: false, time: '09:10' },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [text, setText] = useState('');
  const listRef = useRef<FlatList>(null);

  const send = () => {
    if (!text.trim()) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
    const msg: Message = { id: String(Date.now()), text: text.trim(), me: true, time };
    setMessages((prev) => [...prev, msg]);
    setText('');
    // scroll to bottom after short delay
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[styles.messageRow, item.me ? styles.messageRowRight : styles.messageRowLeft]}>
      {!item.me && <View style={styles.avatar}><Text style={styles.avatarText}>NG</Text></View>}
      <View style={[styles.bubble, item.me ? styles.bubbleMe : styles.bubbleOther]}>
        <Text style={[styles.messageText, item.me ? styles.messageTextMe : styles.messageTextOther]}>{item.text}</Text>
        {item.time ? <Text style={styles.timeText}>{item.time}</Text> : null}
      </View>
      {item.me && <View style={{width:36}} />}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: 'Chat với người bán' }} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 60}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.inputRow}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Nhập tin nhắn..."
            style={styles.input}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={send} accessibilityLabel="Gửi">
            <Text style={styles.sendButtonText}>Gửi</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  messagesContainer: { padding: 12, paddingBottom: 20 },
  messageRow: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-end' },
  messageRowLeft: { justifyContent: 'flex-start' },
  messageRowRight: { justifyContent: 'flex-end' },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  avatarText: { fontWeight: '700', color: '#666' },
  bubble: { maxWidth: '78%', padding: 10, borderRadius: 12 },
  bubbleOther: { backgroundColor: '#f1f0f0', borderTopLeftRadius: 4 },
  bubbleMe: { backgroundColor: '#92E3A9', borderTopRightRadius: 4 },
  messageText: { fontSize: 15, lineHeight: 20 },
  messageTextOther: { color: '#222' },
  messageTextMe: { color: '#fff' },
  timeText: { fontSize: 11, color: '#666', marginTop: 6, alignSelf: 'flex-end' },
  inputRow: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f7f7f7',
    borderRadius: 20,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#2b8a3e',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: { color: '#fff', fontWeight: '700' },
});
