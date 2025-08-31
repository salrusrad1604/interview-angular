import { Injectable } from '@angular/core';
import { MoviesApiService } from '../api/movies-api.service';
import { Movie } from 'src/app/models/movies.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private moviesApi: MoviesApiService) {}

  getMovies(search: string): Observable<Movie[]> {
    return this.moviesApi.getMovies(search);
  }

  addMovie(name: string): Observable<Movie> {
    return this.moviesApi.addMovie(name);
  }

  deleteMovie(id: Movie['id']): Observable<string> {
    return this.moviesApi.deleteMovie(id);
  }

  updateStatus(movie: Movie): Observable<Movie> {
    const movieUpdated: Movie = { ...movie, isOnline: !movie.isOnline };

    return this.moviesApi.updateMovie(movieUpdated);
  }

  updateStatusAll(): Observable<Movie[]> {
    return this.moviesApi.allOnline();
  }
}
