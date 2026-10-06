import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

/**
 * Chromium browsers announce that the site can be installed through a single
 * `beforeinstallprompt` event, usually right after the page loads and before React has
 * hydrated. This client module runs as soon as the bundle does, keeps the event, and lets
 * the InstallButton component ask for it later, on any page and after any navigation.
 * Safari and Firefox never fire the event, so nothing is ever offered there.
 */
export interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
}

type Listener = (available: boolean) => void;

let deferred: BeforeInstallPromptEvent | null = null;
const listeners = new Set<Listener>();

function notify(): void {
  listeners.forEach((listener) => listener(deferred !== null));
}

/** Calls `listener` now and whenever the install offer appears or goes away. */
export function onInstallAvailable(listener: Listener): () => void {
  listeners.add(listener);
  listener(deferred !== null);
  return () => {
    listeners.delete(listener);
  };
}

/** Raises the browser's install dialog. An offer can be used once. */
export function promptInstall(): void {
  const prompt = deferred;
  deferred = null;
  notify();
  prompt?.prompt().catch(() => {
    // Already used or blocked: the browser's own menu still offers installing.
  });
}

if (ExecutionEnvironment.canUseDOM) {
  window.addEventListener('beforeinstallprompt', (event) => {
    // The button replaces the browser's own mini-infobar.
    event.preventDefault();
    deferred = event as BeforeInstallPromptEvent;
    notify();
  });
  window.addEventListener('appinstalled', () => {
    deferred = null;
    notify();
  });
}
