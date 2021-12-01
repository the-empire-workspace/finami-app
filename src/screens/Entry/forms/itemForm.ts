import { styles } from '../styles'

const itemForm = (color: any, translate: any) => [
  {
    element: 'input',
    name: 'name',
    label: null,
    type: 'text',
    defaultValue: '',
    keyboardType: 'default',
    placeholder: translate('name'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: { ...styles.input, color: color },
    validations: {
      required: true,
      minLength: 4,
      maxLength: 72,
    },
  },
  {
    element: 'input',
    name: 'description',
    label: null,
    type: 'text',
    style: { ...styles.input, color: color },
    defaultValue: '',
    placeholderTextColor: color,
    keyboardType: 'default',
    placeholder: translate('description'),
    returnKeyType: 'go',
    validations: {
      required: true,
      minLength: 4,
      maxLength: 72,
    },
  },
  {
    element: 'date',
    name: 'payment_date',
    label: null,
    style: { ...styles.input, color: color },
    defaultValue: '',
    placeholder: translate('payment_date'),
    validations: {
      required: true,
      minLength: 4,
      maxLength: 72,
    },
  },
  {
    element: 'select',
    name: 'currency',
    type: 'select',
    defaultValue: '',
    placeholder: 'Moneda Predeterminada',
    placeholderTextColor: color,
    style: { ...styles.input, color: color },
    itemStyle: { ...styles.input, color: color },
    values: [
      {
        value: 'usd',
        label: 'USD',
      },
      {
        value: 'eur',
        label: 'EUR',
      },
      {
        value: 'btc',
        label: 'Bitcoin',
      },
    ],
    validations: {
      required: true,
    },
  },
  {
    element: 'input',
    name: 'amount',
    label: null,
    type: 'number',
    defaultValue: '',
    keyboardType: 'numeric',
    placeholder: translate('amount'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: { ...styles.input, color: color },
    validations: {
      required: true,
      minLength: 1,
      maxLength: 72,
    },
  },
]

export default itemForm;