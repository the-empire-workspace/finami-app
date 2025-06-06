import {debugLog} from 'utils'
import database from './init'

const TruncateEntriesTable = async () => {
  try {
    await database.executeSql('DELETE FROM entries')
  } catch (error) {
    debugLog(error, 'an error happend truncate entries')
  }
}

const TruncateAccountsTable = async () => {
  try {
    await database.executeSql('DELETE FROM accounts')
  } catch (error) {
    debugLog(error, 'an error happend truncate accounts')
  }
}

const TruncateUsersTable = async () => {
  try {
    await database.executeSql('DELETE FROM users')
  } catch (error) {
    debugLog(error, 'an error happend truncate users')
  }
}
const TruncateCategoriesTable = async () => {
  try {
    await database.executeSql('DELETE FROM categories')
  } catch (error) {
    debugLog(error, 'an error happend truncate categories')
  }
}

const TruncateTables = async () => {
  try {
    await TruncateEntriesTable()
    await TruncateAccountsTable()
    await TruncateUsersTable()
    await TruncateCategoriesTable()
  } catch (error) {
    debugLog(error, 'an error happend truncate tables')
  }
}

export default TruncateTables
