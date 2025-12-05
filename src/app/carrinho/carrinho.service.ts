import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Produto } from '../produtos/produto.model';
import { Cart, CartItem } from './carrinho.model';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private readonly CART_STORAGE_KEY = 'carrinho_de_compras';
  private _carrinhoSubject: BehaviorSubject<Cart>;
  public carrinho$: Observable<Cart>;

  constructor(private toastService: ToastService) {
    const initialCart = this.getCartFromLocalStorage();
    this._carrinhoSubject = new BehaviorSubject<Cart>(initialCart);
    this.carrinho$ = this._carrinhoSubject.asObservable();
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem(this.CART_STORAGE_KEY);
    return cartJson ? JSON.parse(cartJson) : [];
  }

  private saveCartToLocalStorage(cart: Cart): void {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(cart));
    this._carrinhoSubject.next(cart);
  }

  getCart(): Observable<Cart> {
    return this.carrinho$;
  }

  addToCart(produto: Produto): void {
    if (!produto || produto.preco === undefined || produto.preco < 0) {
      console.warn('Tentativa de adicionar produto inválido ou com preço negativo ao carrinho:', produto);
      return;
    }

    const currentCart = this._carrinhoSubject.value;
    const itemExistente = currentCart.find(item => item.produto.id === produto.id);

    let newCart: Cart;
    if (itemExistente) {
      newCart = currentCart.map(item =>
        item.produto.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
      );
    } else {
      newCart = [...currentCart, { produto, quantidade: 1 }];
    }
    this.saveCartToLocalStorage(newCart);
  }

  removeFromCart(produtoId: number): void {
    let currentCart = this._carrinhoSubject.value;
    currentCart = currentCart.filter(item => item.produto.id !== produtoId);
    this.saveCartToLocalStorage(currentCart);
    this.toastService.show('Item removido do carrinho.');
  }

  incrementQuantity(produtoId: number): void {
    let currentCart = this._carrinhoSubject.value;
    currentCart = currentCart.map(item =>
      item.produto.id === produtoId ? { ...item, quantidade: item.quantidade + 1 } : item
    );
    this.saveCartToLocalStorage(currentCart);
  }

  decrementQuantity(produtoId: number): void {
    let currentCart = this._carrinhoSubject.value;
    currentCart = currentCart.map(item =>
      item.produto.id === produtoId ? { ...item, quantidade: Math.max(1, item.quantidade - 1) } : item
    ).filter(item => item.quantidade > 0);

    this.saveCartToLocalStorage(currentCart);
  }

  getCartTotal(): Observable<number> {
    return this.carrinho$.pipe(
      map((cart: Cart) => cart.reduce((total: number, item: CartItem) => total + (item.produto.preco * item.quantidade), 0))
    );
  }

  getCartItemCount(): Observable<number> {
    return this.carrinho$.pipe(
      map((cart: Cart) => cart.reduce((count: number, item: CartItem) => count + item.quantidade, 0))
    );
  }

  clearCart(): void {
    this.saveCartToLocalStorage([]);
    this.toastService.show('Carrinho limpo com sucesso!');
  }

  get currentCartValue(): Cart {
    return this._carrinhoSubject.value;
  }
}
