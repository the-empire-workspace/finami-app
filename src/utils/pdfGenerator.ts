import PDFGenerate, {Options} from 'react-native-html-to-pdf'

const PDFGenerator = async (html: string, name: string, directory: string) => {
  let options: Options = {
    html: html,
    fileName: name,
    directory: directory,
    height: 595,
    width: 842,
  }

  let file = await PDFGenerate.convert(options)
  return file
}

export default PDFGenerator
