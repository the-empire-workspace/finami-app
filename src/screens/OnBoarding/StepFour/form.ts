export const mainForm = (
  translate: any,
  def: any,
  colors: any
) => [
    {
      element: 'select',
      name: 'account_type',
      label: translate('account_type'),
      labelStyle: { backgroundColor: colors.background100 },
      type: 'text',
      defaultValue: def?.account_type?.value || '',
      keyboardType: 'default',
      placeholder: translate('account_type_optional'),
      returnKeyType: 'go',
      values: [
        {
          label: translate('cash'),
          value: 'cash',
        },
        {
          label: translate('bank_account'),
          value: 'bank_account',
        },
      ],
      validations: {
        required: true,
        minLength: 0,
        maxLength: 72,
      },
    }
  ]

export const cashForm = (translate: any, def: any, currencies: any = [], colors: any) => [
  {
    element: 'input',
    name: 'account_name',
    label: translate('account_name'),
    labelStyle: { backgroundColor: colors.background100 },
    type: 'text',
    defaultValue: def?.account_name?.value || '',
    placeholder: translate('account_name'),
    returnKeyType: 'next',
    keyboardType: 'default',
    validations: {
      required: true,
      minLength: 0,
      maxLength: 72,
    },
  },
  {
    element: 'input',
    name: 'comments',
    label: translate('comments'),
    labelStyle: { backgroundColor: colors.background100 },
    type: 'text',
    defaultValue: def?.comments?.value || '',
    placeholder: translate('comments'),
    returnKeyType: 'next',
    keyboardType: 'default',
    validations: {
      required: false,
      minLength: 0,
      maxLength: 72,
    },
  },
  {
    element: 'select',
    name: 'account_currency',
    label: translate('currency_type'),
    labelStyle: { backgroundColor: colors.background100 },
    type: 'text',
    defaultValue: def?.account_type?.value || '',
    keyboardType: 'default',
    placeholder: translate('currency_type'),
    returnKeyType: 'go',
    values: [...currencies || []]?.map((currency: any) => ({
      label: `${currency?.name} (${currency?.symbol})`,
      value: String(currency?.id),
    })),
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
    labelStyle: { backgroundColor: colors.background100 },
    type: 'text',
    defaultValue: def?.available_balance?.value || '',
    placeholder: translate('available_balance'),
    returnKeyType: 'next',
    keyboardType: 'default',
    validations: {
      required: false,
      minLength: 0,
      maxLength: 72,
    },
  }
]


export const bankForm = (translate: any, def: any, currencies: any = [], colors: any) => [
  {
    element: 'input',
    name: 'account_name',
    label: translate('account_name'),
    labelStyle: { backgroundColor: colors.background100 },
    type: 'text',
    defaultValue: def?.account_name?.value || '',
    placeholder: translate('account_name'),
    returnKeyType: 'next',
    keyboardType: 'default',
    validations: {
      required: true,
      minLength: 0,
      maxLength: 72,
    },
  },
  {
    element: 'input',
    name: 'comments',
    label: translate('comments'),
    labelStyle: { backgroundColor: colors.background100 },
    type: 'text',
    defaultValue: def?.comments?.value || '',
    placeholder: translate('comments'),
    returnKeyType: 'next',
    keyboardType: 'default',
    validations: {
      minLength: 0,
      maxLength: 72,
    },
  },
  {
    element: 'input',
    name: 'organization',
    label: translate('bank_name'),
    labelStyle: { backgroundColor: colors.background100 },
    type: 'text',
    defaultValue: def?.organization?.value || '',
    placeholder: translate('bank_name'),
    returnKeyType: 'next',
    keyboardType: 'default',
    validations: {
      required: false,
      minLength: 0,
      maxLength: 72,
    },
  },
  {
    element: 'select',
    name: 'account_currency',
    label: translate('currency_type'),
    labelStyle: { backgroundColor: colors.background100 },
    type: 'text',
    defaultValue: def?.account_currency?.value || '',
    keyboardType: 'default',
    placeholder: translate('currency_type'),
    returnKeyType: 'next',
    values: [...currencies || []]?.map((currency: any) => ({
      label: `${currency?.name} (${currency?.symbol})`,
      value: String(currency?.id),
    })),
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
    labelStyle: { backgroundColor: colors.background100 },
    type: 'text',
    defaultValue: def?.available_balance?.value || '',
    placeholder: translate('available_balance'),
    returnKeyType: 'next',
    keyboardType: 'numeric',
    validations: {
      required: false,
      minLength: 0,
      maxLength: 72,
    },
  }
]