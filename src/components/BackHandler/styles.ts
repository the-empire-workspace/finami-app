import { StyleSheet } from 'react-native'
import { Typos, Elements } from '@theme'
const localStyles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    height: 91,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 34,
    paddingBottom: 25
  },
  text: {
    marginLeft: 10
  }
})

export const styles = { ...localStyles, ...Typos, ...Elements }