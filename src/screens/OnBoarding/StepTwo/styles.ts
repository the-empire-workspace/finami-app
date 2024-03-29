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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  container: {
    width: '100%',
  },
  centerContainer: {
    alignItems: 'center',
  },
  formContainer: {
    marginTop: 25,
    gap: 15,
  },
  title: {
    marginTop: 30,
    marginBottom: 30,
  },
  goBack: {
    textDecorationLine: 'underline',
  },
  input: {
    width: '100%',
    position: 'relative',
    padding: 10,
  },
  label: {
    position: 'absolute',
    color: 'white',
    top: -15,
    left: -5,
    opacity: 1,
    padding: 5,
    zIndex: 3,
  },
})

export const styles = {...localStyles, ...Typos, ...Elements}
