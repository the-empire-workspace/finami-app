import {StyleSheet} from 'react-native'
import {Typos, Elements} from '@theme'

export const localStyles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    padding: 10,
    paddingTop: 20,
    gap: 20,
  },
  resultContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
  },
})

export const styles = {...localStyles, ...Typos, ...Elements}
