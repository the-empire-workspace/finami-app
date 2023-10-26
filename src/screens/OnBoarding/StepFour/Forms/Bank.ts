import { styles } from '../styles'
export const BankForm = (color: any, translate: any, def: any, background?: any, currencies?: any) => [
    {
      element: 'input',
      name: 'account_name',
      label: translate('account_name'),
      labelStyle: background ? { ...styles.label, backgroundColor: background } : { ...styles.label },
      type: 'text',
      defaultValue: def?.account_name || '',
      keyboardType: 'default',
      placeholder: translate('account_name'),
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
      element: 'input',
      name: 'organization',
      label: translate('organization_entity_optional'),
      labelStyle: background ? { ...styles.label, backgroundColor: background } : { ...styles.label },
      type: 'text',
      defaultValue: def?.organization || '',
      keyboardType: 'default',
      placeholder: translate('organization_entity_optional'),
      returnKeyType: 'go',
      placeholderTextColor: color,
      style: { ...styles.input, color: color, borderColor: color },
      validations: {
        minLength: 4,
        maxLength: 72,
      },
    },
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
      placeholderTextColor: color,
      style: { ...styles.input, color: color, borderColor: color },
      validations: {
        required: true,
        minLength: 6,
        maxLength: 72,
      },
    },
  ]
  export const BankForm2 = (color: any, translate: any, def: any, background?: any, currencies?: any) => [
    
  {
      element: 'select',
      name: 'account_currency',
      label: translate('account_currency'),
      labelStyle: background ? { ...styles.label, backgroundColor: background } : { ...styles.label },
      type: 'text',
      defaultValue: def?.account_currency || currencies?.[0]?.id || '',
      keyboardType: 'default',
      placeholder: translate('account_currency'),
      returnKeyType: 'go',
      placeholderTextColor: color,
      style: { ...styles.input, color: color, borderColor: color },
      values: currencies?.length
      ? [...currencies]?.map((currency: any) => ({
        label: `${currency?.name} (${currency?.symbol})`,
        value: String(currency?.id),
      }))
      : [
        {
          label: translate('none'),
          value: 'none',
        },
      ],
      validations: {
        required: true,
        minLength: 0,
        maxLength: 72,
      },
    }, 
    {
      element: 'input',
      name: 'available_balance',
      label: translate('available_balance'),
      labelStyle: background ? { ...styles.label, backgroundColor: background } : { ...styles.label },
      type: 'text',
      defaultValue: def?.available_balance || '',
      keyboardType: 'default',
      placeholder: translate('available_balance'),
      returnKeyType: 'go',
      placeholderTextColor: color,
      style: { ...styles.input, color: color, borderColor: color },
      validations: {
        required: true,
        minLength: 1,
        maxLength: 72,
      },
    },
  ]
function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}
