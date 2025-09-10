import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMovieComponent {
  public name = new FormControl('', [Validators.required, Validators.pattern(/^\S*$/)]);

  constructor(public dialogRef: MatDialogRef<AddMovieComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
