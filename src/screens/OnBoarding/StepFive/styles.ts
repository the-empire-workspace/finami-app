import {StyleSheet} from 'react-native'
import {Typos, Elements} from '@theme'

const localStyles = StyleSheet.create({
  scrollRoot: {
    flexGrow: 1,
  },
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
    gap: 20,
  },
  container: {
    width: '100%',
  },
  buttonLocal: {
    textTransform: 'uppercase',
  },
})

export const styles = {...localStyles, ...Typos, ...Elements}
