import { Cart } from '../carrinho/carrinho.model';

export interface BuyerInfo {
  nomeCompleto: string;
  email: string;
}

export interface CardInfo {
  numeroCartao: string;
  nomeNoCartao: string;
  validade: string; 
  cvv: string;
}

export interface Order {
  id: string; 
  dataPedido: Date;
  comprador: BuyerInfo;
  cartao: CardInfo;
  itens: Cart;
  valorTotal: number;
}
