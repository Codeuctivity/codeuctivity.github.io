---
slug: qr-scanner-demo
title: "A QR scanner in the browser: live demo of @codeuctivity/qr-scanner"
authors: [stesee]
tags: [qr code, pwa, javascript, react, npm]
---

[qr-scanner.codeuctivity.cloud](https://qr-scanner.codeuctivity.cloud/) is a small live demo of our npm package [`@codeuctivity/qr-scanner`](https://www.npmjs.com/package/@codeuctivity/qr-scanner). Point a camera at a QR code and the decoded value lands in a list - no app store, no account, no backend.

*This post contains one affiliate link, marked as such.*

<!-- truncate -->

## What the demo does

- **Scans with the device camera.** On a phone it picks the rear camera on its own; any other camera can be chosen from a dropdown. Zoom and torch are offered where the browser and the camera support them.
- **Keeps a history.** Every decoded value is added to a table with its timestamp. Tap a row to see the full value - binary content is shown as base64.
- **Ignores accidental repeats.** A code that stays in front of the camera is logged once, not dozens of times. Scan it again a few seconds later and it is logged again.
- **Exports to Excel.** The history can be downloaded as an `.xlsx` file.
- **Gives feedback.** A beep and a vibration on a successful scan, both switchable in the settings.
- **Light and dark theme**, or whatever the system prefers.
- **Installable as a PWA** and usable offline once it has been loaded.

## Where the data goes

Nowhere. Decoding happens in the browser, and the history is kept in the browser's `localStorage`. There is no server-side part that sees the camera image or the scanned values. Deleting an entry or clearing the list removes it for good.

The camera needs a secure context, so the page is served over HTTPS, and the browser asks for camera permission on the first visit.

## Using it on a desktop

Phones bring a good camera along. On a desktop PC or a laptop with a weak built-in camera, scanning a code from a sheet of paper or a parcel label gets easier with an external webcam that has a decent resolution and can be pointed at the desk - for example the [Anker PowerConf C200 2K webcam](https://amzn.to/4wLNgjb) (affiliate link). The demo lists it in the camera dropdown like any other video device.

## The package behind it

The demo is intentionally thin - the work is done by `@codeuctivity/qr-scanner`, our maintained fork of Nimiq's `qr-scanner`.

```bash
npm install @codeuctivity/qr-scanner
```

```js
import QrScanner from "@codeuctivity/qr-scanner";

const video = document.querySelector("video");

const scanner = new QrScanner(
  video,
  (result) => console.log("decoded:", result.data),
  { returnDetailedScanResult: true },
);

await scanner.start();

// later
scanner.stop();
scanner.destroy();
```

`QrScanner.listCameras(true)` returns the available cameras for a device picker.

The demo itself is a React app built with Vite, served as static files by nginx.

## Try it

Open [qr-scanner.codeuctivity.cloud](https://qr-scanner.codeuctivity.cloud/), allow camera access and hold a QR code in front of it.

## Affiliate disclosure

The webcam link above is an Amazon affiliate link. As an Amazon Associate we earn from qualifying purchases; the price for you stays the same.

For questions or feedback, contact us at [Codeuctivity@gmail.com](mailto:Codeuctivity@gmail.com).
