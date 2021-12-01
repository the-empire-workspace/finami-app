import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
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
    paddingHorizontal: 5
  }
})
