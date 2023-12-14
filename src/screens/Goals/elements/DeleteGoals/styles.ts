import {StyleSheet} from 'react-native'
import {Typos, Elements} from '@theme'

export const localStyles = StyleSheet.create({
  root: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modalLayout: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: '100%',
    gap: 20,
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  containerActions: {
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  buttonStyle: {
    width: '47%',
  },
})

export const styles = {...localStyles, ...Typos, ...Elements}
