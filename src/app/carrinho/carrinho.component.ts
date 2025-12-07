import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CarrinhoService } from './carrinho.service';
import { CartItem } from './carrinho.model';
import { Observable } from 'rxjs';
import { RouterModule, Router } from '@angular/router';
import { PedidoService } from '../pedidos/pedido.service';
import { Order, BuyerInfo, CardInfo } from '../pedidos/pedido.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CardDisplayComponent } from './card-display/card-display.component'; 

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, TitleCasePipe, RouterModule, ReactiveFormsModule, CardDisplayComponent], 
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarrinhoComponent implements OnInit {
  carrinhoItens$: Observable<CartItem[]>;
  totalCarrinho$: Observable<number>;
  itemCount$: Observable<number>;
  checkoutForm: FormGroup;
  meses: number[];
  anos: number[];
  private activeModal: NgbModalRef | undefined;

  @ViewChild('checkoutModalContent') checkoutModalContent!: ElementRef;
  @ViewChild('successModalContent') successModalContent!: ElementRef;

  constructor(
    private carrinhoService: CarrinhoService,
    private pedidoService: PedidoService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private modalService: NgbModal 
  ) {
    this.carrinhoItens$ = this.carrinhoService.getCart();
    this.totalCarrinho$ = this.carrinhoService.getCartTotal();
    this.totalCarrinho$.subscribe(total => console.log('Total do Carrinho (CarrinhoComponent):', total)); 
    this.itemCount$ = this.carrinhoService.getCartItemCount();

    this.checkoutForm = this.fb.group({
      nomeCompleto: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numeroCartao: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      nomeNoCartao: ['', Validators.required],
      mesValidade: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      anoValidade: ['', [Validators.required, Validators.min(new Date().getFullYear())]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
    });
    this.meses = Array.from({length: 12}, (_, i) => i + 1);
    const anoAtual = new Date().getFullYear();
    this.anos = Array.from({length: 10}, (_, i) => anoAtual + i);
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  removerItem(produtoId: number): void {
    this.carrinhoService.removeFromCart(produtoId);
    this.cdr.detectChanges();
  }

  incrementarQuantidade(produtoId: number): void {
    this.carrinhoService.incrementQuantity(produtoId);
    this.cdr.detectChanges();
  }

  decrementarQuantidade(produtoId: number): void {
    this.carrinhoService.decrementQuantity(produtoId);
    this.cdr.detectChanges();
  }

  limparCarrinho(): void {
    this.carrinhoService.clearCart();
    this.cdr.detectChanges();
    if (this.activeModal) { 
      this.activeModal.dismiss('Cart cleared');
    }
  }

  iniciarFinalizacaoCompra(): void {
    
    this.activeModal = this.modalService.open(this.checkoutModalContent, { size: 'lg', backdrop: 'static' });
  }

  finalizarCompra(): void {
    if (this.checkoutForm.valid) {
      const buyerInfo: BuyerInfo = {
        nomeCompleto: this.checkoutForm.get('nomeCompleto')?.value,
        email: this.checkoutForm.get('email')?.value,
      };
      const mes = this.checkoutForm.get('mesValidade')?.value;
      const ano = this.checkoutForm.get('anoValidade')?.value;
      const validadeFormatada = `${mes < 10 ? '0' + mes : mes}/${String(ano).slice(2)}`;

      const cardInfo: CardInfo = {
        numeroCartao: this.checkoutForm.get('numeroCartao')?.value,
        nomeNoCartao: this.checkoutForm.get('nomeNoCartao')?.value,
        validade: validadeFormatada,
        cvv: this.checkoutForm.get('cvv')?.value,
      };

      const currentCartItems = this.carrinhoService.currentCartValue;
      const currentTotal = currentCartItems.reduce((total, item) => total + (item.produto.preco * item.quantidade), 0);

      const newOrder: Omit<Order, 'id' | 'dataPedido'> = {
        comprador: buyerInfo,
        cartao: cardInfo,
        itens: currentCartItems,
        valorTotal: currentTotal,
      };
      this.pedidoService.fazerPedido(newOrder);
      this.carrinhoService.clearCart(); 

      if (this.activeModal) { 
        this.activeModal.close('Compra finalizada');
      }

      this.modalService.open(this.successModalContent, { ariaLabelledBy: 'modal-basic-title' }).result.then(() => {
        this.router.navigate(['/produtos']); 
      }, () => {
        this.router.navigate(['/produtos']); 
      });

      this.checkoutForm.reset(); 
      this.cdr.detectChanges(); 
    } else {
      this.checkoutForm.markAllAsTouched();
      
      this.cdr.detectChanges(); 
    }
  }

  cancelarFinalizacaoCompra(): void {
    if (this.activeModal) {
      this.activeModal.dismiss('Cancel click');
    }
    this.checkoutForm.reset(); 
    this.cdr.detectChanges(); 
  }
}