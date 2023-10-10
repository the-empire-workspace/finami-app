import { StyleSheet } from 'react-native'
import { Typos, Elements } from '@theme'

const localStyles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  container: {
    width: '100%'
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  subtitleLocal: {
    textAlign: 'center'
  }
})

export const styles = { ...localStyles, ...Typos, ...Elements }