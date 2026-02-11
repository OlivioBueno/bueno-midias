'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('pt')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Recuperar idioma salvo no localStorage
    const savedLanguage = typeof window !== 'undefined' 
      ? localStorage.getItem('language') || 'pt' 
      : 'pt'
    setLanguage(savedLanguage)
    setIsLoaded(true)
  }, [])

  const changeLanguage = (lang) => {
    setLanguage(lang)
    typeof window !== 'undefined' && localStorage.setItem('language', lang)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage deve ser usado dentro de LanguageProvider')
  }
  return context
}
