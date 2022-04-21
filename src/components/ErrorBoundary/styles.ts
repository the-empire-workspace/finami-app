import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#172633',
  },
  modal: {
    width: '80%',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#2C4059',
    borderRadius: 20,
  },
  title: {
    paddingVertical: 5,
    fontSize: 20,
    color: '#F0F0F2',
  },
  body: {
    fontSize: 14,
    color: '#F0F0F2',
  },
  errorStack: {
    paddingTop: 10,
  },
})
