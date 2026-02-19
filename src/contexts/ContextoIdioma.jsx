'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const ContextoIdioma = createContext()

export function ProvedorIdioma({ children }) {
  const [idioma, setIdioma] = useState('pt')
  const [carregado, setCarregado] = useState(false)

  useEffect(() => {
    // Recuperar idioma salvo no localStorage
    const idiomaSalvo = typeof window !== 'undefined'
      ? localStorage.getItem('language') || 'pt'
      : 'pt'
    setIdioma(idiomaSalvo)
    setCarregado(true)
  }, [])

  const mudarIdioma = (lang) => {
    setIdioma(lang)
    typeof window !== 'undefined' && localStorage.setItem('language', lang)
  }

  return (
    <ContextoIdioma.Provider value={{ idioma, mudarIdioma, carregado }}>
      {children}
    </ContextoIdioma.Provider>
  )
}

export function useIdioma() {
  const contexto = useContext(ContextoIdioma)
  if (!contexto) {
    throw new Error('useIdioma deve ser usado dentro de ProvedorIdioma')
  }
  return contexto
}
