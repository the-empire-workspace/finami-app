import {debugLog} from 'utils'
import {call, select, takeLatest, Effect, CallEffect} from 'redux-saga/effects'

import {
  selectAccount,
  selectGoals,
  selectIncoming,
  selectOutcoming,
} from '../selector'
import {GENERATE_REPORT} from './action-types'
import {PDFGenerator, buildTable, getLanguage, translate} from 'utils'
import RNFS from 'react-native-fs'
import FileViewer from 'react-native-file-viewer'
import {Entry, Account, Category} from 'utils/database/models'
import {useEntryService} from 'services'

interface ReportPayload {
  type: string
  from_date: Date
  to_date: Date
  id?: number
}

interface MainData {
  name?: string
  payment_concept?: string
  account_name?: string
  currency_name?: string
}

type EntryFilters = {
  account_id?: number
  category_id?: number
  entry_type?: string
  payment_type?: string
  status?: string
  start_date?: Date
  end_date?: Date
  entry_id?: number
}

function* generateReportAsync({payload}: {payload: ReportPayload}): Generator<Effect, void, any> {
  try {
    const language = yield call(getLanguage)
    let table = ''
    let entries: Entry[] = []
    let headers = ['date', 'amount', 'concept', 'type', 'comments']
    let values = ['date', 'amount', 'payment_concept', 'entry_type', 'comment']
    let main: MainData = {}
    const entryService = useEntryService()

    const fetchEntriesWithFilters = (filters: EntryFilters) => 
      call(function* (): Generator<Effect, Entry[], unknown> {
        const result = yield call(entryService.fetchEntries, filters)
        return result as Entry[]
      })

    switch (payload.type) {
      case 'last_movements':
        entries = yield call(fetchEntriesWithFilters, {
          start_date: payload.from_date,
          end_date: payload.to_date
        })
        break
      case 'currency':
        entries = yield call(fetchEntriesWithFilters, {
          start_date: payload.from_date,
          end_date: payload.to_date,
          account_id: payload?.id
        })
        break
      case 'account':
        const {account = {}} = yield select(selectAccount)
        main = account as MainData
        entries = yield call(fetchEntriesWithFilters, {
          start_date: payload.from_date,
          end_date: payload.to_date,
          account_id: payload?.id
        })
        break
      case 'incomes':
        entries = yield call(fetchEntriesWithFilters, {
          start_date: payload.from_date,
          end_date: payload.to_date,
          entry_type: 'income'
        })
        break
      case 'outcomes':
        entries = yield call(fetchEntriesWithFilters, {
          start_date: payload.from_date,
          end_date: payload.to_date,
          entry_type: 'expense'
        })
        break
      case 'debt':
        const {item: debt} = yield select(selectOutcoming)
        main = debt as MainData
        entries = yield call(fetchEntriesWithFilters, {
          start_date: payload.from_date,
          end_date: payload.to_date,
          entry_id: payload?.id
        })
        break
      case 'debt_category':
        const {item: debt_category} = yield select(selectOutcoming)
        main = debt_category as MainData
        entries = yield call(fetchEntriesWithFilters, {
          start_date: payload.from_date,
          end_date: payload.to_date,
          category_id: payload?.id
        })
        break
      case 'basic_expenses':
        const {item: basic_expenses} = yield select(selectOutcoming)
        main = basic_expenses as MainData
        entries = yield call(fetchEntriesWithFilters, {
          start_date: payload.from_date,
          end_date: payload.to_date,
          entry_id: payload?.id
        })
        break
      case 'basic_expenses_category':
        const {item: basic_expenses_category} = yield select(selectOutcoming)
        main = basic_expenses_category as MainData
        entries = yield call(fetchEntriesWithFilters, {
          start_date: payload.from_date,
          end_date: payload.to_date,
          category_id: payload?.id
        })
        break
      case 'pending_incomes':
        const {item: pending_incomes} = yield select(selectIncoming)
        main = pending_incomes as MainData
        entries = yield call(fetchEntriesWithFilters, {
          start_date: payload.from_date,
          end_date: payload.to_date,
          entry_id: payload?.id,
          status: 'pending'
        })
        break
      case 'pending_incomes_category':
        const {item: pending_incomes_category} = yield select(selectIncoming)
        main = pending_incomes_category as MainData
        entries = yield call(fetchEntriesWithFilters, {
          start_date: payload.from_date,
          end_date: payload.to_date,
          category_id: payload?.id,
          status: 'pending'
        })
        break
      case 'fixed_incomes':
        const {item: fixed_incomes} = yield select(selectIncoming)
        main = fixed_incomes as MainData
        entries = yield call(fetchEntriesWithFilters, {
          start_date: payload.from_date,
          end_date: payload.to_date,
          entry_id: payload?.id
        })
        break
      case 'fixed_incomes_category':
        const {item: fixed_incomes_category} = yield select(selectIncoming)
        main = fixed_incomes_category as MainData
        entries = yield call(fetchEntriesWithFilters, {
          start_date: payload.from_date,
          end_date: payload.to_date,
          category_id: payload?.id
        })
        break
      case 'compromise':
        entries = yield call(fetchEntriesWithFilters, {
          start_date: payload.from_date,
          end_date: payload.to_date,
          entry_type: 'goals',
          payment_type: 'compromise'
        })
        break
      case 'desire':
        entries = yield call(fetchEntriesWithFilters, {
          start_date: payload.from_date,
          end_date: payload.to_date,
          entry_type: 'goals',
          payment_type: 'desire'
        })
        break
      case 'desire_category':
        const {item: desire_category} = yield select(selectGoals)
        main = desire_category as MainData
        entries = yield call(fetchEntriesWithFilters, {
          start_date: payload.from_date,
          end_date: payload.to_date,
          category_id: payload?.id
        })
        break
      case 'compromise_category':
        const {item: compromise_category} = yield select(selectGoals)
        main = compromise_category as MainData
        entries = yield call(fetchEntriesWithFilters, {
          start_date: payload.from_date,
          end_date: payload.to_date,
          category_id: payload?.id
        })
        break
      case 'compromise_detail':
        const {item: compromise_detail} = yield select(selectGoals)
        main = compromise_detail as MainData
        entries = yield call(fetchEntriesWithFilters, {
          start_date: payload.from_date,
          end_date: payload.to_date,
          entry_id: payload?.id
        })
        break
      case 'desire_detail':
        const {item: desire_detail} = yield select(selectGoals)
        main = desire_detail as MainData
        entries = yield call(fetchEntriesWithFilters, {
          start_date: payload.from_date,
          end_date: payload.to_date,
          entry_id: payload?.id
        })
        break
    }

    headers = ['date', 'amount', 'concept', 'type', 'comments']
    values = ['date', 'amount', 'payment_concept', 'entry_type', 'comment']
    
    const formattedEntries = entries.map((entry: Entry) => ({
      ...entry,
      date: new Date(entry.date).toLocaleDateString(
        language === 'es' ? 'es-VE' : 'en-US',
        {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        },
      ),
      amount: `${entry.currency_symbol}${entry.amount?.toLocaleString(
        'en-US',
        {
          maximumFractionDigits: entry?.decimal,
        },
      )} ${entry.currency_name}`,
      entry_type: translate(entry.entry_type)
    }))

    table = buildTable({
      type: payload?.type,
      from_date: payload?.from_date,
      to_date: payload?.to_date,
      entries: formattedEntries,
      headers,
      values,
      name:
        main?.name ||
        main?.payment_concept ||
        main?.account_name ||
        main?.currency_name,
    })

    const date = new Date()
    const pdf = yield call(
      PDFGenerator,
      table,
      `report_${payload.type}_${date.getTime()}`,
      'Documents',
    )
    yield call(
      RNFS.moveFile,
      pdf.filePath,
      `${RNFS.DocumentDirectoryPath}/report_${
        payload.type
      }_${date.getTime()}.pdf`,
    )
    FileViewer.open(
      `${RNFS.DocumentDirectoryPath}/report_${
        payload.type
      }_${date.getTime()}.pdf`,
      {showOpenWithDialog: true},
    )
  } catch (error) {
    debugLog(error, 'an error happened generating report')
  }
}

export function* watchGenerateReport() {
  yield takeLatest(GENERATE_REPORT as any, generateReportAsync)
}
