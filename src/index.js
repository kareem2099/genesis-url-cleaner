// No fetching: URL parsing and query cleanup happen inside the GENESIS sandbox.
const trackingKeys = new Set([
  "fbclid", "gclid", "dclid", "msclkid", "gbraid", "wbraid", "mc_cid", "mc_eid",
]);

export default function run(input) {
  let parsed;
  try {
    if (typeof input?.url !== "string") throw new Error("Invalid input");
    parsed = new URL(input.url.trim());
    if (!["https:", "http:"].includes(parsed.protocol) || parsed.username || parsed.password)
      throw new Error("Unsupported URL");
  } catch {
    return {
      valid: false, url: "", removedCount: 0, removedParameters: [],
      error: "Enter a valid HTTP or HTTPS URL without embedded credentials.",
    };
  }

  let removedCount = 0;
  const removedParameters = [];
  for (const key of new Set(parsed.searchParams.keys())) {
    const normalized = key.toLowerCase();
    if (normalized.startsWith("utm_") || trackingKeys.has(normalized)) {
      removedCount += parsed.searchParams.getAll(key).length;
      removedParameters.push(key);
    }
  }
  // Avoid rewriting the query when no tracking parameter was removed.
  for (const key of removedParameters) parsed.searchParams.delete(key);
  return { valid: true, url: parsed.href, removedCount, removedParameters, error: null };
}
