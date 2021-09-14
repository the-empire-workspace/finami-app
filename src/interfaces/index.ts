import { Transaction as MainTransaction } from './transaction'
import { TransactionCategory as MainTransactionCategory } from './transactionCategory'
export interface DispatchProps {
  type: string
  payload: any
}
export type Transaction = MainTransaction
export type TransactionCategory = MainTransactionCategory