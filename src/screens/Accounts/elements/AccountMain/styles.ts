import { StyleSheet } from 'react-native'
import { Typos, Elements } from '@theme'

export const localStyles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 5,
  },
  accountItem: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
  },
  accountInfoContainer: {
    gap: 5,
  },
})

export const styles = { ...localStyles, ...Typos, ...Elements }
