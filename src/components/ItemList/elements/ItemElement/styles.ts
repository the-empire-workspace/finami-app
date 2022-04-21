import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  transactionItem: {
    width: '100%',
    maxWidth: '100%',
    height: 120,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 2.5,
    justifyContent: 'space-evenly',
  },
  imageContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  transactionData: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionTitle: {
    fontSize: 20,
  },
  transactionCategory: {
    fontSize: 15,
  },
  transactionAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  transactionDate: {
    fontSize: 15,
    textAlign: 'right',
  },
  transactionItemBox: {
    flex: 1.5,
  },
  transactionItemInfo: {
    flex: 1,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 5,
  },
  deleteAction: {alignSelf: 'flex-end'},
})
