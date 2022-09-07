//console.log('hello world!')

const validator = require('validator');
const readLine = require('readline');
const fs = require('fs');

//inisialisasi objek readline
const rl=readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

//periksa apakah folder 'data' sudah dibuat
const dirPath='data';
if(!fs.existsSync(dirPath)){
    //jika belum, maka buat folder data
    fs.mkdirSync(dirPath);
}

//periksa apakah berkas contacts.json sudah dibuat
const dataPath='data/contacts.json';
if(!fs.existsSync(dataPath)){
    //jika belum, maka buat file contacts.json
    fs.writeFileSync(dataPath,'[]');
}

//menyimpan pertanyaan di dalam function untuk menghindari callback hell.
//dan menggunakan promise
const pertanyaan=(question)=>{
    //Promise bisa dianalogikan sebagai sebuah "janji".
    return new Promise((resolve, reject) => {
        rl.question(question,(answer)=>{
            resolve(answer);//resolve itu callback (function)
        })
    });
}

//await harus berada di dalam async
const main=async ()=>{
    const name = await pertanyaan("what is your name?");//menunggu promise nya resolve, lalu lanjutkan ke baris berikutnya
    const email = await pertanyaan("what is your email?");//menunggu promise nya resolve, lalu lanjutkan ke baris berikutnya

    if(!validator.isEmail(email)){//validasi email
        //console.log('Email salah!');
        //TODO: jika email yg dimasukkan salah, hentikan program.
        return Promise.reject("email salah!");
    }
    const mobile = await pertanyaan("what is your mobile phone?");

    if(!validator.isMobilePhone(mobile,'id-ID')){//validasi nomor telepon
        //console.log('nomor Salah!');
        return Promise.reject("nomor salah!");
        //TODO: jika nomor telefon yg dimasukkan salah, hentikan program.
    }
    const contact={name,mobile,email};//buat sebuah objek yang memiliki atribut name,mobile, dan email.
    const file = fs.readFileSync('data/contacts.json','utf8');//baca isi file contacts
    const contacts = JSON.parse(file);//konversi dari format JSON
    contacts.push(contact);//tambahkan nama,nomor telepon, dan email yang baru saja dibaca dari cmd
    fs.writeFileSync('data/contacts.json',JSON.stringify(contacts));//tulis data yang baru ke dalam berkas .json
    console.log('Terimakasih sudah memasukkan data!');//konfirmasi data sudah berhasil ditulis ke file json
}

main().catch(err=> {
    console.log(err);
});