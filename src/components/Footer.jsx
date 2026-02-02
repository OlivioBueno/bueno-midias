'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Mail, MapPin, Instagram, Linkedin, ArrowUp } from 'lucide-react'

const whatsappLink = 'https://wa.me/5511969107843?text=Olá! Vim pelo site e gostaria de falar com um consultor.'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer id="contato" className="relative bg-dark-800 border-t border-dark-600">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault()
                scrollToTop()
              }}
              className="inline-block mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl font-bold">
                <span className="text-white">Bueno</span>
                <span className="gradient-text"> Mídias</span>
              </span>
            </motion.a>

            <p className="text-gray-400 mb-6 max-w-md">
              Transformamos dados em escala e tráfego em lucro. Estratégias de marketing digital
              com a precisão da tecnologia e a criatividade que converte.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-dark-700 border border-dark-600 text-gray-400 hover:text-cyber-primary hover:border-cyber-primary/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle size={18} />
              </motion.a>
              <motion.a
                href="https://instagram.com/buenomidias"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-dark-700 border border-dark-600 text-gray-400 hover:text-cyber-secondary hover:border-cyber-secondary/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/company/buenomidias"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-dark-700 border border-dark-600 text-gray-400 hover:text-cyber-accent hover:border-cyber-accent/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={18} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {[
                { name: 'Início', href: '#inicio' },
                { name: 'Sobre', href: '#sobre' },
                { name: 'Números', href: '#numeros' },
                { name: 'Serviços', href: '#servicos' },
              ].map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="text-gray-400 hover:text-cyber-primary transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contato</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-400 hover:text-cyber-primary transition-colors"
                >
                  <MessageCircle size={18} className="flex-shrink-0" />
                  <span>+55 11 96910-7843</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@buenomidias.com.br"
                  className="flex items-center space-x-3 text-gray-400 hover:text-cyber-primary transition-colors"
                >
                  <Mail size={18} className="flex-shrink-0" />
                  <span>contato@buenomidias.com.br</span>
                </a>
              </li>
              <li>
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin size={18} className="flex-shrink-0" />
                  <span>São Paulo, Brasil</span>
                </div>
              </li>
            </ul>

            {/* CTA Button */}
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyber-primary to-cyber-secondary px-5 py-2.5 rounded-full text-sm font-semibold text-dark-900 mt-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={16} />
              <span>Falar no WhatsApp</span>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} Bueno Mídias. Todos os direitos reservados.
            </p>

            <motion.button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-gray-400 hover:text-cyber-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              <span className="text-sm">Voltar ao topo</span>
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center bg-green-500 rounded-full shadow-lg shadow-green-500/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <MessageCircle size={26} className="text-white" />
      </motion.a>
    </footer>
  )
}
