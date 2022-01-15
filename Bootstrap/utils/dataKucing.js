const fs = require('fs');
//membuat folder data jika belum ada
const dirPath ='./data';
if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}
//membuat file contacts.json jika belum ada
const dataPath = './data/dataKucing.json';
if (!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}
//ambil semua data di contact.josn
const loadData = ()=>{
    const fileBuffer = fs.readFileSync('data/dataKucing.json', 'utf-8');
    const data = JSON.parse(fileBuffer)
    return data;
}
//cari contact berdasarkan nama
const findData =(nama)=>{
    const datas = loadData()
    const data = datas.find((data) => data.nama.toLowerCase()===nama.toLowerCase())
    return data;
}

const saveWish = (wish)=>{
    fs.writeFileSync('data/Keranjang.json', JSON.stringify(wish));
}
//Add keranjang
const addData =(nama)=>{
    const fileBuffer = fs.readFileSync('data/Keranjang.json', 'utf-8');
    const wish = JSON.parse(fileBuffer)
    wish.push(nama);
    saveWish(wish)
}


module.exports={loadData,findData, addData};