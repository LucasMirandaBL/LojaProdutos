import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast } from './toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts: Observable<Toast[]> = this.toastsSubject.asObservable();

  show(message: string, options: any = {}): void {
    const currentToasts = this.toastsSubject.value;
    const newToast: Toast = { message, ...options };
    this.toastsSubject.next([...currentToasts, newToast]);

    if (newToast.autohide !== false && newToast.delay !== 0) {
      setTimeout(() => this.remove(newToast), newToast.delay || 3000);
    }
  }

  remove(toastToRemove: Toast): void {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next(currentToasts.filter(toast => toast !== toastToRemove));
  }

  clear(): void {
    this.toastsSubject.next([]);
  }
}
