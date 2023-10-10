import { StyleSheet } from 'react-native'
import { Typos, Elements } from '@theme'

const localStyles = StyleSheet.create({
  scrollRoot: {
    flexGrow: 1
  },
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
    width: '100%',
  },
  centerContainer: {
    alignItems: 'center'
  },
  formContainer: {
    marginTop: 25,
  },
  title: {
    marginTop: 30,
    marginBottom: 30,
  },
  goBack: {
    textDecorationLine: 'underline'
  },
  input: {
    width: '100%',
  },
  buttonLocal: {
    textTransform: 'uppercase'
  }
})

export const styles = { ...localStyles, ...Typos, ...Elements }