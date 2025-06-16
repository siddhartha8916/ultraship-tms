const fs = require("fs");
const path = require("path");

const SRC_DIR = path.resolve(__dirname, "../src");
const VALID_FEATURE_CONTENTS = new Set([
  "components",
  "hooks",
  "services",
  "state",
  "styles",
  "utils",
  "models",
  "constants",
  "tests",
  "translations.json",
  "index.ts",
]);

function isFeatureComponentFile(fileName, folderName) {
  return fileName === `${folderName}.tsx`;
}

function validateFeatureFolder(featurePath, featureName) {
  const contents = fs.readdirSync(featurePath);
  for (const item of contents) {
    const itemPath = path.join(featurePath, item);
    const isFile = fs.statSync(itemPath).isFile();

    if (
      isFile &&
      (item === "index.ts" || isFeatureComponentFile(item, featureName))
    )
      continue;

    if (!VALID_FEATURE_CONTENTS.has(item)) {
      console.error(`❌ Invalid item "${item}" in feature "${featureName}"`);
      return false;
    }
  }
  return true;
}

function scanForDuplicateFeatures(dir, seen = new Set()) {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      if (entry === "FeatureA") {
        const relPath = path.relative(SRC_DIR, fullPath);
        if (seen.has(relPath)) {
          console.error(`❌ Duplicate FeatureA folder at "${relPath}"`);
          return false;
        }
        seen.add(relPath);
        const valid = validateFeatureFolder(fullPath, entry);
        if (!valid) return false;
      } else {
        const valid = scanForDuplicateFeatures(fullPath, seen);
        if (!valid) return false;
      }
    }
  }
  return true;
}

console.log("🔍 Validating src folder structure...");
const isValid = scanForDuplicateFeatures(SRC_DIR);

if (!isValid) {
  console.error("❌ Folder structure validation failed.");
  process.exit(1);
} else {
  console.log("✅ Folder structure is valid.");
}
