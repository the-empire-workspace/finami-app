import {StyleSheet} from 'react-native'
import {Typos, Elements} from '@theme'

const localStyles = StyleSheet.create({
  transactionItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    marginVertical: 2.5,
  },
  concept: {
    marginBottom: 5,
  },
  amount: {
    flex: 1,
    alignSelf: 'flex-end',
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
  },
})

export const styles = {...localStyles, ...Typos, ...Elements}
