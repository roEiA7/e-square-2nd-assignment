//* Unused */

// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpErrorResponse
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { LoggerService } from '../services/logger.service';

// @Injectable()
// export class LoggerInterceptor implements HttpInterceptor {

//   constructor(
//     private loggerService: LoggerService
//   ) { }

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     return next.handle(request).pipe(
//       catchError((err: HttpErrorResponse) => {
//         this.loggerService.handleError(err);
//         return throwError(err);
//       })
//     )
//   }
// }

