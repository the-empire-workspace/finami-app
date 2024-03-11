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
    alignItems: 'flex-end',
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
    backgroundColor: 'transparent',
  },
  root: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#000000BF',
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
  modInput: {
    width: '100%',
    textAlign: 'left',
    borderWidth: 0,
    borderRadius: 5,
  },
  inputContainer: {
    borderRadius: 5,
    position: 'relative',
    borderWidth: 1,
    width: '100%',
    flex: 1,
  },
  floatLabel: {
    position: 'absolute',
    left: -5,
    top: -15,
    zIndex: 1,
    padding: 5,
  },
  modDate: {
    borderWidth: 0,
    marginBottom: 0,
  },
  mainInputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    flex: 1,
  },
  modButton: {
    width: 65,
    height: 44,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const styles = {...localStyles, ...Typos, ...Elements}
