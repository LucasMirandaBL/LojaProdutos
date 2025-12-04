import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../produto.service';
import { Produto } from '../produto.model';
import { catchError, of, Observable, finalize } from 'rxjs';

@Component({
  selector: 'app-produto-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './produto-formulario.component.html',
  styleUrls: ['./produto-formulario.component.scss']
})
export class ProdutoFormularioComponent implements OnInit {
  produtoFormulario: FormGroup;
  editando: boolean = false;
  produtoId: number | null = null;
  carregando: boolean = false;
  erro: string | null = null;
  categorias: string[] = ['eletrônicos', 'joias', 'roupas masculinas', 'roupas femininas'];

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef 
  ) {
    this.produtoFormulario = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      preco: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      descricao: ['', Validators.required],
      categoria: ['', Validators.required],
      imagem: ['', [Validators.required, Validators.pattern('(https?://.*.(?:png|jpg|jpeg|gif|webp))')]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.editando = true;
        this.produtoId = +id;
        this.carregando = true;

        this.produtoService.obterPorId(this.produtoId).pipe(
          catchError(err => {
            console.error('Erro ao carregar produto:', err);
            this.erro = 'Não foi possível carregar o produto para edição. Tente novamente mais tarde.';
            return of(undefined);
          }),
          finalize(() => { 
            this.carregando = false;
            this.cdr.detectChanges();
          })
        ).subscribe(produto => {
          if (produto) {
            this.produtoFormulario.patchValue(produto);
            this.cdr.detectChanges();
          }
        });
      }
    });
  }

  salvarProduto(): void {
    if (this.produtoFormulario.valid) {
      this.carregando = true;
      this.erro = null;
      const produto: Produto = this.produtoFormulario.value;
      let operacao: Observable<Produto>;

      if (this.editando) {
        operacao = this.produtoService.atualizar(produto);
      } else {
        operacao = this.produtoService.adicionar(produto);
      }

      operacao.pipe(
        catchError(err => {
          console.error('Erro ao salvar produto:', err);
          this.erro = 'Não foi possível salvar o produto. Verifique os dados e tente novamente.';
          return of(produto);
        }),
        finalize(() => { // Add finalize block here for saving
          this.carregando = false;
          this.cdr.detectChanges(); // Force change detection
        })
      ).subscribe(() => {
        this.router.navigate(['/produtos']);
      });
    } else {
      this.produtoFormulario.markAllAsTouched();
      this.erro = 'Por favor, preencha todos os campos obrigatórios corretamente.';
    }
  }

  voltarParaLista(): void {
    this.router.navigate(['/produtos']);
  }
}