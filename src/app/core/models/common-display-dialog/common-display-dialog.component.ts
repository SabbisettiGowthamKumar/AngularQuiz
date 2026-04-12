import { Component, inject } from '@angular/core';
import { CommonDialogData } from '../../interfaces/common-dialog-data';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-common-display-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatButtonModule, MatDialogClose],
  templateUrl: './common-display-dialog.component.html',
  styleUrl: './common-display-dialog.component.scss',
})
export class CommonDisplayDialogComponent {
  data = inject<CommonDialogData>(MAT_DIALOG_DATA);
}
