
import SQLite from 'react-native-sqlite-storage';


const database = SQLite.openDatabase(
  { name: 'finami.db', location: 'default' },
  () => { console.log('database connected') },
  (e: any) => { console.log('database error', e) }
);

export default database