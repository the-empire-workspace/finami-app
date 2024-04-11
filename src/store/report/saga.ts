import {call, select, takeLatest} from 'redux-saga/effects'

import {
  selectAccount,
  selectGoals,
  selectIncoming,
  selectOutcoming,
} from '../selector'
import {GENERATE_REPORT} from './action-types'
import {
  getExpensesReportQuery,
  getGoalsReportQuery,
  getIncomesReportQuery,
  getLastMovementsQuery,
  getReportAccountQuery,
  getReportCurrenciesQuery,
  getReportFromEntryCategoryQuery,
  getReportFromEntryQuery,
} from 'utils/database/reportEntryQueries'
import {PDFGenerator, buildTable, getLanguage, translate} from 'utils'
import RNFS from 'react-native-fs'
import FileViewer from 'react-native-file-viewer'
function* generateReportAsync({payload}: any): any {
  try {
    const language = yield call(getLanguage)
    let table = ''
    let entries = []
    let headers = ['date', 'amount', 'concept', 'type', 'comments']
    let values = ['date', 'amount', 'payment_concept', 'entry_type', 'comment']
    let main: any = {}
    switch (payload.type) {
      case 'last_movements':
        entries = yield call(
          getLastMovementsQuery,
          payload.from_date,
          payload.to_date,
        )
        break
      case 'currency':
        entries = yield call(
          getReportCurrenciesQuery,
          payload.from_date,
          payload.to_date,
          payload?.id,
        )
        break
      case 'account':
        const {account = {}} = yield select(selectAccount)
        main = account
        entries = yield call(
          getReportAccountQuery,
          payload.from_date,
          payload.to_date,
          payload?.id,
        )
        break
      case 'incomes':
        entries = yield call(
          getIncomesReportQuery,
          payload.from_date,
          payload.to_date,
        )
        break
      case 'outcomes':
        entries = yield call(
          getExpensesReportQuery,
          payload.from_date,
          payload.to_date,
        )
        break
      case 'debt':
        const {item: debt} = yield select(selectOutcoming)
        main = debt
        entries = yield call(
          getReportFromEntryQuery,
          payload.from_date,
          payload.to_date,
          payload?.id,
        )
        break
      case 'debt_category':
        const {item: debt_category} = yield select(selectOutcoming)
        main = debt_category
        entries = yield call(
          getReportFromEntryCategoryQuery,
          payload.from_date,
          payload.to_date,
          payload?.id,
        )
        break
      case 'basic_expenses':
        const {item: basic_expenses} = yield select(selectOutcoming)
        main = basic_expenses
        entries = yield call(
          getReportFromEntryQuery,
          payload.from_date,
          payload.to_date,
          payload?.id,
        )
        break
      case 'basic_expenses_category':
        const {item: basic_expenses_category} = yield select(selectOutcoming)
        main = basic_expenses_category
        entries = yield call(
          getReportFromEntryCategoryQuery,
          payload.from_date,
          payload.to_date,
          payload?.id,
        )
        break
      case 'pending_incomes':
        const {item: pending_incomes} = yield select(selectIncoming)
        main = pending_incomes
        entries = yield call(
          getReportFromEntryQuery,
          payload.from_date,
          payload.to_date,
          payload?.id,
        )
        break
      case 'pending_incomes_category':
        const {item: pending_incomes_category} = yield select(selectIncoming)
        main = pending_incomes_category
        entries = yield call(
          getReportFromEntryCategoryQuery,
          payload.from_date,
          payload.to_date,
          payload?.id,
        )
        break
      case 'fixed_incomes':
        const {item: fixed_incomes} = yield select(selectIncoming)
        main = fixed_incomes
        entries = yield call(
          getReportFromEntryQuery,
          payload.from_date,
          payload.to_date,
          payload?.id,
        )
        break
      case 'fixed_incomes_category':
        const {item: fixed_incomes_category} = yield select(selectIncoming)
        main = fixed_incomes_category
        entries = yield call(
          getReportFromEntryCategoryQuery,
          payload.from_date,
          payload.to_date,
          payload?.id,
        )
        break
      case 'compromise':
        entries = yield call(
          getGoalsReportQuery,
          payload.from_date,
          payload.to_date,
          payload?.type,
        )
        break
      case 'desire':
        entries = yield call(
          getGoalsReportQuery,
          payload.from_date,
          payload.to_date,
          payload?.type,
        )
        break
      case 'desire_category':
        const {item: desire_category} = yield select(selectGoals)
        main = desire_category
        entries = yield call(
          getReportFromEntryCategoryQuery,
          payload.from_date,
          payload.to_date,
          payload?.id,
        )
        break
      case 'compromise_category':
        const {item: compromise_category} = yield select(selectGoals)
        main = compromise_category
        entries = yield call(
          getReportFromEntryCategoryQuery,
          payload.from_date,
          payload.to_date,
          payload?.id,
        )
        break
      case 'compromise_detail':
        const {item: compromise_detail} = yield select(selectGoals)
        main = compromise_detail
        entries = yield call(
          getReportFromEntryQuery,
          payload.from_date,
          payload.to_date,
          payload?.id,
        )
        break
      case 'desire_detail':
        const {item: desire_detail} = yield select(selectGoals)
        main = desire_detail
        entries = yield call(
          getReportFromEntryQuery,
          payload.from_date,
          payload.to_date,
          payload?.id,
        )
        break
    }

    headers = ['date', 'amount', 'concept', 'type', 'comments']
    values = ['date', 'amount', 'payment_concept', 'entry_type', 'comment']
    entries.map((entry: any) => {
      entry.date = new Date(entry.date).toLocaleDateString(
        language === 'es' ? 'es-VE' : 'en-US',
        {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        },
      )
      entry.amount = `${entry.currency_symbol}${entry.amount?.toLocaleString(
        'en-US',
        {
          maximumFractionDigits: entry?.decimal,
        },
      )} ${entry.currency_name}`
      entry.entry_type = translate(entry.entry_type)
      return entry
    })
    table = buildTable({
      type: payload?.type,
      from_date: payload?.from_date,
      to_date: payload?.to_date,
      entries,
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
    console.log(error, 'an error happend generate report')
  }
}

export function* watchGenerateReport() {
  yield takeLatest(GENERATE_REPORT, generateReportAsync)
}
