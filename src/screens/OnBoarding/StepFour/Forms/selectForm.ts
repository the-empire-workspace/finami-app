import { styles } from '../styles'

export const selectForm = (color: any, translate: any, def: any, background?: any) => [
{
    element: 'select',
    name: 'account_type',
    label: translate('account_type'),
    labelStyle: background ? { ...styles.label, backgroundColor: background } : { ...styles.label },
    type: 'text',
    //defaultValue: def?.currenciesFormatValues || [],
    keyboardType: 'default',
    placeholder: translate('account_type'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: { ...styles.input, color: color, borderColor: color },
    values: [ {
      label: translate('cash'),
      value: 'cash',
    },
    {
      label: translate('bank'),
      value: 'bank',
    },
    {
      label: translate('wallet'),
      value: 'wallet',
    },],
    validations: {
      required: true,
    },
  },
]
function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}

