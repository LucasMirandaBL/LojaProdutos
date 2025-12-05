import { Produto } from '../produtos/produto.model';

export interface CartItem {
  produto: Produto;
  quantidade: number;
}

export type Cart = CartItem[];
