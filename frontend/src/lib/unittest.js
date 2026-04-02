import { isValidURL, normalizeURL } from "./utils.js";

let passed = 0;
let failed = 0;

function assert(testName, actual, expected) {
  if (actual === expected) {
    passed++;
    console.log(`  ✔ ${testName}`);
  } else {
    failed++;
    console.error(`  ❌ ${testName} — expected ${expected}, got ${actual}`);
  }
}

//isValidURL tests

console.log("isValidURL");

assert("accepts valid https URL", isValidURL("https://example.com"), true);
assert("accepts valid http URL", isValidURL("http://example.com"), true);
assert("accepts URL with path", isValidURL("https://example.com/page"), true);
assert("accepts URL with query params", isValidURL("https://example.com?q=1"), true);
assert("accepts subdomain URL", isValidURL("https://sub.example.com"), true);

assert("rejects ftp protocol", isValidURL("ftp://example.com"), false);
assert("rejects missing protocol", isValidURL("example.com"), false);
assert("rejects empty string", isValidURL(""), false);
assert("rejects random text", isValidURL("not a url"), false);
assert("rejects hostname without dot", isValidURL("https://localhost"), false);
assert("rejects hostname starting with dot", isValidURL("https://.example.com"), false);
assert("rejects hostname ending with dot", isValidURL("https://example."), false);

//normalizeURL tests

console.log("\nnormalizeURL");

assert("prepends https:// when missing", normalizeURL("example.com"), "https://example.com");
assert("keeps existing https://", normalizeURL("https://example.com"), "https://example.com");
assert("keeps existing http://", normalizeURL("http://example.com"), "http://example.com");
assert("trims whitespace", normalizeURL("  https://example.com  "), "https://example.com");
assert("prepends https:// and trims", normalizeURL("  example.com  "), "https://example.com");

//Summary

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
