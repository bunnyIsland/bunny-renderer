import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [HomeComponent],
  imports: [MatGridListModule, MatInputModule, BrowserModule, CommonModule, SharedModule, HomeRoutingModule, BrowserAnimationsModule, MatSliderModule, MatFormFieldModule, MatSelectModule]
})
export class HomeModule {}
