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
  e.next();
}

// CREATE
onRecordCreate(async (e) => {
  await revalidate(e);
});

// UPDATE
onRecordUpdate(async (e) => {
  const collectionName = e.record?.collection()?.name;
  if (collectionName !== "_authOrigins") {
    await utils.revalidateDevAndProd();
  }
  e.next();
});

// DELETE
onRecordDelete(async (e) => {
  await revalidate(e);
});
