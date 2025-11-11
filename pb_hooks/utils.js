/// <reference path="../pb_data/types.d.ts" />
module.exports = {
  revalidateDevAndProd: async function () {
    async function revalidate(revalidateURL) {
      try {
        const res = $http.send({
          url: revalidateURL,
          method: "GET",
          body: "",
          headers: {},
          timeout: 120,
        });
        console.log(`Revalidated `, revalidateURL);
        console.log(JSON.stringify(res.raw));
      } catch (error) {
        console.log(`Error while revalidating  `, revalidateURL);
        console.log(error.message);
      }
    }
    let revalidateURL = "http://localhost:3000/api/revalidate";
    await revalidate(revalidateURL);
    revalidateURL = "http://localhost:3100/api/revalidate";
    await revalidate(revalidateURL);
  },
};
