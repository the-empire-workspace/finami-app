import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
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
  roundDot: {
    width: 8,
    height: 8,
    borderRadius: 100,
    margin: 5,
    marginVertical: 10,
  },
  dotContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
})
