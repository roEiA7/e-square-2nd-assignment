import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { bufferTime, takeUntil } from 'rxjs/operators';
import { ILog } from '../interfcaes/log.interfcae';
import { ILoggerConfig, LoggerConfigService } from '../logger.module';

@Injectable({
  providedIn: 'root'
})
export class LoggerService implements OnDestroy {

  private logs$ = new Subject<ILog>();
  // private _logs$: Observable<ILog> | Observable<ILog[]>; // couldnt figure it out
  private _logs$: any;
  private destroy$ = new Subject();

  constructor(@Inject(LoggerConfigService) private config: ILoggerConfig) {
    const queueConfig = this.config.queue;

    this._logs$ = this.logs$.pipe(takeUntil(this.destroy$));

    if (queueConfig?.useQueue) {
      let duration = queueConfig.flushDuration ?? 5;
      duration *= 1000;
      this._logs$ = this._logs$.pipe(
        bufferTime(duration)
      );
    }

    this._logs$.subscribe((logs: ILog | ILog[]) => {
      this.log(logs);
    });
  }

  handleError(error: Error): void {
    const log = this.createLog(error);
    this.logs$.next(log);
  }

  private createLog(error: Error): ILog {
    return {
      message: error.message,
      stackTrace: error.stack,
      timestamp: Date.now()
    }
  }

  private log(logs: ILog | ILog[]): void {
    let _logs: ILog[] = [];
    _logs = _logs.concat(logs);

    this.config.target === 'console' ?
      this.logToConsole(..._logs) :
      this.logToLocalStorage(..._logs);
  }

  private logToConsole(...logs: ILog[]): void {
    logs.forEach(log => {
      console.log(log);
    });
  }

  private logToLocalStorage(...logs: ILog[]): void {
    const key = `${new Date(logs[0].timestamp)} Log: `;
    localStorage.setItem(key, JSON.stringify(logs));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


