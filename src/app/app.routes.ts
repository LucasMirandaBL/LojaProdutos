import { Routes } from '@angular/router';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { ListaPedidosComponent } from './pedidos/lista-pedidos/lista-pedidos.component';
import { ContatoComponent } from './contato/contato.component';
import { LoginComponent } from './login/login.component';


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
  {
    path: 'pedidos',
    component: ListaPedidosComponent
  },
  {
    path: 'contato',
    component: ContatoComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
