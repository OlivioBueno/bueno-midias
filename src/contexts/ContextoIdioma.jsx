'use client'
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
const ContextoIdioma = createContext()
export function ProvedorIdioma({ children }) {
  const [idioma, setIdioma] = useState('pt')
  const [carregado, setCarregado] = useState(false)
  useEffect(() => {
    const idiomaSalvo = typeof window !== 'undefined' ? localStorage.getItem('language') || 'pt' : 'pt'
    setIdioma(idiomaSalvo)
    setCarregado(true)
  }, [])
  const mudarIdioma = useCallback((lang) => {
    setIdioma(lang)
    typeof window !== 'undefined' && localStorage.setItem('language', lang)
  }, [])
  const valor = useMemo(() => ({ idioma, mudarIdioma, carregado }), [idioma, mudarIdioma, carregado])
  return <ContextoIdioma.Provider value={valor}>{children}</ContextoIdioma.Provider>
}
export function useIdioma() {
  const contexto = useContext(ContextoIdioma)
  if (!contexto) throw new Error('useIdioma deve ser usado dentro de ProvedorIdioma')
  return contexto
}
