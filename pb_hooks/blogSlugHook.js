onRecordBeforeCreateRequest((e) => {
  if (e.collection.name === "blogs") {
    const title = e.record.get("title") || "";
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with hyphens
      .replace(/(^-|-$)+/g, ""); // trim hyphens
    e.record.set("slug", slug);
  }
});

onRecordBeforeUpdateRequest((e) => {
  if (e.collection.name === "blogs" && !e.record.get("slug")) {
    const title = e.record.get("title") || "";
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    e.record.set("slug", slug);
  }
});
