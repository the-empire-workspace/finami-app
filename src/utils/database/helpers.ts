import database from "./init"

export const selectQuery = (query: any, values: any = []) => {
  return new Promise((resolve, reject) => database.transaction((tx) => {
    tx.executeSql(query, values, (tx, results) => {
      resolve(results.rows)
    }, error => {
      reject(error)
    })
  }))
}

export const insertQuery = (query: any, values: any) => {
  return new Promise((resolve, reject) => database.transaction((tx) => {
    tx.executeSql(query, values, (tx, results) => {
      resolve(results)
    }, error => {
      reject(error)
    })
  }))
}