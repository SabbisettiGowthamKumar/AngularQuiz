import { Component } from '@angular/core';
import { LandingHeaderComponent } from './components/landing-header/landing-header.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [LandingHeaderComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {}
