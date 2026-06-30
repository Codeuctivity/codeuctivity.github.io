---
title: Commercial Support Options
slug: commercial-support
---

## Overview

You can use our packages under their existing open-source licenses.

For organizations that need guaranteed support and/or a predictable maintenance path for specific versions and environments, we offer paid **Commercial Support** for a defined scope and timeframe.

## What you can buy

### 1) Commercial Support (priority handling)
We provide priority handling for issues/questions that fall within the agreed scope. The exact scope is defined in the agreement issued to you.

### 2) Ongoing support for specific environments/versions
We can contract to keep specific versions of our packages working and supported in your environment for a defined timeframe.

This can include support for:
- a specific runtime/version (e.g., .NET),
- a specific Node.js version,
- a specific browser version or browser family,
- a specific operating system/version,
- and/or any combination.

Examples include:
- keeping a version supported while you upgrade the rest of your dependency stack,
- providing fixes/workarounds needed until you can complete an upgrade,
- backporting or compatibility updates for a defined window.

### 3) Faster-than-free updates (priority delivery)
We can prioritize updating our library and/or related dependency compatibility faster than our free community release cadence—when timing matters.

Examples include:
- upgrading to newer dependency versions to support a required platform release,
- shipping urgent compatibility fixes ahead of the next community release,
- delivering accelerated fixes for a critical issue affecting your target environment.

## Why we drop older versions (and why this offer exists)

Supporting older environments increases build time and engineering complexity: larger test/build matrices, more packaging complexity, more failure modes during maintenance, and more risk as the ecosystem evolves.

In practice, customers may fall out of step with our release cadence—or with each other’s cadences—because:

- **Dependency upgrade lag:** your other libraries/frameworks upgrade on a slower schedule.
- **Enterprise change control:** internal approvals can delay upgrades.
- **Platform freezes:** production environments may be frozen for a release window.
- **Browser/OS update timing:** you may need to support older OS/browser versions due to customer devices or procurement realities.
- **Long-lived apps:** internal products can require extended stability compared to upstream “latest” releases.
- **Required urgency:** you may need a dependency/platform update before the next free community release window.

Because of this, we may remove older environments/versions from community releases when maintenance cost outweighs community benefit.

This paid option exists to support organizations that still need their software “to just keep running”—without forcing the community release pipeline to carry long-term complexity.

## Important note about “keep it running”

This is not a promise that every historical version/environment will be maintained forever for everyone.

Instead:
- community releases follow a sustainable support cadence,
- contracted customers can buy continued compatibility/support for the version(s)/environment(s) and timeframe they need,
- and/or buy accelerated delivery for specific updates within the agreed scope.

## What happens next

Email us at **codeuctivity@gmail.com** with the scope you need. We’ll reply with the options available and propose an agreement.

In your message, include:
1. package name(s) (NuGet and/or npm)
2. version(s)/environment(s) you need (examples: Node, browser, OS, runtime)
3. your goal (CI, internal apps, distribution, etc.)
4. timeframe/end date
5. whether you need **faster updates** or **compatibility/backports** for older versions