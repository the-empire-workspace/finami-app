
import React, { FC } from 'react'
import { useTheme } from 'providers'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { Props } from './interface'
import { translate } from 'utils'

const ModalStatus: FC<Props> = ({ elementData, onAccept, onClose }) => {

  const { colors } = useTheme()

  return (
    <Modal transparent animationType='slide' visible={!!elementData?.element} style={{ display: 'flex' }}>
      <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: '90%', height: 300, backgroundColor: colors.secondary, borderRadius: 10, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: 30, color: colors.text }}>{translate('change_status')} {elementData?.element?.name}</Text>
          <View style={{ alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', width: '100%', marginVertical: 40 }}>
            <TouchableOpacity onPress={onClose} style={{ backgroundColor: colors.unsuccess, paddingVertical: 10, paddingHorizontal: 30, borderRadius: 30 }}>
              <Text style={{ color: colors.text, fontSize: 20 }}>{translate('cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onAccept} style={{ backgroundColor: colors.success, paddingVertical: 10, paddingHorizontal: 30, borderRadius: 30 }}>
              <Text style={{ color: colors.text, fontSize: 20 }}>{translate('update')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ModalStatus