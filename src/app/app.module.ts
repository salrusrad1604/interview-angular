import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MoviesListComponent } from './components/movies-list-component/movies-list.component';
import { CardComponent } from './components/card-component/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieComponent } from './components/movie-component/movie.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { DeleteMovieComponent } from './components/delete-movie/delete-movie.component';
import { ChangeStatusComponent } from './components/change-status/change-status.component';
import { AllOnlineComponent } from './components/all-online/all-online.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    CardComponent,
    MovieComponent,
    AddMovieComponent,
    DeleteMovieComponent,
    ChangeStatusComponent,
    AllOnlineComponent,
  ],
  bootstrap: [AppComponent],
  imports: [BrowserAnimationsModule, ReactiveFormsModule, MaterialModule],
})
export class AppModule {}
