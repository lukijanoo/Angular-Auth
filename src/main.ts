import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app-routing.module';

import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// The new way to bootstrap a standalone application
bootstrapApplication(AppComponent, {
  providers: [
    // Import all providers from your AppModule
    importProvidersFrom(AppModule),

    // Provide the router directly
    provideRouter(appRoutes)
  ]
}).catch(err => console.error(err));