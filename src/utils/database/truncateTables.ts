import database from "./init";

const TruncateEntriesTable = async () => {
  try {
    await database.executeSql('DELETE FROM entries');
  } catch (error) {
    console.log(error);
  }
}

const TruncateAccountsTable = async () => {
  try {
    await database.executeSql('DELETE FROM accounts');
  } catch (error) {
    console.log(error);
  }
}

const TruncateUsersTable = async () => {
  try {
    await database.executeSql('DELETE FROM users');
  } catch (error) {
    console.log(error);
  }
}

const TruncateTables = async () => {
  try {
    await TruncateEntriesTable();
    await TruncateAccountsTable();
    await TruncateUsersTable();
  } catch (error) {
    console.log(error);
  }
}

export default TruncateTables