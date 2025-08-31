import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Movie } from 'src/app/models/movies.models';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent {
  @Input() movie!: Movie;
  @Output() close = new EventEmitter();

  @HostBinding('style.background') get dynamicClasses() {
    return this.movie.isOnline ? 'rgba(0, 128, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)';
  }
}
