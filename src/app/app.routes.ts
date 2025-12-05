import { Routes } from '@angular/router';
import { CarrinhoComponent } from './carrinho/carrinho.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'produtos',
    pathMatch: 'full'
  },
  {
    path: 'produtos',
    loadChildren: () => import('./produtos/produtos.routes').then(m => m.PRODUTOS_ROUTES)
  },
  {
    path: 'carrinho',
    component: CarrinhoComponent
  },
];
