import React, { FC, useState } from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { BackHandler } from 'components'
import { useTheme } from 'providers'
import { ImagePicker, translate } from 'utils'
import PaperClip from '@assets/img/Paperclip.svg'
import { Button } from 'theme'
import { useNavigation } from '@react-navigation/native'
import RNFS from 'react-native-fs';
const Questions: FC = () => {
  const { colors } = useTheme()

  const [responses, setResponses] = useState<any>({ question_1: '', question_2: '', question_3: '', question_4: '' })
  const router: any = useNavigation()

  const question = [
    {
      title: translate('question_1'),
      type: 'number',
      value: 'question_1'
    },
    {
      title: translate('question_2'),
      type: 'number',
      value: 'question_2'
    },
    {
      title: translate('question_3'),
      type: 'number',
      value: 'question_3'
    },
    {
      title: translate('question_4'),
      type: 'number',
      value: 'question_4'
    },
    {
      title: translate('question_5'),
      type: 'text',
      value: 'question_5'
    },
    {
      title: translate('question_6'),
      type: 'file',
      value: 'question_6'
    }
  ]
  const numberArray: any = new Array(5).fill(1)

  const convertToBase64 = async (file: any) => {
    if (file) return await RNFS.readFile(file, 'base64')
  }

  const setFile = async (file: any) => {
    const newImage: any = await ImagePicker()
    if (!newImage.ok) return
    const { fileName, originalPath, height, width, type } = newImage?.assets[0]
    const base64 = await convertToBase64(originalPath)
    setResponses({ ...responses, [file]: { fileName, base64, height, width, type } })
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background100 }]}>
      <BackHandler title={translate('leave_your_comments')} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {question?.map((item, index) => (
          <View style={styles.questionContainer} key={index}>
            <Text style={[styles.smallStrongBody, { color: colors.typography }]}>{item?.title}</Text>
            <View style={styles.buttonContainer}>
              {item?.type === 'number' ? numberArray?.map((itemNumber: any, index: any) => {
                return (
                  <TouchableOpacity key={index} style={[styles.buttonSelection, { borderColor: colors.typography }, { backgroundColor: responses[item?.value] === index + 1 ? colors.typography : colors.background100 }]} onPress={() => setResponses({ ...responses, [item?.value]: index + 1 })}>
                    <Text style={[styles.body, { color: responses[item?.value] === index + 1 ? colors.background100 : colors.typography }]}>
                      {index + 1}
                    </Text>
                  </TouchableOpacity>
                )
              }) : item?.type === 'text' ? (
                <TextInput style={[styles.textInput, styles.body, { borderColor: colors.typography }]} placeholder={translate('suggestions')} onChange={(val: any) => setResponses({ ...responses, [item?.value]: val.nativeEvent.text })} editable numberOfLines={4} multiline={true} value={responses[item?.value]} />
              ) : (
                <TouchableOpacity style={[styles.fileSelection, { borderColor: colors.typography }]} onPress={() => setFile(item?.value)}>
                  <View style={[styles.iconContainer, { borderColor: colors.typography }]}>
                    <PaperClip width={26} height={26} />
                  </View>
                  <Text style={[styles.smallStrongBody, { color: colors.typography }]}>
                    {responses[item?.value]?.fileName || translate('upload_image')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={[styles.scrollContainer]}>
        <Button
          disabled={Object.keys(responses).reduce((prev: any, curr: any) => prev || !responses[curr], false)}
          text={translate('next')}
          onPress={() => {
            router.navigate('greetings', { responses })
          }}
        />
      </View>
    </View>
  )
}

export default Questions
