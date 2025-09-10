import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, debounceTime, filter, map, startWith, Subject, switchMap, take, takeUntil } from 'rxjs';
import { Movie } from 'src/app/models/movies.models';
import { MoviesService } from 'src/app/services/app-services/movies.service';
import { AddMovieComponent } from '../add-movie/add-movie.component';
import { DeleteMovieComponent } from '../delete-movie/delete-movie.component';
import { ChangeStatusComponent } from '../change-status/change-status.component';
import { AllOnlineComponent } from '../all-online/all-online.component';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesListComponent {
  private destroy$ = new Subject<void>();
  public search = new FormControl('');
  public selectMovie$ = new BehaviorSubject<null | Movie>(null);

  public movies = this.search.valueChanges.pipe(
    debounceTime(500),
    map(val => (val || '').trim()),
    filter(val => !val || val.length > 2),
    startWith(''),
    switchMap(search => this.moviesService.getMovies(search || '')),
  );

  constructor(private moviesService: MoviesService, public dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(AddMovieComponent, {
      width: '400px',
    });

    dialogRef
      .afterClosed()
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(name => {
        this.addMovie(name);
      });
  }

  addMovie(name: string): void {
    this.moviesService
      .addMovie(name)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(() => this.search.setValue(this.search.value));
  }

  selectMovie(movie: Movie): void {
    this.selectMovie$.next(movie);
  }

  closeSide(): void {
    this.selectMovie$.next(null);
  }

  openDialogDelete(ev: Event, movie: Movie): void {
    ev.stopPropagation();

    const dialogRef = this.dialog.open(DeleteMovieComponent, {
      width: '400px',
      data: movie,
    });

    dialogRef
      .afterClosed()
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(id => {
        if (id) {
          if (id === this.selectMovie$.value?.id) {
            this.closeSide();
          }
          this.deleteMovie(id);
        }
      });
  }

  deleteMovie(id: Movie['id']): void {
    this.moviesService
      .deleteMovie(id)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(() => this.search.setValue(this.search.value));
  }

  openDialogUpdateStatus(ev: Event, movie: Movie): void {
    ev.stopPropagation();

    const dialogRef = this.dialog.open(ChangeStatusComponent, {
      width: '400px',
      data: movie,
    });

    dialogRef
      .afterClosed()
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(movie => {
        if (movie) {
          this.updateStatus(movie);
        }
      });
  }

  updateStatus(movie: Movie): void {
    this.moviesService
      .updateStatus(movie)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(newMovie => {
        this.search.setValue(this.search.value);
        if (movie.id === this.selectMovie$.value?.id) {
          this.selectMovie(newMovie);
        }
      });
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(AllOnlineComponent, {
      width: '400px',
    });

    dialogRef
      .afterClosed()
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(val => {
        if (val) {
          this.setAllOnline();
          if (this.selectMovie$.value) {
            this.selectMovie({ ...this.selectMovie$.value, isOnline: true });
          }
        }
      });
  }

  setAllOnline(): void {
    this.moviesService
      .updateStatusAll()
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(() => this.search.setValue(this.search.value));
  }

  trackById(_: number, item: any): number {
    return item.id;
  }
}
