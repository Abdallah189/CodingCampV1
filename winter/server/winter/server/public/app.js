let express = require("express")
let app = express();

app.set(express.static('public'))
app.set("view engine","twig")

let articles = [
{username:"Ahmed Jannadi",articleName:"Chechiya",articlePicture:"chechiya.png",articlePrice:100},
{username:"Ahmed Jannadi",articleName:"Kosksi",articlePicture:"kosksi.png",articlePrice:10},
];

app.get("/articles",(req,res) => {
	res.send();
})

app.listen(8088);
