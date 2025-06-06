import {Entry} from '../../../../utils/database/models/Entry'
import {Currency} from '../../../../utils/database/models/Currency'

export interface Props {
  item: Entry
  type: 'basic_expenses' | 'fixed_incomes' | 'debts' | 'receivable_accounts' | 'goals'
  currency?: Currency
}
