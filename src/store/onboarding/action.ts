import {actionObject} from '@utils'
import {COMPLETE_ONBOARDING, SET_STEP} from './action-types'

export const setStep = (payload: any) => actionObject(SET_STEP, payload)
export const completeOnboarding = (payload: any) =>
  actionObject(COMPLETE_ONBOARDING, payload)
