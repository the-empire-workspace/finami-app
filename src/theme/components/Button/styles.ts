import { StyleSheet } from 'react-native'
import { Elements, Typos } from '@theme'

const stylesLocal = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
})

export const styles = { ...stylesLocal, ...Elements, ...Typos }