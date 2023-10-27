import { styles } from './styles'

export const NewEntryForm = (color: any, translate: any, colors: any) => [
  {
    element: 'input',
    name: 'income_concept',
    label: translate("income_concept"),
    labelStyle: { backgroundColor: colors.background100 },
    type: 'text',
    keyboardType: 'default',
    placeholder: translate('income_concept'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: { ...styles.input, color: color, borderColor: color },
    validations: {
      required: true,
      minLength: 4,
      maxLength: 72,
    },
  },
  {
    element: 'input',
    name: 'comment',
    label: translate("comment"),
    labelStyle: { backgroundColor: colors.background100 },
    type: 'text',
    keyboardType: 'default',
    placeholder: translate('comment'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: { ...styles.input, color: color, borderColor: color },
    validations: {
      required: true,
      minLength: 4,
      maxLength: 72,
    },
  },
  {
    element: 'input',
    name: 'amount',
    label: translate("amount"),
    labelStyle: { backgroundColor: colors.background100 },
    type: 'text',
    keyboardType: 'number-pad',
    placeholder: '00',
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: { ...styles.input, color: color, borderColor: color },
    validations: {
      required: true,
      minLength: 1,
      maxLength: 72,
    },
  },
  {
    element: 'select',
    name: 'urgency_level',
    label: translate('urgency_level'),
    labelStyle: { backgroundColor: colors.background100 },
    values: [
      {
        label: translate('low'),
        value: 'low',
      },
      {
        label: translate('medium'),
        value: 'medium',
      },
      {
        label: translate('high'),
        value: 'high',
      }
    ],
    validations: {
      required: true,
    },
  },
  {
    element: 'input',
    name: 'emissor',
    label: translate("emissor"),
    labelStyle: { backgroundColor: colors.background100 },
    type: 'text',
    keyboardType: 'default',
    placeholder: translate('emissor'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: { ...styles.input, color: color, borderColor: color },
    validations: {
      required: true,
      minLength: 4,
      maxLength: 72,
    },
  },
  {
    element: 'input',
    name: 'emissor_phone',
    label: translate("emissor_phone"),
    labelStyle: { backgroundColor: colors.background100 },
    type: 'text',
    keyboardType: 'phone-pad',
    placeholder: translate('emissor_phone'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: { ...styles.input, color: color, borderColor: color },
    validations: {
      required: true,
      minLength: 10,
      maxLength: 15,
    },
  },
  {
    element: 'input',
    name: 'emissor_email',
    label: translate("emissor_email"),
    labelStyle: { backgroundColor: colors.background100 },
    type: 'text',
    keyboardType: 'email-address',
    placeholder: translate('emissor_email'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: { ...styles.input, color: color, borderColor: color },
    validations: {
      required: true,
      minLength: 5,
      maxLength: 72,
    },
  },
  
]
