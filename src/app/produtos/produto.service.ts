import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './produto.model';
import { map, tap } from 'rxjs/operators';
import { ToastService } from '../toast/toast.service';

// Interface para a estrutura do produto retornada pela Fake Store API
interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient, private toastService: ToastService) { }

  private mapFakeStoreProductToProduto(fakeStoreProduct: FakeStoreProduct): Produto {
    return {
      id: fakeStoreProduct.id,
      nome: fakeStoreProduct.title,
      preco: fakeStoreProduct.price,
      descricao: fakeStoreProduct.description,
      categoria: fakeStoreProduct.category,
      imagem: fakeStoreProduct.image
    };
  }

  obterTodos(): Observable<Produto[]> {
    return this.http.get<FakeStoreProduct[]>(this.apiUrl).pipe(
      map(response => response.map(p => this.mapFakeStoreProductToProduto(p)))
    );
  }

  obterPorId(id: number): Observable<Produto | undefined> {
    return this.http.get<FakeStoreProduct>(`${this.apiUrl}/${id}`).pipe(
      map(p => this.mapFakeStoreProductToProduto(p))
    );
  }

  adicionar(produto: Produto): Observable<Produto> {
    const fakeStoreProductData = {
      title: produto.nome,
      price: produto.preco,
      description: produto.descricao,
      image: produto.imagem,
      category: produto.categoria
    };

    return this.http.post<FakeStoreProduct>(this.apiUrl, fakeStoreProductData).pipe(
      map(p => this.mapFakeStoreProductToProduto(p)),
      tap(() => this.toastService.show('Novo produto criado com sucesso!'))
    );
  }

  atualizar(produto: Produto): Observable<Produto> {
    const fakeStoreProductData = {
      title: produto.nome,
      price: produto.preco,
      description: produto.descricao,
      image: produto.imagem,
      category: produto.categoria
    };

    return this.http.put<FakeStoreProduct>(`${this.apiUrl}/${produto.id}`, fakeStoreProductData).pipe(
      map(p => this.mapFakeStoreProductToProduto(p))
    );
  }

  excluirProduto(id: number): Observable<void> {
    // Fake Store API não exclui dados, ele retorna o objeto excluído.
    // O tipo de retorno é void porque não estamos interessados no objeto retornado
    // e sim na conclusão da operação.
    return this.http.delete<FakeStoreProduct>(`${this.apiUrl}/${id}`).pipe(
      map(() => undefined) // Mapeia o retorno para void
    );
  }
}
