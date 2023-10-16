import { StyleSheet } from 'react-native'
import { Typos, Elements } from '@theme'


const localStyles = StyleSheet.create({
  main: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  scrollView: {
    width: '100%',
  },
  modal: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  textContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 15
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 15
  },
  root: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  textSeparator: {
    marginRight: 3
  }
})

export const styles = { ...localStyles, ...Typos, ...Elements }
