import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {name: 'mydatabase.db', location: 'default'},
  () => {console.log('Database opened successfully')},
  error => {console.error('Error opening database:', error);}
);

export default db;
db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)',
      [],
      () => {console.log('Table created successfully')},
      error => {console.error('Error creating table:', error);}
    );
  });
  
  export const addNote = (content) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO notes (content) VALUES (?)',
        [content],
        (tx, results) => {console.log('Note added successfully')},
        error => {console.error('Error adding note:', error);}
      );
    });
  };
  export const getNotes = (callback) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM notes',
        [],
        (tx, results) => {
          let notes = [];
          for (let i = 0; i < results.rows.length; i++) {
            notes.push(results.rows.item(i));
          }
          callback(notes);
        },
        error => {console.error('Error retrieving notes:', error);}
      );
    });
  };