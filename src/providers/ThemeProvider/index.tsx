import React, {createContext, useState, useContext, FC, useEffect} from 'react'
import {Appearance} from 'react-native'
import {lightColors, darkColors} from '@theme'

export const ThemeContext = createContext({
  isDark: false,
  colors: lightColors,
  setScheme: (scheme: any) => {
    console.log(scheme)
  },
})

export const ThemeProvider: FC = (props: any) => {
  const colorScheme = Appearance.getColorScheme()
  const [isDark, setIsDark] = useState(colorScheme === 'dark')

  useEffect(() => {
    setIsDark(colorScheme === 'dark')
  }, [colorScheme])

  const defaultTheme = {
    isDark,
    colors: isDark ? darkColors : lightColors,
    setScheme: (scheme: any) => setIsDark(scheme === 'dark'),
  }

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
