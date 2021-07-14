import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionModule } from './production.module';
import { ModuleWithProviders } from '@angular/compiler/src/core';


declare const ngDevMode: boolean;
// const productionModules = ngDevMode ? [] : [ProductionModule];
const productionModules = [ProductionModule];

export interface ILoggerConfig {
  messageFormat?: 'extended' | 'short';
  target?: 'console' | 'storage',
  queue?: { useQueue: boolean, flushDuration?: number };
}

export const LoggerConfigService = new InjectionToken<ILoggerConfig>("LoggerConfig");

@NgModule({
  imports: [
    CommonModule,
    ...productionModules
  ]
})
export class LoggerModule {
  static forRoot(config: ILoggerConfig): ModuleWithProviders {
    return {
      ngModule: LoggerModule,
      providers: [
        {
          provide: LoggerConfigService,
          useValue: config
        }
      ]
    }
  }
}
