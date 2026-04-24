import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideMarkdown } from 'ngx-markdown';
import { UnloadWarningService } from './core/services/unload-warning.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [provideMarkdown()],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  unload = inject(UnloadWarningService);

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeunload(event: BeforeUnloadEvent) {
    if (this.unload.shouldWarn()) {
      event.preventDefault();
      event.returnValue = '';
    }
  }
}
