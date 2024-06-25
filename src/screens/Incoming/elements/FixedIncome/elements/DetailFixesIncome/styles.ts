import { StyleSheet } from 'react-native'
import { Typos, Elements } from '@theme'

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
  textAmount: {
    flexShrink: 1,
    alignItems: 'flex-start',
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
    transform: [{ rotate: '180deg' }],
  },
  rootModal: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
  },
  modalTitle: {
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 20,
    alignItems: 'center',
    height: 80
  },
  titleCenter: {
    textAlign: 'center',
  },
  modalBody: {
    gap: 20,
    padding: 12,
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
  overText: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 2,
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  createButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.3,
    height: '100%',
  },
  modInput: {
    flex: 1,
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

export const styles = { ...localStyles, ...Typos, ...Elements }
