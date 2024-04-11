import {Platform} from 'react-native'

export const calculatorForm = (translate: any, def: any, colors: any = {}) => [
  {
    element: 'input',
    name: 'amount',
    label: translate('amount'),
    labelStyle: {backgroundColor: colors?.background100},
    type: 'numeric',
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
    element: 'input',
    name: 'interest_percentage',
    label: translate('interest_percentage'),
    labelStyle: {backgroundColor: colors?.background100},
    type: 'numeric',
    defaultValue: def?.interest_percentage?.value || '',
    placeholder: translate('interest_percentage'),
    returnKeyType: 'next',
    keyboardType: 'numeric',
    validations: {
      required: true,
      minLength: 0,
      maxLength: 72,
    },
  },
  {
    element: 'input',
    name: 'time',
    label: translate('time'),
    labelStyle: {backgroundColor: colors?.background100},
    type: 'numeric',
    defaultValue: def?.time?.value || '',
    placeholder: translate('time'),
    returnKeyType: 'next',
    keyboardType: 'numeric',
    validations: {
      required: true,
      minLength: 0,
      maxLength: 72,
    },
  },
  {
    element: 'select',
    name: 'period',
    label: translate('period'),
    labelStyle: {backgroundColor: colors?.background100},
    type: 'text',
    defaultValue: String(def?.period?.value || 'day'),
    keyboardType: 'default',
    placeholder: translate('period'),
    returnKeyType: 'go',
    itemStyle: Platform.OS === 'ios' ? {color: colors.typography} : {},
    values: [
      {
        label: translate('day'),
        value: 'day',
      },
      {
        label: translate('month'),
        value: 'month',
      },
      {
        label: translate('trimester'),
        value: 'trimester',
      },
      {
        label: translate('semester'),
        value: 'semester',
      },
      {
        label: translate('years'),
        value: 'years',
      },
    ],
    validations: {
      required: true,
      minLength: 0,
      maxLength: 72,
    },
  },
]
