import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Movie } from '../../models/movies.models';
import { movies } from 'src/app/mock/movies-list-mock';

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  private allMovies = new BehaviorSubject(movies);

  getMovies(search: string): Observable<Movie[]> {
    return this.allMovies.pipe(map(movies => movies.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))));
  }

  addMovie(name: string): Observable<Movie> {
    const movie: Movie = this.createMovie(name);

    this.allMovies.next([...this.allMovies.getValue(), movie]);

    return of(movie);
  }

  updateMovie(movie: Movie): Observable<Movie> {
    const movies = this.allMovies.getValue();
    const selectMovie = movies.find(({ id }) => id === movie.id) as Movie;

    selectMovie.name = movie.name;
    selectMovie.isOnline = movie.isOnline;

    this.allMovies.next(movies);

    return of(selectMovie);
  }

  deleteMovie(id: Movie['id']): Observable<string> {
    const movies = this.allMovies.getValue().filter(movie => movie.id !== id);

    this.allMovies.next(movies);

    return of(id);
  }

  allOnline(): Observable<Movie[]> {
    const movies = this.allMovies.getValue().map(movie => ({ ...movie, isOnline: true }));

    this.allMovies.next(movies);

    return of(movies);
  }

  private createMovie(name: string): Movie {
    return {
      name: name,
      id: crypto.randomUUID(),
      isOnline: false,
    };
  }
}
