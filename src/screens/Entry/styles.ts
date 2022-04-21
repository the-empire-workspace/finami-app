import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  main: {
    paddingVertical: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
  },
  root: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    textAlign: 'center',
    paddingBottom: 16,
  },
  select: {
    textAlign: 'center',
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
  },
  button: {
    marginTop: 50,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 25,
  },
  switchText: {
    fontSize: 16,
    width: 95,
    paddingHorizontal: 5,
  },
})
