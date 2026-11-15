// Adds the Umami tracker only after the page has finished loading. A script added before
// `load` holds the load event (and the tab spinner) until it arrives, so when Umami hung
// on 2026-11-14 pages never finished loading.
(() => {
  const config = document.currentScript?.dataset;
  if (!config?.websiteId) return;
  const inject = () => {
    const script = document.createElement('script');
    script.src = 'https://analytics.codeuctivity.cloud/script.js';
    script.dataset.websiteId = config.websiteId;
    if (config.domains) script.dataset.domains = config.domains;
    document.head.appendChild(script);
  };
  if (document.readyState === 'complete') inject();
  else window.addEventListener('load', inject, {once: true});
})();
