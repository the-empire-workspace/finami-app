import ImagePicker, { launchImageLibrary } from 'react-native-image-picker'

const getOptions = (options = {}) => {
  return {
    title: 'Select display image',
    cancelButtonTitle: 'Cancel',
    takePhotoButtonTitle: 'Take photo',
    chooseFromLibraryButtonTitle: 'Choose from library',
    durationLimit: 15,
    noData: true,
    quality: 0.8,

    storageOptions: {
      skipBackup: true,
      cameraRoll: true,
      path: 'images',
    },

    permissionDenied: {
      okTitle: "I'm sure",
      reTryTitle: 're-try',
      title: 'Permission denied',
      text: 'To be able to take pictures with your camera and choose images from your library.',
    },
    ...options,
  }
}

const call = (fn: any, opt: any) => {
  return new Promise((resolve, reject) => {
    fn.call(ImagePicker, opt, (res: any) => {
      if (res.error) return reject(res.error)
      if (res.didCancel) return resolve({ ok: false })
      resolve({ ...res, ok: true })
    })
  })
}

const openImagePicker = (options: any = {}) => {
  options = getOptions(options)
  return call(launchImageLibrary, options)
}

export default openImagePicker
