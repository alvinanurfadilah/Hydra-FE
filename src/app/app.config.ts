import {
  APP_INITIALIZER,
  ApplicationConfig,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtService } from './auth/jwt.service';
import { AuthService } from './auth/auth.service';
import { EMPTY } from 'rxjs';
import { jwtInterceptor } from './auth/jwt.interceptor';

const initAuth = () => {
  const jwtService = inject(JwtService);
  const authService = inject(AuthService);
  return () => (jwtService.getToken() ? authService.getCurrentUser() : EMPTY);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      multi: true,
    },
  ],
};

export const environment = {
  apiUrl: 'http://localhost:5090/api/v1',
};
