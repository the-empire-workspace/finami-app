export const deleteForm = (translate: any, def: any, colors: any) => [
  {
    element: 'input',
    name: 'username',
    label: translate('username'),
    labelStyle: {backgroundColor: colors.background100},
    type: 'text',
    defaultValue: def?.username?.value || '',
    placeholder: translate('username'),
    returnKeyType: 'next',
    keyboardType: 'default',
    validations: {
      required: true,
      minLength: 0,
      maxLength: 72,
    },
  },
]
