import { Component } from '@angular/core';
import { LandingHeaderComponent } from './components/landing-header/landing-header.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { TopicSelectionComponent } from './components/topic-selection/topic-selection.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [LandingHeaderComponent, HowItWorksComponent, TopicSelectionComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {}
