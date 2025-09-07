import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideAnimationsAsync()] as const,
}).catch((err: unknown) => {
  // Ensure safe logging for strict ESLint rules
  const msg = typeof err === 'string' ? err : err instanceof Error ? err.message : JSON.stringify(err);
  // eslint-disable-next-line no-console
  console.error(msg);
});
