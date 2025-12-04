import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarrinhoContadorComponent } from './carrinho/carrinho-contador/carrinho-contador.component';// Updated import path
import { ToastContainerComponent } from './toast/toast-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CarrinhoContadorComponent, ToastContainerComponent], // Add ToastContainerComponent here
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
