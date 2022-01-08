import React, {useContext, useState} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import WriteHeader from '../components/WriteHeader';
import WriteEditor from '../components/WriteEditor';
import LogContext from '../contexts/LogContext';

function WriteScreen({route}) {
  const log = route.params?.log;

  const [title, setTitle] = useState(log?.title ?? '');
  const [body, setBody] = useState(log?.body ?? '');

  const navigation = useNavigation();
  const {onCreate, onModify} = useContext(LogContext);

  const onSave = () => {
    if (log) {
      onModify({
        id: log.id,
        date: log.date,
        title,
        body,
      });
    } else {
      onCreate({
        title,
        body,
        // 날짜를 문자열로 변환
        date: new Date().toISOString(),
      });
    }
    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <WriteHeader onSave={onSave} />
        <WriteEditor
          title={title}
          body={body}
          onChangeTitle={setTitle}
          onChangeBody={setBody}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoidingView: {
    flex: 1,
  },
});

export default WriteScreen;
