import { TestBed } from '@angular/core/testing';
import { ILoggerConfig, LoggerConfigService } from '../logger.module';
import { TestScheduler } from 'rxjs/testing'

import { LoggerService } from './logger.service';
import { take } from 'rxjs/operators';

describe('LoggerService', () => {
  let service: LoggerService;
  const config: ILoggerConfig = {
    target: 'console',
    queue: { useQueue: true, flushDuration: 5 }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LoggerConfigService,
          useValue: config
        }
      ]
    });
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //* Doesn't work properly *//
  // describe('logs marble', () => {
  //   let scheduler: TestScheduler;

  //   beforeEach(() => scheduler = new TestScheduler((actual, expected) => {
  //     expect(actual).toEqual(expected);
  //   }));

  //   it('should stream queue after configured seconds', () => {
  //     scheduler.run(({ expectObservable }) => {
  //       const errors: Error[] = [
  //         {
  //           name: 'Mocked 1',
  //           message: 'Mocked Message'
  //         },
  //         {
  //           name: 'Mocked 2',
  //           message: 'Mocked Message'
  //         },
  //         {
  //           name: 'Mocked 3',
  //           message: 'Mocked Message'
  //         }
  //       ]
  //       let duration = config.queue?.flushDuration ?? 0; duration *= 1000;
  //       const expectedMarble = `${duration - 1}ms (abc)`;
  //       const expectedLogs = { a: errors[0], b: errors[1], c: errors[2] };
  //       expectObservable(service['_logs$']).toBe(expectedMarble, expectedLogs);
  //       errors.forEach(err => {
  //         service.handleError(err);
  //       });
  //     });
  //   });
  // });

  describe('handleError', () => {
    it('should submit new error to logs$', () => {
      const error = new Error('mock error');
      service['logs$'].pipe(take(1)).subscribe((log) => {
        expect(log).toBe(error);
      })
      service['handleError'](error);
    })
  });


});

