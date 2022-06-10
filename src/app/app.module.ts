import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgHttpCachingModule } from 'ng-http-caching';

import { HttpService } from "./services/http.service";
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search.component';
import { FireComponent } from './fire.component';
import { WaterComponent } from './water.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FireComponent,
    WaterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgHttpCachingModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
