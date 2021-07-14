import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoggerModule } from '@my-workspace/logger';
import { environment } from '../environments/environment';



// const loggerModule = environment.production ? [LoggerModule] : [];
const loggerModule = [LoggerModule.forRoot({
  target: 'console',
  queue: { useQueue: true, flushDuration: 5 }
})];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ...loggerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
