import { styles } from '../styles'
export const WalletForm = (color: any, translate: any, def: any, background?: any) => [
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
]
function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}
