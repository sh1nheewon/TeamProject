router.get("/insert", async (req, res) => {
  //const book_data = new BOOK();
  const book_data = await BOOK.build();
  return res.render("books/input", { book: book_data });
});

router.post("/insert", async (req, res) => {
  const book_data = req.body;
  try {
    await BOOK.create(book_data);
    return res.redirect("/books");
  } catch (error) {
    return res.json(error);
  }
});
