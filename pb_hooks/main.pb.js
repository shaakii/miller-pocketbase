/// <reference path="../pb_data/types.d.ts" />
onRecordCreate(async (e) => {
  const utils = require(`${__hooks}/utils.js`);
  await utils.revalidateDevAndProd();
  e.next();
});

onRecordUpdate(async (e) => {
  const utils = require(`${__hooks}/utils.js`);
  const collectionName = e.record.collection().name;
  if (collectionName == "_authOrigins") {
    //no need to revalidate everytime api auth happens
    // console.log("hit, skipping");
  } else {
    await utils.revalidateDevAndProd();
  }

  e.next();
});

onRecordDelete(async (e) => {
  const utils = require(`${__hooks}/utils.js`);
  await utils.revalidateDevAndProd();
  e.next();
});

// onRecordsListRequest((e) => {
//   // console.log(e);
//   e.next();
// });
