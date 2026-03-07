'use client'
import BarraNav from '@/components/BarraNav'
import Sobre from '@/components/Sobre'
import Rodape from '@/components/Rodape'
export default function Cultura() {
  return (
    <main className="min-h-screen bg-dark-900">
      <BarraNav />
      <div className="pt-20">
        <Sobre />
      </div>
      <Rodape />
    </main>
  )
}
