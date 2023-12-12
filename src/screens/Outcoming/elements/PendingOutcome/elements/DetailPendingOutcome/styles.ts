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
    paddingTop: 15,
    paddingBottom: 15,
  },
  accountData: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  mainInfo: {
    paddingHorizontal: 20,
    gap: 15,
    paddingBottom: 10,
  },
  amountIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },

  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 25,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'space-between',
    marginTop: 5,
  },
  action: {},
  actionUp: {
    transform: [{rotate: '180deg'}],
  },
  rootModal: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000040',
    flex: 1,
  },
  modalTitle: {
    paddingHorizontal: 20,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },
  titleCenter: {
    textAlign: 'center',
  },
  modalBody: {
    gap: 20,
    paddingHorizontal: 16,
    paddingBottom: 15,
  },
  filterSelection: {
    paddingVertical: 17,
    paddingHorizontal: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'space-between',
    marginTop: 5,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 10,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 10,
  },
  progressContent: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 2,
    borderRadius: 5,
    minHeight: 40,
  },
  progress: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
    opacity: 0.5,
  },
  createButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modInput: {
    width: '40%',
    textAlign: 'right',
  },
  inputContainer: {
    borderRadius: 5,
    position: 'relative',
    borderWidth: 1,
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
})

export const styles = {...localStyles, ...Typos, ...Elements}
