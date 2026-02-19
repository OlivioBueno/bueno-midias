'use client'

import BarraNav from '@/components/BarraNav'
import Inicio from '@/components/Inicio'
import Sobre from '@/components/Sobre'
import Numeros from '@/components/Numeros'
import Servicos from '@/components/Servicos'
import Clientes from '@/components/Clientes'
import Rodape from '@/components/Rodape'

export default function Pagina() {
  return (
    <main className="min-h-screen bg-dark-900">
      <BarraNav />
      <Inicio />
      <Sobre />
      <Numeros />
      <Servicos />
      <Clientes />
      <Rodape />
    </main>
  )
}
