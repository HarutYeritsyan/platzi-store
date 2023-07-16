import { InjectionToken, inject } from '@angular/core';
import { Config } from '@core/infra/config/models/config.model';
import { ENVIRONMENT } from './environment.token';

export const CONFIG = new InjectionToken<Config>('CONFIG', {
  providedIn: 'root',
  factory: () => ({
    env: inject(ENVIRONMENT)
  })
});