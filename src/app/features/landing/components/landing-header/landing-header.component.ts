import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TimerService } from '../../../../core/services/timer.service';
import { MinutesToHoursPipe } from '../../../../shared/pipes/minutes-to-hours.pipe';

@Component({
  selector: 'app-landing-header',
  standalone: true,
  imports: [MatIconModule, MinutesToHoursPipe],
  templateUrl: './landing-header.component.html',
  styleUrl: './landing-header.component.scss',
})
export class LandingHeaderComponent {
  timer: TimerService = inject(TimerService);
}
