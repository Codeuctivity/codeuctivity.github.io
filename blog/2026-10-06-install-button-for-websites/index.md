---
slug: install-button-for-websites
title: "An install button for your website - and why the Play Store becomes optional"
authors: [stesee]
tags: [pwa, javascript, android, play store, web app manifest]
---

A website can put its own INSTALL button into its UI. One click, and it sits on the home screen or in the Start menu, opens in its own window and works offline. None of the Play Store hassle is needed for that: no developer account, no registration fee, no revenue share, no closed test and no review queue. There is no package to build, sign or upload either - the deployed site is the app, and a new deployment is the update. This post shows the two pieces needed: a manifest and an event handler.

<!-- truncate -->

## Step 1: the manifest

Chromium only offers installation when the page links a web app manifest. This is the one from our [Push Up Game](https://pushupgame.codeuctivity.cloud/):

```json title="public/manifest.webmanifest"
{
  "id": "/",
  "name": "Push Up Game",
  "short_name": "Push Up Game",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "background_color": "#081820",
  "theme_color": "#081820",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
    { "src": "/icons/maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

```html title="index.html"
<link rel="manifest" href="/manifest.webmanifest" />
<!-- Safari on iOS takes the home screen icon from here -->
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
```

[Chrome's install criteria](https://web.dev/articles/install-criteria):

- served over HTTPS (`localhost` counts for development)
- `name` or `short_name`, `start_url`, and `icons` with a 192px and a 512px entry
- `display` set to `fullscreen`, `standalone`, `minimal-ui` or `window-controls-overlay`
- `prefer_related_applications` absent or `false`
- the user has clicked or tapped the page once and spent at least 30 seconds on it

The last point matters for testing: the install event does not fire on page load of a first visit.

A service worker is [no longer required](https://developer.chrome.com/blog/update-install-criteria) for installation from the browser menu (Chrome 108 on mobile, 112 on desktop). Register one anyway, otherwise the installed app shows the browser's offline error page without a network.

Set `id` explicitly. Without it the app's identity is derived from `start_url`, and changing that URL later creates a second app instead of an update.

## Step 2: the `beforeinstallprompt` event

There is no `navigator.install()` to call from a click handler. When the criteria are met, Chromium fires `beforeinstallprompt` on `window`; the event object's `prompt()` method raises the install dialog. The page keeps the event and uses it later.

```ts title="pwa.ts"
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * Calls `onAvailable` with a function that raises the install dialog,
 * and with `null` once it has been used or the app is installed.
 */
export function installPrompt(onAvailable: (prompt: (() => void) | null) => void): void {
  window.addEventListener("beforeinstallprompt", (event) => {
    // Keep the browser's own mini-infobar from showing up.
    event.preventDefault();
    const deferred = event as BeforeInstallPromptEvent;
    onAvailable(() => {
      onAvailable(null);
      void deferred.prompt();
    });
  });
  window.addEventListener("appinstalled", () => onAvailable(null));
}
```

```ts title="main.ts"
const button = document.querySelector<HTMLButtonElement>("#install")!;
button.hidden = true;

installPrompt((prompt) => {
  button.hidden = prompt === null;
  button.onclick = prompt;
});
```

What is easy to get wrong:

- **The button starts hidden** and only appears once the browser has announced that installation is possible.
- **`prompt()` works once per event**, whatever the user chose, so the handler withdraws the button before calling it.
- **`prompt()` needs a user gesture.** Call it from the click handler.
- **`appinstalled` covers the other path**: the user may install through the address bar icon or the browser menu instead.

## Browser support

`beforeinstallprompt` is a WICG draft that [only Chromium implements](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeinstallprompt_event). Installing works in most other browsers too, but through their own menu.

| Platform | Browser | INSTALL button | How to install |
| --- | --- | --- | --- |
| Android | Chrome, Edge, Samsung Internet | Yes | Button, or browser menu → "Add to Home screen" / "Install app" |
| Windows, macOS, Linux, ChromeOS | Chrome, Edge | Yes | Button, or the install icon in the address bar; own window and a Start menu / taskbar entry |
| iPhone / iPad | Safari | No | Share → "Add to Home Screen" |
| iPhone / iPad | Chrome, Edge, Firefox | No | Share menu → "Add to Home Screen" (iOS 16.4 and later) |
| Desktop | Firefox | No | Not supported; the app only runs in a tab |
| Mac | Safari | No | File → "Add to Dock" (macOS Sonoma and later) |

## Summary

A manifest and a 20-line event handler make a website installable with one click on Android and on desktop Chromium. Nothing but a deployment stands between `git push` and the user's home screen.

The source of this blog, including this post, is on GitHub: [Codeuctivity/codeuctivity.github.io](https://github.com/Codeuctivity/codeuctivity.github.io).

For questions or feedback, contact us at [Codeuctivity@gmail.com](mailto:Codeuctivity@gmail.com).
