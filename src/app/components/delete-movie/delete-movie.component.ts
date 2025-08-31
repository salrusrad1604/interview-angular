import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Movie } from 'src/app/models/movies.models';

@Component({
  selector: 'app-delete-movie',
  templateUrl: './delete-movie.component.html',
  styleUrls: ['./delete-movie.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteMovieComponent {
  constructor(public dialogRef: MatDialogRef<DeleteMovieComponent>, @Inject(MAT_DIALOG_DATA) public data: Movie) {}

  close(): void {
    this.dialogRef.close();
  }
}
