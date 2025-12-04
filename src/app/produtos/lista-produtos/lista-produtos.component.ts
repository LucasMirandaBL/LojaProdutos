import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProdutoService } from '../produto.service';
import { Produto } from '../produto.model';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { catchError, of, finalize } from 'rxjs';
import { CarrinhoService } from '../../carrinho/carrinho.service';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.scss']
})
export class ListaProdutosComponent implements OnInit {
  todosOsProdutos: Produto[] = [];
  produtos: Produto[] = [];
  carregando: boolean = true;
  erro: string | null = null;
  termoBusca: string = '';

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private carrinhoService: CarrinhoService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.carregando = true;
    this.erro = null;
    this.produtoService.obterTodos().pipe(
      catchError(err => {
        console.error('Erro ao carregar produtos:', err);
        this.erro = 'Não foi possível carregar os produtos. Tente novamente mais tarde.';
        return of([]);
      }),
      finalize(() => {
        this.carregando = false;
        this.cdr.detectChanges();
      })
    ).subscribe(produtos => {
      this.todosOsProdutos = produtos;
      this.produtos = produtos;
      this.cdr.detectChanges();
    });
  }

  buscarProdutos(): void {
    console.log('buscarProdutos() chamado. Termo de busca:', this.termoBusca);
    if (!this.termoBusca) {
      this.produtos = this.todosOsProdutos;
      console.log('Termo de busca vazio, mostrando todos os produtos:', this.produtos.length);
      this.cdr.detectChanges();
      return;
    }
    const termo = this.termoBusca.toLowerCase();
    this.produtos = this.todosOsProdutos.filter(produto =>
      produto.nome.toLowerCase().includes(termo) ||
      produto.categoria.toLowerCase().includes(termo)
    );
    console.log('Produtos filtrados:', this.produtos.length);
    this.cdr.detectChanges();
  }

  editarProduto(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/produtos/editar', id]);
    }
  }

  excluirProduto(id: number | undefined): void {
    if (id && confirm('Tem certeza que deseja excluir este produto?')) {
      this.carregando = true;
      this.erro = null;
      this.produtoService.excluirProduto(id).pipe(
        catchError(err => {
          console.error('Erro ao excluir produto:', err);
          this.erro = 'Não foi possível excluir o produto. Tente novamente mais tarde.';
          return of(undefined);
        }),
        finalize(() => {
          this.carregando = false;
          this.cdr.detectChanges();
        })
      ).subscribe(() => {
        this.carregarProdutos();
      });
    }
  }

  adicionarAoCarrinho(produto: Produto): void {
    this.carrinhoService.addToCart(produto);
    this.toastService.show(`"${produto.nome}" adicionado ao carrinho!`, {
      classname: 'bg-success text-light',
      delay: 3000,
      autohide: true,
      headertext: 'Item Adicionado'
    });
  }

  novoProduto(): void {
    this.router.navigate(['/produtos/novo']);
  }
}
