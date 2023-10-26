import { StyleSheet } from 'react-native'
import { Typos, Elements } from '@theme'

export const localStyles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 10
  }
})

export const styles = { ...localStyles, ...Typos, ...Elements }
