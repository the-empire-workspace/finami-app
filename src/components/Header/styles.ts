import {StyleSheet} from 'react-native'
import {Typos, Elements} from '@theme'

const localStyles = StyleSheet.create({
  root: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sub: {
    marginBottom: 5,
  },
  image: {
    width: 30,
    height: 30,
  },
  notification: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const styles = {...localStyles, ...Typos, ...Elements}
