# GENESIS URL Cleaner

A small, dependency-free JavaScript tool that removes common tracking query parameters from HTTP/HTTPS URLs. It preserves the path, useful query parameters and fragment. It never fetches or visits the supplied URL.

Supported tracking parameters: `utm_*`, `fbclid`, `gclid`, `dclid`, `msclkid`, `gbraid`, `wbraid`, `mc_cid` and `mc_eid` (case-insensitive). This is URL cleanup, not a guarantee that a destination is safe or that every tracking technique is removed.

Example:

```text
Input:  https://example.com/article?utm_source=newsletter&fbclid=abc&page=2#details
Output: https://example.com/article?page=2#details
```

`genesis.json` declares the entry point, input, deterministic tests, an empty network allowlist and the account's public repository verification marker. GENESIS pins the imported Git commit, builds the tool in its sandbox and runs these tests before publishing it.

## Run locally

Requires Node.js 20+; no installation or npm packages needed:

```sh
npm test
```

## Run on GENESIS

1. Open https://genesisproof.pro/#/code while signed in to the account associated with the public verification marker.
2. Enter `kareem2099/genesis-url-cleaner` and press **Import and build**.
3. Open the tool after the declared tests pass, enter a URL, then press **Run**.

The verification marker is account-specific. Another creator should fork the repository and replace `verify` with their own marker from GENESIS before importing.
