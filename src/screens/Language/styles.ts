import {StyleSheet} from 'react-native'
import {Typos, Elements} from '@theme'

export const localStyles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {},
  language: {
    paddingHorizontal: 20,
    paddingVertical: 17,
    borderBottomWidth: 1,
  },
})

export const styles = {...localStyles, ...Typos, ...Elements}
