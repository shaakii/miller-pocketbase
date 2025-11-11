/// <reference path="../pb_data/types.d.ts" />

// Import utils
const utils = require(`${__hooks}/utils.js`);

// Helper to revalidate for create/update/delete
async function revalidate(e) {
  try {
    await utils.revalidateDevAndProd();
  } catch (err) {
    console.error("Revalidate failed:", err);
  }
  return e.next();
}

// CREATE
router.after(/collections\/(.*)\/records$/, async (c, e) => {
  return revalidate(e);
});

// UPDATE
router.after(/collections\/(.*)\/records\/.*/, async (c, e) => {
  const collectionName = e.record?.collection()?.name;
  if (collectionName !== "_authOrigins") {
    await utils.revalidateDevAndProd();
  }
  return e.next();
});

// DELETE
router.after(/collections\/(.*)\/records\/.*/, async (c, e) => {
  return revalidate(e);
});
