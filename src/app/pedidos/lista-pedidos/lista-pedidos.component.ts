import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { PedidoService } from '../pedido.service';
import { Order } from '../pedido.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-pedidos',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, RouterModule],
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaPedidosComponent implements OnInit {
  pedidos: Order[] = [];
  carregando: boolean = true;
  erro: string | null = null;
  totalGeralPedidos: number = 0; 

  constructor(
    private pedidoService: PedidoService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.carregarPedidos();
  }

  carregarPedidos(): void {
    this.carregando = true;
    this.erro = null;
    try {
      this.pedidos = this.pedidoService.getPedidos();
      this.totalGeralPedidos = this.pedidos.reduce((sum, pedido) => sum + pedido.valorTotal, 0);
      if (this.pedidos.length === 0) {
        this.erro = 'Nenhum pedido encontrado. Faça uma compra para ver seus pedidos aqui.';
      }
    } catch (e) {
      console.error('Erro ao carregar pedidos:', e);
      this.erro = 'Não foi possível carregar seus pedidos. Tente novamente mais tarde.';
    } finally {
      this.carregando = false;
      this.cdr.detectChanges(); 
    }
  }
}
