'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import SeletorIdioma from './SeletorIdioma'
import { useTraducao } from '@/hooks/useTraducao'

const linkWhatsapp = 'https://wa.me/5511969107843?text=Olá! Vim pelo site e gostaria de falar com um consultor.'

export default function BarraNav() {
  const { t } = useTraducao()
  const [paginaRolou, setPaginaRolou] = useState(false)
  const [menuMobileAberto, setMenuMobileAberto] = useState(false)

  const linksNavTraduzidos = [
    { nome: 'Início',          href: '#inicio' },
    { nome: t('nav.about'),    href: '#sobre' },
    { nome: 'Números',         href: '#numeros' },
    { nome: t('nav.services'), href: '#servicos' },
    { nome: t('nav.clients'),  href: '#clientes' },
    { nome: t('nav.contact'),  href: '/contato', ehPagina: true },
  ]

  useEffect(() => {
    const aoRolar = () => setPaginaRolou(window.scrollY > 50)
    window.addEventListener('scroll', aoRolar)
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  const rolarParaSecao = (href) => {
    setMenuMobileAberto(false)
    const elemento = document.querySelector(href)
    if (elemento) elemento.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          paginaRolou
            ? 'bg-dark-900/95 backdrop-blur-md border-b border-dark-600/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.a
              href="#inicio"
              onClick={(e) => { e.preventDefault(); rolarParaSecao('#inicio') }}
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl lg:text-2xl font-bold">
                <span className="text-white">Bueno</span>
                <span className="gradient-text"> Mídias</span>
              </span>
            </motion.a>

            {/* Menu Desktop */}
            <div className="hidden lg:flex items-center space-x-8">
              {linksNavTraduzidos.map((link) => (
                link.ehPagina ? (
                  <Link key={link.nome} href={link.href}>
                    <motion.span
                      className="text-gray-300 hover:text-cyber-primary transition-colors duration-300 text-sm font-medium cursor-pointer"
                      whileHover={{ y: -2 }}
                    >
                      {link.nome}
                    </motion.span>
                  </Link>
                ) : (
                  <motion.a
                    key={link.nome}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); rolarParaSecao(link.href) }}
                    className="text-gray-300 hover:text-cyber-primary transition-colors duration-300 text-sm font-medium"
                    whileHover={{ y: -2 }}
                  >
                    {link.nome}
                  </motion.a>
                )
              ))}
            </div>

            {/* Ações Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <SeletorIdioma />
              <motion.a
                href={linkWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gradient-to-r from-cyber-primary to-cyber-secondary px-5 py-2.5 rounded-full text-sm font-semibold text-dark-900 btn-shine"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle size={18} />
                <span>Falar com Consultor</span>
              </motion.a>
            </div>

            {/* Botão Menu Mobile */}
            <button
              onClick={() => setMenuMobileAberto(!menuMobileAberto)}
              className="lg:hidden p-2 text-gray-300 hover:text-white"
            >
              {menuMobileAberto ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Menu Mobile */}
      <AnimatePresence>
        {menuMobileAberto && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-dark-900/98 backdrop-blur-lg pt-20">
              <div className="flex flex-col items-center space-y-6 p-8">
                {linksNavTraduzidos.map((link, indice) => (
                  link.ehPagina ? (
                    <Link key={link.nome} href={link.href} onClick={() => setMenuMobileAberto(false)}>
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: indice * 0.1 }}
                        className="text-xl text-gray-300 hover:text-cyber-primary transition-colors cursor-pointer"
                      >
                        {link.nome}
                      </motion.span>
                    </Link>
                  ) : (
                    <motion.a
                      key={link.nome}
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); rolarParaSecao(link.href) }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: indice * 0.1 }}
                      className="text-xl text-gray-300 hover:text-cyber-primary transition-colors"
                    >
                      {link.nome}
                    </motion.a>
                  )
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="w-full border-t border-dark-600 pt-6 mt-4"
                >
                  <p className="text-gray-400 text-sm mb-3 text-center">Idioma</p>
                  <SeletorIdioma movel={true} />
                </motion.div>

                <motion.a
                  href={linkWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-cyber-primary to-cyber-secondary px-6 py-3 rounded-full text-dark-900 font-semibold mt-6"
                >
                  <MessageCircle size={20} />
                  <span>Falar com Consultor</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
