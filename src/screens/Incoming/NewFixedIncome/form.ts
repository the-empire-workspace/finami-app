import {styles} from './styles'

export const NewEntryForm = (color: any, translate: any, colors: any) => [
  {
    element: 'input',
    name: 'payment_concept',
    label: translate('payment_concept'),
    labelStyle: {backgroundColor: colors.background100},
    type: 'text',
    keyboardType: 'default',
    placeholder: translate('payment_concept'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: {...styles.input, color: color, borderColor: color},
    validations: {
      required: true,
      minLength: 4,
      maxLength: 72,
    },
  },
  {
    element: 'input',
    name: 'comment',
    label: translate('comment'),
    labelStyle: {backgroundColor: colors.background100},
    type: 'text',
    keyboardType: 'default',
    placeholder: translate('comment'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: {...styles.input, color: color, borderColor: color},
    validations: {
      required: false,
      minLength: 4,
      maxLength: 72,
    },
    multiline: true,
    numberOfLines: 3,
  },
  {
    element: 'input',
    name: 'amount',
    label: translate('amount'),
    labelStyle: {backgroundColor: colors.background100},
    type: 'text',
    keyboardType: 'number-pad',
    placeholder: '00',
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: {...styles.input, color: color, borderColor: color},
    validations: {
      required: true,
      minLength: 1,
      maxLength: 72,
    },
  },

  {
    element: 'select',
    name: 'frecuency_type',
    label: translate('payment_frequency'),
    labelStyle: {backgroundColor: colors.background100},
    type: 'text',
    placeholder: translate('payment_frequency'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: {...styles.input, color: color, borderColor: color},
    values: [
      {
        label: translate('days'),
        value: 'days',
      },
      {
        label: translate('weeks'),
        value: 'weeks',
      },
      {
        label: translate('months'),
        value: 'months',
      },
      {
        label: translate('years'),
        value: 'years',
      },
    ],
    validations: {
      required: true,
    },
  },
  {
    element: 'input',
    name: 'frecuency_time',
    label: translate('time'),
    labelStyle: {backgroundColor: colors.background100},
    type: 'text',
    keyboardType: 'number-pad',
    defaultValue: '1',
    placeholder: '-',
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: {...styles.input, color: color, borderColor: color},
    validations: {
      required: true,
      minLength: 1,
      maxLength: 72,
    },
  },
  {
    element: 'date',
    name: 'date',
    label: translate('next_entry_date'),
    labelStyle: {backgroundColor: colors.background100},
    type: 'date',
    keyboardType: 'default',
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: {...styles.input, color: color, borderColor: color},
    validations: {
      required: true,
    },
  },
  {
    element: 'input',
    name: 'emissor',
    label: translate('emissor'),
    labelStyle: {backgroundColor: colors.background100},
    type: 'text',
    keyboardType: 'default',
    placeholder: translate('emissor'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: {...styles.input, color: color, borderColor: color},
    validations: {
      required: false,
      minLength: 4,
      maxLength: 72,
    },
  },
  {
    element: 'input',
    name: 'phone',
    label: translate('emissor_phone'),
    labelStyle: {backgroundColor: colors.background100},
    type: 'text',
    keyboardType: 'number-pad',
    placeholder: '+58 414 888 22 22',
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: {...styles.input, color: color, borderColor: color},
    validations: {
      required: false,
      minLength: 12,
      maxLength: 12,
    },
  },
  {
    element: 'input',
    name: 'email',
    label: translate('emissor_email'),
    labelStyle: {backgroundColor: colors.background100},
    type: 'text',
    placeholder: 'example@mail.com',
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: {...styles.input, color: color, borderColor: color},
    validations: {
      required: false,
      minLength: 5,
      maxLength: 20,
    },
  },
]
