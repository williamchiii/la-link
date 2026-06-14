import { test } from "node:test";
import assert from "node:assert";
import { isValidLongURL } from "../utils/validateURL.js";

// --- valid URLs: should return true ---
test("accepts a valid https URL", () => {
  assert.strictEqual(isValidLongURL("https://github.com"), true);
});

test("accepts a valid http URL", () => {
  assert.strictEqual(isValidLongURL("http://example.com"), true);
});

// --- invalid URLs: should return false ---
test("rejects javascript: scheme", () => {
  assert.strictEqual(isValidLongURL("javascript:alert(1)"), false);
});

test("rejects a URL with no scheme", () => {
  assert.strictEqual(isValidLongURL("example.com"), false);
});

test("rejects an empty string", () => {
  assert.strictEqual(isValidLongURL(""), false);
});

test("rejects non-string input (null)", () => {
  assert.strictEqual(isValidLongURL(null), false);
});
