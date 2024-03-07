import { getLanguage, translate } from "./translate"

export const buildTable = ({ type, from_date, to_date, headers, values, entries, name }: any) => {

  const language = getLanguage()

  let table = `
  <div style="width: 100%">
  <div style="width: 100%;margin: 0 auto">
  <div style="margin-bottom: 10px;padding: 10px;box-sizing: border-box; width: 100%;display: flex;justify-content: space-between;align-items: center;background-color:#1E2A34">
  <h1 style="font-size: 26px;line-height: 1.4;text-align: center;color: #fff">${translate(type)}${name? ` - ${name}` : ''}</h1>
  <h2 style="font-size: 18px;line-height: 1.4;text-align: center;color: #fff">${translate('from')} ${new Date(from_date).toLocaleDateString(
    language === 'es' ? 'es-VE' : 'en-US',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  )} ${translate('to')} ${new Date(to_date).toLocaleDateString(
    language === 'es' ? 'es-VE' : 'en-US',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  )}</h2>
  </div>
  <table style="width: 100%;border-collapse: collapse; border-radius:10px;margin: 0 auto">
    <thead>
      <tr>
      ${headers.map((header: any) => {
    return `<th style="font-size: 18px;line-height: 1.4;text-align: center;width: 20%;background-color:#1E2A34;color: #fff">${translate(header)}</th>`
  }).join('')}
      </tr>
    </thead>
    <tbody>`

  table += entries.map((movement: any, index: number) => {
    return `<tr>
    ${values.map((value: any) => {
      return `<td style="text-align: center;width: 20%;background-color: ${index % 2 === 0 ? '#F0F0F2' : '#B1C7D8'};color: #121E28; font-size: 15px">${movement[value]}</td>`
    }).join('')}
    </tr>`
  }).join('')

  table += `</tbody>
  </table>
  </div>
  </div>`
  
  return table
}