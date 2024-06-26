import {Platform} from 'react-native'

export const accountForm = (
  translate: any,
  def: any,
  accounts: any = [],
  colors: any = {},
) => [
  {
    element: 'select',
    name: 'account',
    label: translate('account'),
    labelStyle: {backgroundColor: colors?.background100},
    type: 'text',
    defaultValue: String(def?.account?.value) || '',
    keyboardType: 'default',
    placeholder: translate('account'),
    returnKeyType: 'go',
    values: [...(accounts || [])]?.map((account: any) => ({
      label: `${account?.account_name}`,
      value: String(account?.id),
    })),
    itemStyle: Platform.OS === 'ios' ? {color: colors.typography} : {},
    validations: {
      required: true,
      minLength: 0,
      maxLength: 72,
    },
  },
]

export const egressForm = (translate: any, def: any, colors: any = {}) => [
  {
    element: 'input',
    name: 'concept',
    label: translate('concept'),
    labelStyle: {backgroundColor: colors?.background100},
    type: 'text',
    defaultValue: def?.concept?.value || '',
    placeholder: translate('concept'),
    returnKeyType: 'next',
    keyboardType: 'default',
    validations: {
      required: true,
      minLength: 0,
      maxLength: 72,
    },
  },
  {
    element: 'input',
    name: 'comments',
    label: translate('comments'),
    labelStyle: {backgroundColor: colors?.background100},
    type: 'text',
    defaultValue: def?.comments?.value || '',
    placeholder: translate('comments'),
    returnKeyType: 'next',
    keyboardType: 'default',
    validations: {
      required: false,
      minLength: 0,
      maxLength: 72,
    },
  },
  {
    element: 'input',
    name: 'amount',
    label: translate('amount'),
    labelStyle: {backgroundColor: colors?.background100},
    type: 'text',
    defaultValue: def?.amount?.value || '',
    placeholder: translate('amount'),
    returnKeyType: 'next',
    keyboardType: 'numeric',
    validations: {
      required: true,
      minLength: 0,
      maxLength: 72,
    },
  },
  {
    element: 'date',
    name: 'date',
    label: translate('date'),
    labelStyle: {backgroundColor: colors?.background100},
    defaultValue: def ? def.date : '',
    placeholder: translate('date'),
    validations: {
      required: true,
    },
  },
]

export const receiverForm = (translate: any, def: any, colors: any = {}) => [
  {
    element: 'input',
    name: 'receiver_name',
    label: translate('receiver_name_optional'),
    labelStyle: {backgroundColor: colors?.background100},
    type: 'text',
    defaultValue: def?.receiver_name?.value || '',
    placeholder: translate('receiver_name'),
    returnKeyType: 'next',
    keyboardType: 'default',
    validations: {
      required: false,
      minLength: 0,
      maxLength: 72,
    },
  },
  {
    element: 'input',
    name: 'phonenumber',
    label: translate('phonenumber_optional'),
    labelStyle: {backgroundColor: colors?.background100},
    type: 'text',
    defaultValue: def?.phonenumber?.value || '',
    placeholder: translate('phonenumber'),
    returnKeyType: 'next',
    keyboardType: 'default',
    validations: {
      required: false,
      minLength: 0,
      maxLength: 72,
    },
  },
  {
    element: 'input',
    name: 'email',
    label: translate('email_optional'),
    labelStyle: {backgroundColor: colors?.background100},
    type: 'text',
    defaultValue: def?.email?.value || '',
    placeholder: translate('email'),
    returnKeyType: 'next',
    keyboardType: 'default',
    validations: {
      required: false,
      minLength: 0,
      maxLength: 72,
    },
  },
]
