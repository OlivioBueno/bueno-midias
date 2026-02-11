'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Flag } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function LanguageSwitcher({ mobile = false }) {
  const { language, changeLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  if (mobile) {
    return (
      <div className="flex flex-col space-y-3">
        <button
          onClick={() => {
            changeLanguage('pt')
          }}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
            language === 'pt'
              ? 'bg-gradient-to-r from-cyber-primary to-cyber-secondary text-dark-900'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <span className="text-2xl">🇧🇷</span>
          <span className="font-medium">Português</span>
        </button>

        <button
          onClick={() => {
            changeLanguage('en')
          }}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
            language === 'en'
              ? 'bg-gradient-to-r from-cyber-primary to-cyber-secondary text-dark-900'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <span className="text-2xl">🇺🇸</span>
          <span className="font-medium">English</span>
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-dark-800 hover:bg-dark-700 text-gray-300 hover:text-white transition-all duration-300 font-semibold border border-dark-600 hover:border-cyber-primary/50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Mudar idioma"
      >
        {language === 'pt' ? '🇧🇷' : '🇺🇸'}
        <span className="text-sm">{language.toUpperCase()}</span>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15 }}
          className="absolute top-full mt-2 right-0 bg-dark-800 rounded-lg shadow-xl overflow-hidden border border-dark-600 z-50"
        >
          <button
            onClick={() => {
              changeLanguage('pt')
              setIsOpen(false)
            }}
            className={`w-full px-4 py-3 flex items-center gap-3 transition-all duration-200 ${
              language === 'pt'
                ? 'bg-dark-700 text-cyber-primary'
                : 'text-gray-300 hover:bg-dark-700 hover:text-white'
            }`}
          >
            <span className="text-2xl">🇧🇷</span>
            <span className="font-medium">Português</span>
            {language === 'pt' && <span className="ml-auto">✓</span>}
          </button>

          <button
            onClick={() => {
              changeLanguage('en')
              setIsOpen(false)
            }}
            className={`w-full px-4 py-3 flex items-center gap-3 transition-all duration-200 border-t border-dark-600 ${
              language === 'en'
                ? 'bg-dark-700 text-cyber-primary'
                : 'text-gray-300 hover:bg-dark-700 hover:text-white'
            }`}
          >
            <span className="text-2xl">🇺🇸</span>
            <span className="font-medium">English</span>
            {language === 'en' && <span className="ml-auto">✓</span>}
          </button>
        </motion.div>
      )}
    </div>
  )
}
