import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch((err: unknown) => {
  const msg = typeof err === 'string' ? err : err instanceof Error ? err.message : JSON.stringify(err);
  console.error(msg);
});
