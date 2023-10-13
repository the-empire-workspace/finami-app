import {selectQuery} from './helpers'

export const getCurrenciesQuery = async () => {
  try {
    const currencies: any = await selectQuery('SELECT * FROM currencies')
    return currencies.raw()
  } catch (error) {
    console.log(error)
    return null
  }
}
