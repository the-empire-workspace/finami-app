import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  newButton: {
    width: '100%',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newButtonText: {
    fontSize: 40,
    fontWeight: '700',
  },
  upperBox: {
    flex: 1,
    paddingTop: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  chart: {
    marginVertical: 20,
  },
  categoryBox: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    maxWidth: '100%',
    height: 50,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 10,
    textAlign: 'center',
  },
  categories: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  downBox: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  noItemBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noItemText: {
    fontSize: 40,
  },
  actionBanner: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
    marginBottom: 5,
  },
  button: {
    width: '42%',
    borderWidth: 1,
  },
})
