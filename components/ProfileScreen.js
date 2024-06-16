import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [text, setText] = useState('');
  const [number, setNumber] = useState(null);
  const [boolean, setBoolean] = useState(null);
  const [object, setObject] = useState({});
  const [array, setArray] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const textValue = await AsyncStorage.getItem('@text_key');
        const numberValue = JSON.parse(await AsyncStorage.getItem('@number_key'));
        const booleanValue = JSON.parse(await AsyncStorage.getItem('@boolean_key'));
        const objectValue = JSON.parse(await AsyncStorage.getItem('@object_key'));
        const arrayValue = JSON.parse(await AsyncStorage.getItem('@array_key'));

        if (textValue !== null) setText(textValue);
        if (numberValue !== null) setNumber(numberValue);
        if (booleanValue !== null) setBoolean(booleanValue);
        if (objectValue !== null) setObject(objectValue);
        if (arrayValue !== null) setArray(arrayValue);
      } catch (e) {
        console.error(e);
      }
    };

    loadData();
  }, []);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('@text_key', text);
      await AsyncStorage.setItem('@number_key', JSON.stringify(number));
      await AsyncStorage.setItem('@boolean_key', JSON.stringify(boolean));
      await AsyncStorage.setItem('@object_key', JSON.stringify(object));
      await AsyncStorage.setItem('@array_key', JSON.stringify(array));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Type something..."
      />
      <TextInput
        style={styles.input}
        value={number ? number.toString() : ''}
        onChangeText={(value) => setNumber(Number(value))}
        placeholder="Type a number..."
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={boolean !== null ? boolean.toString() : ''}
        onChangeText={(value) => setBoolean(value === 'true')}
        placeholder="Type true or false..."
      />
      <TextInput
        style={styles.input}
        value={JSON.stringify(object)}
        onChangeText={(value) => setObject(JSON.parse(value))}
        placeholder="Type an object..."
      />
      <TextInput
        style={styles.input}
        value={JSON.stringify(array)}
        onChangeText={(value) => setArray(JSON.parse(value))}
        placeholder="Type an array..."
      />
      <Button title="Save" onPress={saveData} />
      <Text style={styles.storedText}>Stored Text: {text}</Text>
      <Text style={styles.storedText}>Stored Number: {number}</Text>
      <Text style={styles.storedText}>Stored Boolean: {boolean ? 'true' : 'false'}</Text>
      <Text style={styles.storedText}>Stored Object: {JSON.stringify(object)}</Text>
      <Text style={styles.storedText}>Stored Array: {JSON.stringify(array)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  storedText: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default ProfileScreen;
