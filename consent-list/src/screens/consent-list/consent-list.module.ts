import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ConsentListComponent } from './consent-list.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {JoinByCommaPipe} from "../../shared/pipes/split.pipe";


@NgModule({
  declarations: [
    ConsentListComponent,
    JoinByCommaPipe,
  ],
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  exports: [
    ConsentListComponent
  ],
  bootstrap: [ConsentListComponent]
})
export class ConsentListModule { }
