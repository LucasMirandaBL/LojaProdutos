import { Routes } from '@angular/router';


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
];
