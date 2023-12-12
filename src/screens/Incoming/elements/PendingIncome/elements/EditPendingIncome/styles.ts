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
  categoryContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 20,
  },
  selectBox: {
    width: 24,
    height: 24,
    borderRadius: 30,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectBoxInner: {
    width: 12,
    height: 12,
    borderRadius: 30,
  },
})

export const styles = {...localStyles, ...Typos, ...Elements}
