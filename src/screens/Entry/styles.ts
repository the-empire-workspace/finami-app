import {StyleSheet} from 'react-native'
import {Typos, Elements} from '@theme'

const localStyles = StyleSheet.create({
  main: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 15,
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
    alignItems: 'flex-start',
    width: '100%',
  },
  textWidth: {
    flex: 1,
  },
  boxContainer: {
    width: '100%',
    borderWidth: 2,
    borderRadius: 5,
  },
  boxHeader: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderBottomWidth: 1,
  },
  boxContent: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10,
    gap: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  root: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  textSeparator: {
    marginRight: 3,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 22,
    paddingHorizontal: 18,
    gap: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    flex: 1,
  },
  buttonMod: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    padding: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  modalMain: {
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: 'transparent',
  },
})

export const styles = {...localStyles, ...Typos, ...Elements}
