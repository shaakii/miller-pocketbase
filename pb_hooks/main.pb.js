/// <reference path="../pb_data/types.d.ts" />

// Import utils
const utils = require(`${__hooks}/utils.js`);

// Helper function to trigger revalidation safely
async function revalidate(e) {
  try {
    await utils.revalidateDevAndProd();
  } catch (err) {
    console.error("Revalidate failed:", err);
  }
  return e.next();
}

// Handle record CREATE (POST)
router.after("/api/collections/:collection/records", async (c, e) => {
  return revalidate(e);
});

// Handle record UPDATE (PATCH)
router.after("/api/collections/:collection/records/:id", async (c, e) => {
  const collectionName = e.record?.collection()?.name;
  if (collectionName !== "_authOrigins") {
    await utils.revalidateDevAndProd();
  }
  return e.next();
});

// Handle record DELETE (DELETE)
router.after("/api/collections/:collection/records/:id", async (c, e) => {
  return revalidate(e);
});
