import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = 86400; // Cache 24 hours

const clientScript = `(function(){
  try {
    var d = document, w = window, n = navigator;
    if (n.doNotTrack === "1" || n.doNotTrack === "yes" || n.globalPrivacyControl) return;

    var scriptEl = d.currentScript || d.querySelector('script[src*="analytics.js"]');
    var defaultLocale = (scriptEl && scriptEl.getAttribute('data-locale')) || 'en';

    // Session storage only (tab lifespan, no persistent tracking cookie)
    var sidKey = 'rv_sid';
    var sid = '';
    try {
      sid = sessionStorage.getItem(sidKey) || '';
      if (!sid) {
        sid = 's_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
        sessionStorage.setItem(sidKey, sid);
      }
    } catch(e) {
      sid = 's_' + Date.now().toString(36);
    }

    function parseUtm() {
      try {
        var p = new URLSearchParams(w.location.search);
        return {
          source: p.get('utm_source') || null,
          medium: p.get('utm_medium') || null,
          campaign: p.get('utm_campaign') || null
        };
      } catch(e) { return {}; }
    }

    var utm = parseUtm();
    var startTime = Date.now();

    function send(type, extra) {
      var data = {
        sessionId: sid,
        type: type || 'pageview',
        path: w.location.pathname,
        referrer: d.referrer || null,
        utmSource: utm.source,
        utmMedium: utm.medium,
        utmCampaign: utm.campaign,
        locale: defaultLocale,
        duration: Math.round((Date.now() - startTime) / 1000)
      };
      if (extra) {
        for (var k in extra) { if (extra.hasOwnProperty(k)) data[k] = extra[k]; }
      }
      var payload = JSON.stringify(data);
      if (n.sendBeacon) {
        n.sendBeacon('/api/collect', payload);
      } else {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/collect', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(payload);
      }
    }

    // Expose global track function
    w.trackEvent = function(type, data) {
      send(type, data);
    };

    // Initial pageview
    send('pageview');

    // Outbound link tracking
    d.addEventListener('click', function(e) {
      var a = e.target && e.target.closest('a');
      if (!a || !a.href) return;
      var href = a.href;
      if (href.indexOf(w.location.host) === -1 && href.indexOf('javascript:') !== 0) {
        send('outbound_link', { target: href });
      }
    }, true);
  } catch(err) {}
})();`;

export function GET() {
  return new NextResponse(clientScript, {
    status: 200,
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
