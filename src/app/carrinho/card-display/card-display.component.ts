import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.scss']
})
export class CardDisplayComponent implements OnChanges {
  @Input() cardNumber: string = '';
  @Input() cardHolderName: string = '';
  @Input() expiryMonth: string | number = '';
  @Input() expiryYear: string | number = '';

  formattedCardNumber: string = '#### #### #### ####';
  formattedExpiry: string = 'MM/AA';
  formattedCardHolder: string = 'NOME NO CARTÃO';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cardNumber']) {
      this.updateCardNumber(changes['cardNumber'].currentValue);
    }
    if (changes['cardHolderName']) {
      this.updateCardHolderName(changes['cardHolderName'].currentValue);
    }
    if (changes['expiryMonth'] || changes['expiryYear']) {
      this.updateExpiry(changes['expiryMonth']?.currentValue, changes['expiryYear']?.currentValue);
    }
  }

  private updateCardNumber(num: string): void {
    if (num) {
      const cleanNum = num.replace(/\D/g, ''); // Remove non-digits
      let formatted = '';
      for (let i = 0; i < 16; i++) {
        if (i > 0 && i % 4 === 0) {
          formatted += ' ';
        }
        formatted += cleanNum[i] || '#';
      }
      this.formattedCardNumber = formatted;
    } else {
      this.formattedCardNumber = '#### #### #### ####';
    }
  }

  private updateCardHolderName(name: string | null): void {
    this.formattedCardHolder = (name ?? '').toUpperCase() || 'NOME NO CARTÃO';
  }

  private updateExpiry(month: string | number | null, year: string | number | null): void {
    const mm = month ? (String(month).length === 1 ? '0' + month : month) : 'MM';
    const yy = year ? String(year).slice(2) : 'AA';
    this.formattedExpiry = `${mm}/${yy}`;
  }
}
