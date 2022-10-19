import Books from "../models/BookModel.js";

export const pageHome = async (req, res) => {

    res.status(200).json({msg : "Kelompok 3 Jaya Jaya Jaya"});
};


export const getBooks = async (req, res) => {
  try {
    const books = await Books.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
  }
};
export const getBookById = async (req, res) => {
  try {
    const book = await Books.findOne({
      where: { id: req.params.id },
    });
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
  }
};
export const saveBooks = (req, res) => {
  const { title, description, author, price } = req.body;
  try {
    Books.create({
      title,
      description,
      author,
      price
    });
    return res.status(200).json({ 
      success: true, msg: "Buku berhasil ditambahkan!" 
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Buku gagal ditambahkan" });
  }
};
export const updateBooks = async (req, res) => {
  const { id } = req.params;
  const { title, description, author, price } = req.body;
  try {
    await Books.update(
      { title: title, price: price, author : author, description : description },
      {
        where: { id },
      }
    );
    return res
      .status(200)
      .json({ success: true, msg: "Buku berhasil diupdate!" });
  } catch (error) {
    console.log(error);
  }
};
export const deleteBooks = async (req, res) => {
  const { id } = req.params;
  const dataBeforeDelete = await Books.findOne({
    where: { id: id },
  });
  // if(tokenUser.role !="superadmin"){res.json()}
  const parsedDataProfile = JSON.parse(JSON.stringify(dataBeforeDelete));

  if (!parsedDataProfile) {
    return res.status(400).json({
      success: false,
      message: "Books doesn't exist or has been deleted!",
    });
  }

  await Books.destroy({
    where: { id },
  });

  return res.status(200).json({
    success: true,
    message: "Delete Data Successfully",
  });
};
