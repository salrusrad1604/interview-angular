import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [MatInputModule, MatIconModule, MatButtonModule, MatDividerModule, MatDialogModule],
  exports: [MatInputModule, MatIconModule, MatButtonModule, MatDividerModule, MatDialogModule],
})
export class MaterialModule {}
