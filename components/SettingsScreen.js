import React, {useEffect, useState} from 'react';
import {Text, TextInput, Button, View} from 'react-native';
import db, {addNote, getNotes} from './database';

const SettingsScreen = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    getNotes(setNotes);
  }, []);

  const handleAddNote = () => {
    addNote(input);
    setInput('');
    getNotes(setNotes); // Refresh notes list
  };

  return (
    <View>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Enter note"
      />
      <Button title="Add Note" onPress={handleAddNote} />
      {notes.map(note => (
        <Text key={note.id}>{note.content}</Text>
      ))}
    </View>
  );
};

export default SettingsScreen;