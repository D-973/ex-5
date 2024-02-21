const express = require ('express')
const app = express();
const port =3000; 
const bodyParser = require('body-parser')
const path = require("path");
const multer = require("multer")
const upload = multer({dest: "public"})
const cors = require("cors")

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, "public")));

const router = express.Router();
router.post("/upload", upload.single("file"), (req, res)=>{
    res.send(req.file)
});
app.get("/", (req,res) => {
    res.send("This is the home page")
});

app.post("/login",(req,res) =>{
    const {username, password} =req.body
    res.send(`Anda login dengan username ${username} dan password ${password}`)
});
app.post ("/upload", upload.single("file"), (req, res) => {
    const file = req. file;
    if (file){
        const target = path.join(__dirname, "public", file.originalname);
        fs.renameSync (file.path, target); 
        res.send ("file berhasil diupload");
    }else {
        res.send ("file gagal diupload");
    }
});
app.listen(port,() => 
    console.log(`Server running at http://localhost:${port}`)
);


