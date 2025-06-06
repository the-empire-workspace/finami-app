import {debugLog} from 'utils'
import SQLite from 'react-native-sqlite-storage'

const database = SQLite.openDatabase(
  {name: 'finami.db', location: 'default'},
  () => {
    debugLog('database connected')
    database.executeSql('PRAGMA foreign_keys = ON')
  },
  (e: any) => {
    debugLog('database error', e)
  },
)

export default database
