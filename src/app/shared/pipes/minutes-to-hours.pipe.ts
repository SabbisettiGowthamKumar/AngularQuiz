import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToHours',
  standalone: true,
})
export class MinutesToHoursPipe implements PipeTransform {
  transform(value: number): string {
    if (!value || value == 0) return 'select topics to calculate time';
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours > 0 ? hours + ' h ' : ''}${minutes > 0 ? minutes + ' m' : ''}`;
  }
}
