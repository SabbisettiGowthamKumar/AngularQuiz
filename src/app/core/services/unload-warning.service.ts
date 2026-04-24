import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UnloadWarningService {
  shouldWarn = signal(false);

  enable() {
    this.shouldWarn.set(true);
  }

  disable() {
    this.shouldWarn.set(false);
  }
}
