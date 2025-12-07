import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../carrinho.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-carrinho-contador',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  template: `
    <a routerLink="/carrinho" class="carrinho-badge-link">
      <i class="bi bi-cart"></i>

      <ng-container *ngIf="(itemCount$ | async) as count">
        <span *ngIf="count > 0" class="carrinho-badge">
          {{ count }}
        </span>
      </ng-container>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush, 
  styleUrls: ['./carrinho-contador.component.scss'] 
})
export class CarrinhoContadorComponent implements OnInit {
  itemCount$: Observable<number>;

  constructor(
    private carrinhoService: CarrinhoService,
    private cdr: ChangeDetectorRef
  ) {
    this.itemCount$ = this.carrinhoService.getCartItemCount();
  }

  ngOnInit(): void {
   
    this.cdr.detectChanges();
  }
}