import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ContatoComponent {
  @ViewChild('contactForm') contactForm!: NgForm;

  constructor(private toastService: ToastService) {}

  onSubmit(): void {
 
    this.toastService.show('Mensagem enviada com sucesso! Entraremos em contato em breve.', {
      classname: 'bg-success text-light',
      delay: 5000
    });
    
    this.contactForm.reset();
  }
}
