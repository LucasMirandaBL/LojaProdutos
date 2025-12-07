import { Injectable } from '@angular/core';
import { Order } from './pedido.model';
import { v4 as uuidv4 } from 'uuid'; 

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private readonly ORDERS_STORAGE_KEY = 'meus_pedidos';

  constructor() { }

  private getOrdersFromLocalStorage(): Order[] {
    const ordersJson = localStorage.getItem(this.ORDERS_STORAGE_KEY);
    
    const orders = ordersJson ? JSON.parse(ordersJson) : [];
    return orders.map((order: Order) => ({
      ...order,
      dataPedido: new Date(order.dataPedido) 
    }));
  }

  private saveOrdersToLocalStorage(orders: Order[]): void {
    localStorage.setItem(this.ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }

  getPedidos(): Order[] {
    return this.getOrdersFromLocalStorage();
  }

  fazerPedido(novoPedido: Omit<Order, 'id' | 'dataPedido'>): Order {
    const orders = this.getOrdersFromLocalStorage();
    const pedidoCompleto: Order = {
      ...novoPedido,
      id: uuidv4(),
      dataPedido: new Date()
    };
    orders.push(pedidoCompleto);
    this.saveOrdersToLocalStorage(orders);
    return pedidoCompleto;
  }
}
