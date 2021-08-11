import { styles } from "./styles";

export const registerForm = (color: any, translate: any) => [
  {
    element: 'input',
    name: 'name',
    label: null,
    type: 'text',
    defaultValue: '',
    keyboardType: 'default',
    placeholder: translate('name_lastname'),
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
    name: 'profession',
    label: null,
    type: 'text',
    style: { ...styles.input, color: color },
    defaultValue: '',
    placeholderTextColor: color,
    keyboardType: 'default',
    placeholder: translate('job'),
    returnKeyType: 'go',
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
        label: 'USD'
      },
      {
        value: 'eur',
        label: 'EUR'
      },
      {
        value: 'btc',
        label: 'Bitcoin'
      },
    ],
    validations: {
      required: true,
    }
  },
]
