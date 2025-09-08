import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { default as AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideZonelessChangeDetection()] as const,
}).catch((err: unknown) => {
  const msg = typeof err === 'string' ? err : err instanceof Error ? err.message : JSON.stringify(err);
  console.error(msg);
});
