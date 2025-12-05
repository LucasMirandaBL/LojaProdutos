import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../carrinho.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-carrinho-contador',
  standalone: true,
  imports: [CommonModule, RouterModule], // Add RouterModule here
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
  changeDetection: ChangeDetectionStrategy.OnPush, // Use OnPush for performance
  styleUrls: ['./carrinho-contador.component.scss'] // No specific styles for now
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
    // Force initial change detection to render cart item count
    this.cdr.detectChanges();
  }
}