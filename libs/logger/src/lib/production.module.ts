import { ErrorHandler, NgModule } from '@angular/core';
import { GlobalErrorhandler } from './global-error-handler';



@NgModule({
  imports: [
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorhandler }
    // { provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true }
  ]
})
export class ProductionModule { }
