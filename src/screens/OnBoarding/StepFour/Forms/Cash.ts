import { styles } from '../styles'
export const CashForm = (color: any, translate: any, def: any, background?: any, currenciesFormatValues?: any) => [
  {
    element: 'input',
    name: 'account_number',
    label: translate('account_number'),
    labelStyle: background ? { ...styles.label, backgroundColor: background } : { ...styles.label },
    type: 'text',
    defaultValue: def?.account_number || '',
    keyboardType: 'default',
    placeholder: translate('account_number'),
    returnKeyType: 'go',
    placeholderTextColor: color.status.desactive,
    style: { ...styles.input, color: color, borderColor: color },
    validations: {
      required: true,
      minLength: 6,
      maxLength: 72,
    },
  },
  {
    element: 'input',
    name: 'account_comments',
    label: translate('comments_optional'),
    labelStyle: background ? { ...styles.label, backgroundColor: background } : { ...styles.label },
    type: 'text',
    defaultValue: def?.account_comments || '',
    keyboardType: 'default',
    placeholder: translate('comments_optional'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: { ...styles.input, color: color, borderColor: color },
    validations: {
      minLength: 0,
      maxLength: 72,
    },
  },
  {
    element: 'select',
    name: 'principal_currency',
    label: translate('principal_currency'),
    labelStyle: background ? { ...styles.label, backgroundColor: background } : { ...styles.label },
    type: 'text',
    defaultValue: def?.currenciesFormatValues || [],
    keyboardType: 'default',
    placeholder: translate('principal_currency'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: { ...styles.input, color: color, borderColor: color },
    values: currenciesFormatValues,
    validations: {
      required: true,
    },
  },
]
function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}
