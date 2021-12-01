import React, { FC, useState } from 'react'
import { Switch, Text, View } from 'react-native'
import { useTheme } from '@providers'
import { styles } from './styles'
import { Button, DynamicForm, Avatar, BackHandler } from '@components'
import { itemForm, categoryForm } from './forms'
import { translate } from '@utils'
import { useDispatch } from 'react-redux'

const Entry: FC = () => {
  const { colors } = useTheme()

  const dispatch = useDispatch()

  const [image, setImage] = useState(null)
  const [form, setForm] = useState([{}, false])
  const [itemView, setItemView] = useState(true)

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <BackHandler />
      <Avatar actionAvatar={setImage} />
      <View style={styles.switchContainer}>
        <Text style={[styles.switchText, { color: colors.text }]}>{translate('categories')}</Text>
        <Switch
          trackColor={{ true: colors.text, false: colors.text }}
          thumbColor={itemView ? colors.secundary : colors.secundary}
          ios_backgroundColor={colors.text}
          onValueChange={() => setItemView((prev) => !prev)}
          value={itemView}
        />
        <Text style={[styles.switchText, { color: colors.text }]}>{translate('items')}</Text>
      </View>
      <View style={styles.formContainer}>
        <DynamicForm
          formData={itemView ? itemForm(colors.secundaryText, translate) : categoryForm(colors.secundaryText, translate)}
          returnData={(data: any) => {
            setForm(data)
          }}
        />
      </View>
      <View style={styles.button}>
        <Button
          text={translate('create_entry')}
          disabled={!form[1] && image}
        />
      </View>
    </View>
  )
}

export default Entry
