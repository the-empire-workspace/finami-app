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
  textAmount:{
    flexShrink:1
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
    backgroundColor: 'transparent',
    flex: 1,
  },
  modalTitle: {
    padding: 12,
  },
  titleCenter: {
    textAlign: 'center',
  },
  modalBody: {
    gap: 1,
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
})

export const styles = {...localStyles, ...Typos, ...Elements}
