import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-all-online',
  templateUrl: './all-online.component.html',
  styleUrls: ['./all-online.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllOnlineComponent {
  constructor(public dialogRef: MatDialogRef<AllOnlineComponent>) {}

  close(): void {
    this.dialogRef.close(false);
  }
}
