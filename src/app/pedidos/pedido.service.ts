import { Injectable } from '@angular/core';
import { Order } from './pedido.model';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private readonly ORDERS_STORAGE_KEY = 'meus_pedidos';

  constructor() { }

  private getOrdersFromLocalStorage(): Order[] {
    const ordersJson = localStorage.getItem(this.ORDERS_STORAGE_KEY);
    // Parse order dates correctly as they are stored as strings
    const orders = ordersJson ? JSON.parse(ordersJson) : [];
    return orders.map((order: Order) => ({
      ...order,
      dataPedido: new Date(order.dataPedido) // Convert date string back to Date object
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
