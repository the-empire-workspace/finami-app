import {Appearance} from 'react-native'
import React, {createContext, useState, useContext, FC, useEffect} from 'react'
import {Appearance} from 'react-native'
import {lightColors, darkColors} from '@theme'

export const ThemeContext = createContext({
  isDark: false,
  colors: lightColors,
  setScheme: (scheme: any) => {
    debugLog(scheme)
  },
})

export const ThemeProvider: FC<any> = (props: any) => {
  const [isDark, setIsDark] = useState(Appearance.getColorScheme() === 'dark')

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setIsDark(colorScheme === 'dark')
    })

    return () => {
      subscription.remove()
    }
  }, [])

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
