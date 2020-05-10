let express = require("express")
let app = express();
let session = require("express-session")
let mongoose = require("mongoose");
let cookieParser = require("cookie-parser")
let fileUpload = require("express-fileupload")


mongoose.connect("mongodb://localhost/ahmed",{useNewUrlParser: true});

let User = require("./models/User")
let Article = require("./models/Article")

app.use(express.static('public'))
app.set("view engine","twig")
app.use(session({secret: 'secret', resave:true,saveUninitialized: true}));
app.use(cookieParser())
app.use(express.urlencoded({extented: false}));
app.use(fileUpload())

app.get("/",(req,res) => {
	Article.find({},(err,articles) => {
		for(art in articles){
			let u = User.find({id:articles[art].userid},(err,user) => {
				articles[art].tel=user[0].number+"";
				console.log(user[0].number);
				
			})
			
		}
		res.render("index",{articles:articles})
	})
})


app.get("/logi",(req,res) => {
	res.render("login")
})

app.get("/register",(req,res) => {
	res.render("registre")
})

app.post("/logi",(req,res) => {
	let email = req.body.email;
	let password = req.body.pass;

	User.find({email:email,password:password},(err,user) => {
		if(err)
			throw err
		console.log(user)
		req.session.user = user
		console.log(req.session.user);
		console.log(req.session.user[0]._id);
		console.log(req.session.user.id);
		res.redirect("/profile")

	})
})
app.post("/register",(req,res) => {
	let email = req.body.email;
	let name = req.body.name;
	let lastname = req.body.lastName;
	let num = req.body.number;
	let password = req.body.pass;
	User.create({name:name,lastname:lastname,email:email,number:num,password:password},(err,user) => {
		req.session.user = user;
		console.log(user);
		if(err)
			console.log(err)
	})
	us=new User();
	us.email = req.body.email;
	us.name = req.body.name;
	us.lastname = req.body.lastName;
	us.number = req.body.number;
	us.password = req.body.pass;
	req.session.user=us;
		
	res.redirect("/profile")
})

app.get("/profile",(req,res) => {
		console.log(req.session.user)
		let user = req.session.user;

		
		if(!user){
			res.redirect("/")
			
		}
		else
			{
				Article.find({userid:user.id},(err,articles) => {
					res.render("Profile/index",{user:user,articles:articles})
					console.log(articles);
					
				})
			}
})

app.get("/upload",(req,res) => {
	if(req.session.user)
		res.render("Profile/upload")
	else
		res.redirect("/")
})

app.post("/upload",(req,res) => {
	if(req.session.user){
		
	console.log(req.body.title)
	console.log(req.body.price)
	console.log(req.files.test)
	console.log(req.session.user)
	req.files.test.mv("public/img/arrivel/"+req.files.test.name)
	
	let article = new Article({userid:req.session.user[0].id,price:parseInt(req.body.price),title:req.body.title,picture: req.files.test.name}) 
	article.save((err,article) => {
		if(err)
			throw err
		console.log(article)
		res.redirect("/profile")
	})
	}
	else
		res.redirect("/")
})

app.listen(8086);
