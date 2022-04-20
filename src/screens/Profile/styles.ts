import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  profileName: {
    fontSize: 30,
    alignSelf: 'flex-start',
    marginVertical: 5,
    marginTop: 10,
  },
  profileProfession: {
    fontSize: 15,
    alignSelf: 'flex-start',
  },
  profileMain: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})
