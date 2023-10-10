import { styles } from './styles'

export const stepTwoForm = (
  color: any,
  translate: any,
  def: any,
  currencies: any = [{
    label: translate('none'),
    value: 'none',
  }],
) => [
    {
      element: 'input',
      name: 'account_name',
      label: null,
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
      label: null,
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
      name: 'account_number',
      label: null,
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
    {
      element: 'input',
      name: 'bank',
      label: null,
      type: 'text',
      defaultValue: def?.bank || '',
      keyboardType: 'default',
      placeholder: translate('bank_entity_optional'),
      returnKeyType: 'go',
      placeholderTextColor: color,
      style: { ...styles.input, color: color, borderColor: color },
      validations: {
        minLength: 4,
        maxLength: 72,
      },
    },
    {
      element: 'select',
      name: 'account_type',
      label: null,
      type: 'text',
      defaultValue: def?.account_type || '',
      keyboardType: 'default',
      placeholder: translate('account_type_optional'),
      returnKeyType: 'go',
      placeholderTextColor: color,
      style: { ...styles.input, color: color, borderColor: color },
      values: [
        {
          label: translate('none'),
          value: 'none',
        },
        {
          label: translate('savings'),
          value: 'savings',
        },
        {
          label: translate('checking'),
          value: 'checking',
        }
      ],
      validations: {
        required: true,
        minLength: 0,
        maxLength: 72,
      },
    },
    {
      element: 'select',
      name: 'account_currency',
      label: null,
      type: 'text',
      defaultValue: def?.account_currency || '',
      keyboardType: 'default',
      placeholder: translate('account_currency'),
      returnKeyType: 'go',
      placeholderTextColor: color,
      style: { ...styles.input, color: color, borderColor: color },
      values: (currencies?.length) ? [...currencies]?.map((currency: any) => ({
        label: `${currency?.name} (${currency?.symbol})`,
        value: String(currency?.id)
      })) : [
        {
          label: translate('none'),
          value: 'none',
        }
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
      label: null,
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