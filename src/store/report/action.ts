import {actionObject} from '@utils'
import {DELETE_REPORT, GENERATE_REPORT} from './action-types'

export const generateReport = (data: any) => actionObject(GENERATE_REPORT, data)
export const deleteReport = () => actionObject(DELETE_REPORT)
