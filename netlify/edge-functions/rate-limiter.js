// Netlify Edge Function: Anti-DDoS, Bad-Bot Blocker & Rate Limiter

const ipTracker = new Map();
const pdfTracker = new Map();

const WINDOW_MS = 10 * 1000;
const MAX_REQUESTS = 25;
const PDF_WINDOW_MS = 60 * 1000;
const MAX_PDF_REQUESTS = 3;

const BLOCKED_UA_PATTERNS = [
  /curl\//i,
  /python-requests/i,
  /python-urllib/i,
  /aiohttp/i,
  /httpx/i,
  /postmanruntime/i,
  /insomnia/i,
  /apachebench/i,
  /\bab\//i,
  /wrk/i,
  /k6/i,
  /go-http-client/i,
  /wget\//i,
  /httpie/i,
  /scrapy/i,
  /node-fetch/i,
  /undici/i,
  /axios\//i,
  /jmeter/i,
  /siege/i,
  /gatling/i,
  /headlesschrome/i,
  /phantomjs/i,
  /puppeteer/i,
  /selenium/i,
];

export default async function handler(request, context) {
  const userAgent = request.headers.get("user-agent") || "";
  const clientIp =
    context.ip ||
    request.headers.get("x-nf-client-connection-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  const now = Date.now();

  if (ipTracker.size > 2000) {
    for (const [ip, data] of ipTracker.entries()) {
      if (now - data.timestamp > WINDOW_MS * 2) {
        ipTracker.delete(ip);
      }
    }
  }
  if (pdfTracker.size > 1000) {
    for (const [ip, data] of pdfTracker.entries()) {
      if (now - data.timestamp > PDF_WINDOW_MS * 2) {
        pdfTracker.delete(ip);
      }
    }
  }

  // 1. Block automated flooding tools
  if (!userAgent || BLOCKED_UA_PATTERNS.some((pattern) => pattern.test(userAgent))) {
    return new Response(
      "403 Forbidden: Automated scripts, flood tools, and bot requests are strictly prohibited.",
      {
        status: 403,
        statusText: "Forbidden",
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  }

  const url = new URL(request.url);

  // 2. Protect PDF downloads from bandwidth exhaustion
  if (url.pathname.toLowerCase().endsWith(".pdf")) {
    let pdfData = pdfTracker.get(clientIp);
    if (!pdfData || now - pdfData.timestamp > PDF_WINDOW_MS) {
      pdfData = { count: 1, timestamp: now };
      pdfTracker.set(clientIp, pdfData);
    } else {
      pdfData.count += 1;
      if (pdfData.count > MAX_PDF_REQUESTS) {
        return new Response(
          "429 Too Many Requests: PDF download limit reached. Please wait 60 seconds before trying again.",
          {
            status: 429,
            statusText: "Too Many Requests",
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
              "Retry-After": "60",
              "Cache-Control": "no-store, no-cache, must-revalidate",
            },
          }
        );
      }
    }
  }

  // 3. Sliding window IP Rate Limiter
  let ipData = ipTracker.get(clientIp);
  if (!ipData || now - ipData.timestamp > WINDOW_MS) {
    ipData = { count: 1, timestamp: now };
    ipTracker.set(clientIp, ipData);
  } else {
    ipData.count += 1;
    if (ipData.count > MAX_REQUESTS) {
      return new Response(
        "429 Too Many Requests: Rate limit exceeded. Please wait a moment before sending more requests.",
        {
          status: 429,
          statusText: "Too Many Requests",
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Retry-After": "30",
            "Cache-Control": "no-store, no-cache, must-revalidate",
          },
        }
      );
    }
  }

  return context.next();
}

export const config = {
  path: "/*",
  rateLimit: {
    windowLimit: 30,
    windowSize: 60,
    aggregateBy: ["ip"],
  },
};
