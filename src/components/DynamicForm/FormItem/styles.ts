import {StyleSheet} from 'react-native'

export const styles: any = StyleSheet.create({
  root: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    width: '100%',
  },
  rootMultiple: {
    borderBottomWidth: 1,
  },
  select: {
    zIndex: 2,
    fontSize: 14,
    color: 'white',
    width: '100%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    fontFamily: 'Poppins',
    letterSpacing: 0.14,
    marginBottom: 16,
  },
  multipleBox: {
    width: '100%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 30,
  },
  notOverflow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    overflow: 'hidden',
  },
  error: {
    color: 'red',
  },
  label: {
    position: 'absolute',
    color: 'white',
    top: -15,
    left: -5,
    opacity: 1,
    padding: 5,
    zIndex: 3,
  },
  inputContainer: {
    marginBottom: 15,
  },
})
