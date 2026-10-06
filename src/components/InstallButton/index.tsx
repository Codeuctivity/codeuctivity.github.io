import { useEffect, useState } from "react";
import { onInstallAvailable, promptInstall } from "../../clientModules/installPrompt";

/**
 * "Install app": rendered only while the browser offers to install the site (see
 * clientModules/installPrompt.ts), so it never shows in Safari or Firefox, or once the
 * site is installed.
 */
export default function InstallButton(): JSX.Element | null {
  const [available, setAvailable] = useState(false);
  useEffect(() => onInstallAvailable(setAvailable), []);

  if (!available) {
    return null;
  }
  return (
    <button type="button" className="button button--secondary button--lg" onClick={promptInstall}>
      📲 Install app
    </button>
  );
}
