import {StyleSheet} from 'react-native'
import {Typos, Elements} from '@theme'

export const localStyles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    width: '100%',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    width: '47%',
  },
  formContainer: {
    paddingTop: 15,
    borderBottomWidth: 1,
    gap: 20,
  },
})

export const styles = {...localStyles, ...Typos, ...Elements}
