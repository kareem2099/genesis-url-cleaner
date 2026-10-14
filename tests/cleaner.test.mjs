import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import run from "../src/index.js";

const manifest = JSON.parse(fs.readFileSync(new URL("../genesis.json", import.meta.url), "utf8"));
for (const declared of manifest.tests) {
  test(declared.name, () => assert.deepEqual(run(declared.input), declared.expect));
}

test("preserves functional repeated query values and hash while dropping tracking", () => {
  assert.equal(
    run({ url: "https://example.com/search?tag=a&tag=b&gclid=ad#results" }).url,
    "https://example.com/search?tag=a&tag=b#results",
  );
});
test("does not rewrite query encoding when nothing is removed", () => {
  assert.equal(run({url: "https://example.com/?q=hello%20world"}).url, "https://example.com/?q=hello%20world");
});
test("has no network hosts, dependencies or missing entry file", () => {
  assert.deepEqual(manifest.network, []);
  assert.ok(fs.existsSync(new URL("../" + manifest.entry, import.meta.url)));
  assert.match(manifest.verify, /^genesis-verify-[a-f0-9]{32}$/);
});
