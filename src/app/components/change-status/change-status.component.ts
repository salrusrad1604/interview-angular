import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Movie } from 'src/app/models/movies.models';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeStatusComponent {
  constructor(public dialogRef: MatDialogRef<ChangeStatusComponent>, @Inject(MAT_DIALOG_DATA) public data: Movie) {}

  close(): void {
    this.dialogRef.close();
  }
}
