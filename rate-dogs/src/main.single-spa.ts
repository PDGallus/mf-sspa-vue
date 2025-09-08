import { ApplicationRef, provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { routes } from './app/routes';
import { RootComponent } from './app/root.component';

let appRef: ApplicationRef | null = null;
let hostEl: HTMLElement | null = null;

type SingleSpaProps = {
  name?: string;
  baseHref?: string;
  domElement?: HTMLElement;
};

function resolveMountEl(props: SingleSpaProps): HTMLElement {
  // 1) Bevorzugt: Container von single-spa-layout
  if (props.domElement) return props.domElement;

  // 2) Fallback: Container anhand der Standard-ID von single-spa-layout
  //    (z. B. <div id="single-spa-application:@angular-mf/rate-dogs">)
  const appName = props.name ?? '@angular-mf/rate-dogs';
  const containerId = `single-spa-application:${appName}`;
  const el = document.getElementById(containerId);
  if (el) return el;

  // 3) Kein eigener Container im <body> mehr erzeugen -> klarer Fehler, damit die Struktur korrekt bleibt
  throw new Error(
    `Container für "${appName}" nicht gefunden. Erwartet props.domElement oder <div id="${containerId}"> aus single-spa-layout.`
  );
}

export function bootstrap(_props: SingleSpaProps): Promise<void> {
  void _props;
  return Promise.resolve();
}

export async function mount(props: SingleSpaProps): Promise<void> {
  hostEl = resolveMountEl(props);

  // Angular Root-Tag innerhalb des von single-spa bereitgestellten Containers anlegen
  const tag = 'mfe-ng20-root';
  let root = hostEl.querySelector(tag);
  if (!root) {
    root = document.createElement(tag);
    hostEl.appendChild(root);
  }

  const providers = [
    { provide: APP_BASE_HREF, useValue: props.baseHref ?? '/' },
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    provideZonelessChangeDetection(),
  ];

  appRef = await bootstrapApplication(RootComponent, {
    providers: providers as unknown as (
      | import('@angular/core').Provider
      | import('@angular/core').EnvironmentProviders
    )[],
  });
}

export function unmount(): Promise<void> {
  if (appRef) {
    appRef.destroy();
    appRef = null;
  }
  if (hostEl) {
    // Nur den eigenen Inhalt entfernen, den single-spa-Container selbst nicht löschen
    hostEl.innerHTML = '';
    hostEl = null;
  }
  return Promise.resolve();
}

export function update(_props: SingleSpaProps): void {
  void _props;
  // optional: handle theme/locale updates
}
