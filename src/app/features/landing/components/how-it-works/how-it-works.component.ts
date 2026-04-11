import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss',
})
export class HowItWorksComponent {
  public steps: { title: string; description: string }[] = [
    {
      title: 'Select Topics',
      description: 'Click on topic cards or drag them to the selection area',
    },
    {
      title: 'Start Quiz',
      description: 'Questions will be curated from your selected topics',
    },
    {
      title: 'Get Results',
      description: 'Review your answers and see detailed explanations',
    },
  ];
}
