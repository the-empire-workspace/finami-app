export const accountForm = (
  translate: any,
  def: any,
  accounts: any = [],
  colors: any = {},
) => [
  {
    element: 'select',
    name: 'account',
    label: translate('account'),
    labelStyle: {backgroundColor: colors?.background100},
    type: 'text',
    defaultValue: String(def?.account?.value) || '',
    keyboardType: 'default',
    placeholder: translate('account'),
    returnKeyType: 'go',
    values: [...(accounts || [])]?.map((account: any) => ({
      label: `${account?.account_name}`,
      value: String(account?.id),
    })),
    validations: {
      required: true,
      minLength: 0,
      maxLength: 72,
    },
  },
]

export const egressForm = (translate: any, def: any, colors: any = {}) => [
  {
    element: 'input',
    name: 'concept',
    label: translate('concept'),
    labelStyle: {backgroundColor: colors?.background100},
    type: 'text',
    defaultValue: def?.concept?.value || '',
    placeholder: translate('concept'),
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
    name: 'comment',
    label: translate('comments'),
    labelStyle: {backgroundColor: colors?.background100},
    type: 'text',
    defaultValue: def?.comment?.value || '',
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
    element: 'input',
    name: 'amount',
    label: translate('amount'),
    labelStyle: {backgroundColor: colors?.background100},
    type: 'text',
    defaultValue: def?.amount?.value || '',
    placeholder: translate('amount'),
    returnKeyType: 'next',
    keyboardType: 'numeric',
    validations: {
      required: true,
      minLength: 0,
      maxLength: 72,
    },
  },
  {
    element: 'multiple',
    label: translate('frequency'),
    labelStyle: {backgroundColor: colors?.background100},
    element_array: [
      {
        element: 'input',
        name: 'frecuency_time',
        label: null,
        type: 'number',
        defaultValue: def ? def.amount_frequency?.value : '',
        style: {
          borderRightWidth: 1,
          borderRadius: 0,
        },
        elementStyle: {
          width: '35%',
        },
        keyboardType: 'numeric',
        placeholder: translate('quantity'),
        returnKeyType: 'go',
        validations: {},
      },
      {
        element: 'select',
        name: 'frecuency_type',
        type: 'select',
        defaultValue: def ? def.frequency?.value : '',
        placeholder: translate('frequency'),
        elementStyle: {
          width: '65%',
        },
        values: [
          {
            value: 'days',
            label: translate('days'),
          },
          {
            value: 'weeks',
            label: translate('weeks'),
          },
          {
            value: 'months',
            label: translate('months'),
          },
        ],
        validations: {
          required: true,
        },
      },
    ],
  },
  {
    element: 'date',
    name: 'date',
    label: null,
    defaultValue: def ? def.date : '',
    placeholder: translate('date'),
    validations: {
      required: true,
    },
  },
]

export const categoryForm = (translate: any, def: any, colors: any = {}) => [
  {
    element: 'input',
    name: 'concept',
    label: translate('concept'),
    labelStyle: {backgroundColor: colors?.background100},
    type: 'text',
    defaultValue: def?.concept?.value || '',
    placeholder: translate('concept'),
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
    name: 'comment',
    label: translate('comments'),
    labelStyle: {backgroundColor: colors?.background100},
    type: 'text',
    defaultValue: def?.comment?.value || '',
    placeholder: translate('comments'),
    returnKeyType: 'next',
    keyboardType: 'default',
    validations: {
      required: false,
      minLength: 0,
      maxLength: 72,
    },
  },
]

export const receiverForm = (translate: any, def: any, colors: any = {}) => [
  {
    element: 'input',
    name: 'receiver_name',
    label: translate('issuer_name_optional'),
    labelStyle: {backgroundColor: colors?.background100},
    type: 'text',
    defaultValue: def?.receiver_name?.value || '',
    placeholder: translate('issuer_name'),
    returnKeyType: 'next',
    keyboardType: 'default',
    validations: {
      required: false,
      minLength: 0,
      maxLength: 72,
    },
  },
  {
    element: 'input',
    name: 'phonenumber',
    label: translate('phonenumber_optional'),
    labelStyle: {backgroundColor: colors?.background100},
    type: 'text',
    defaultValue: def?.phonenumber?.value || '',
    placeholder: translate('phonenumber'),
    returnKeyType: 'next',
    keyboardType: 'default',
    validations: {
      required: false,
      minLength: 0,
      maxLength: 72,
    },
  },
  {
    element: 'input',
    name: 'email',
    label: translate('email_optional'),
    labelStyle: {backgroundColor: colors?.background100},
    type: 'text',
    defaultValue: def?.email?.value || '',
    placeholder: translate('email'),
    returnKeyType: 'next',
    keyboardType: 'default',
    validations: {
      required: false,
      minLength: 0,
      maxLength: 72,
    },
  },
]
