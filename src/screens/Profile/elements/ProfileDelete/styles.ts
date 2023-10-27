import { StyleSheet } from 'react-native'
import { Typos, Elements } from '@theme'

const localStyles = StyleSheet.create({
  modal: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 68,
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    width: '100%',
  },
  root: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',

  },
  container: {
    width: '100%',
  },
  deleteTitle: {
    marginTop: 10,
    marginBottom: 15
  },
  deleteSubtitle: {
    marginBottom: 40
  },
  deleteBody: {
    textAlign: 'center'
  },
  deleteWarning: {
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 17,
    marginTop: 20,
    marginBottom: 25
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
  }
})

export const styles = { ...localStyles, ...Typos, ...Elements }
