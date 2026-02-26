import { useIdioma } from '@/contexts/ContextoIdioma'
import pt from '@/translations/pt.json'
import en from '@/translations/en.json'
export function useTraducao() {
  const { idioma } = useIdioma()
  const traducoes = idioma === 'en' ? en : pt
  const t = (chave) => {
    const partes = chave.split('.')
    let valor = traducoes
    for (const parte of partes) {
      if (valor[parte] === undefined) return chave
      valor = valor[parte]
    }
    return valor
  }
  return { t, idioma }
}
