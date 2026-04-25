import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  router = inject(Router);

  email = 'sabbisetti.gowthamkumar@gmail.com';
  linkedIn = 'https://www.linkedin.com/in/sabbisettigowthamkumar/';

  openLinkedIn() {
    window.open(this.linkedIn, '_blank');
  }
  submitQuiz() {
    this.router.navigate(['/result']);
  }
}
