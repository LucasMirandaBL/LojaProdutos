export interface Produto {
  id?: number;
  nome: string; // Mapped from 'title'
  preco: number; // Mapped from 'price'
  descricao: string; // Mapped from 'description'
  categoria: string; // Mapped from 'category'
  imagem: string; // Mapped from 'image'
  // codigoBarras: string; // Removed, as it's not in Fake Store API
}