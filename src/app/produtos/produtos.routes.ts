import { Routes } from '@angular/router';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { ProdutoFormularioComponent } from './produto-formulario/produto-formulario.component';

export const PRODUTOS_ROUTES: Routes = [
  { path: '', component: ListaProdutosComponent },
  { path: 'novo', component: ProdutoFormularioComponent },
  { path: 'editar/:id', component: ProdutoFormularioComponent },
];
