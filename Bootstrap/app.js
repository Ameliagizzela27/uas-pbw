const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const {loadData, findData,addData} =require('./utils/dataKucing') 

const db = require("./config/db");
const User = require("./models/User");

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs');
app.use(expressLayouts);// third party middleware
app.use(express.urlencoded({extended:true}));

try {
  db.authenticate().then(() =>
  console.log("berhasil terkoneksi dengan database")
  );
} catch (error) {
  console.error('Connection error:', error);
}

//Build in-Middleware -> untuk men-baca file static (css, img, dll)
app.use(express.static('public'))

app.get('/', (req, res) => {

 res.render('home', {
   nama:'Amelia Gizzela',
   title: 'Home',
   layout: 'layouts/main-layout'
 })
})
app.get('/home', (req, res) => {
    res.render('home',{
      title: 'Home',
      layout: 'layouts/main-layout'});
  })
app.get('/listProduct', (req, res) => {
    const datas= loadData();
    res.render('listProduct',{
      layout: 'layouts/main-layout',
      title:'Produk',
      datas,

    });
 });

  // kirim per nama detail
  app.get('/listProduct/:nama', (req, res) => {
    const data = findData(req.params.nama)
    res.render('detailProduct',{
      layout: 'layouts/main-layout',
      title:'detail Product',
      data
    });
 });
 app.get('/detailProduct/:nama', (req, res) => {
  const wish = addData(req.body)
  res.render('wishlist',{
    layout: 'layouts/main-layout',
    title:'detail Product',
    wish
  });
});

app.get('/book', (req, res) => {
  res.render('book',{
    title: 'Home',
    layout: 'layouts/main-layout'});
})
app.get('/about', (req, res) => {
  res.render('about',{
    title: 'About',
    layout: 'layouts/main-layout'});
})
////////////////////////////////////////////////////////////////
//Data base
app.post("/book", async (req, res) => {
  try {
    //   destructuring object
    const { nama, tanggalkunjungan } = req.body;

    // initialize models database
    const newUser = new User({
      nama, tanggalkunjungan
    });

    // await = menjalankan kode models user
    await newUser.save();

    // menampilkan newuser ketika di save postman
    res.json(newUser);
    console.log(newUser)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

app.get("/book", async (req, res) => {
  try {
    const getAllUser = await User.findAll({});
    res.json(getAllUser);
    console.log(getAllUser)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////

app.use('/', (req, res)=>{
    res.status(404);
    res.send('<h1>404</h1>');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
