import {StyleSheet} from 'react-native'
import {Typos, Elements} from '@theme'

const localStyles = StyleSheet.create({
  modalLayout: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: '100%',
    flex: 1,
  },
  root: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  container: {
    width: '100%',
  },
  deleteTitle: {
    marginTop: 10,
    marginBottom: 15,
  },
  deleteSubtitle: {
    marginBottom: 40,
  },
  deleteBody: {
    textAlign: 'center',
  },
  deleteWarning: {
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 17,
    marginTop: 20,
    marginBottom: 25,
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
    flex: 1,
  },
})

export const styles = {...localStyles, ...Typos, ...Elements}
