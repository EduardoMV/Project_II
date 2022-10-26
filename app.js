const { on } = require('events');
const express = require('express');
const fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static("public"));

app.use(fileUpload());
app.engine('ejs', require('ejs').renderFile);
app.set("view engine", "ejs");


var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()

const https = require("https");
const PORT = process.env.PORT || 5000;

var pos;

posts=[{
            "Title": "Science in Education",
            "Content": "Education is an aspect that affects the life of everyone, everywhere. It is the pillar for the present and future of a society. Mexico is no exception to this, and neither are the cities in said country. In Culiacan, Sinaloa, the teaching of different subjects is a deficient one; more specifically, the teaching of natural sciences. This aspect of education lacks the manual and dynamic practices and experiments that are proper of science. The essence of science is not put into practice on its teaching process. Because of this, a practical solution must be found. A possible answer, even an accessible one, could be implemented right now through the use of deliberate practice.<br/><br/>Before giving any argument, it is essential to make sure there is something to which an argument is going to be given. It should firstly be clarified if there even is a deficiency on carrying out practices or empirical based projects or assessments in our city; and who would have more word on this than students themselves? Because of this, a brief survey was carried out, asking 10 high school students (and recently graduated ones) about their experiences with the teaching of natural sciences in their schools.<br/><br/>According to it, even though most of the students considered the researches and experiments as effective, these were barely carried out: on a scale of 1 to 5, the highest answer to how frequently researches were assigned was 4, and it was only said by one student. The most common answer on said question was 3, which is interpreted as students being assigned a moderate amount of research, this would be healthy if not for the other part of students; 40% gave a score of 2 or 1. In other words, despite most of the students giving a fairly high score for the frequency of research assignments, a significant part of them considered the frequency of them low.<br/><br/>On the other hand, on the question regarding the frequency of assigned experiments, with the same scale, 1 was an alarmingly common answer; students are barely carrying out dynamic activities on their science subjects. In addition, the highest answer was 3, but, unlike with the highest answer with the first question, it did repeat one time. Most of the students considered that they carried out experiments not very frequently or barely.",
            "Img": "/images/posts/science.jpg",
            "Author_name": "Daniel Esparza",
            "Author_img": "/images/authors/dan_esp.jpeg",
            "Author_abt": "I am a 20 year old Computer Science student, passionate about game and app development. I believe that education and app usage should go hand in hand."
        },
        {
            "Title": "What is e-commerce and how is it benefitting businesses?",
            "Content": "Ecommerce, also known as electronic commerce or internet commerce, refers to the buying and selling of goods or services using the internet, and the transfer of money and data to execute these transactions. Ecommerce is often used to refer to the sale of physical products online, but it can also describe any kind of commercial transaction that is facilitated through the internet. This started a long time ago in 1994 the first-ever online sale; a man sold a CD by the band Sting to his friend through his website NetMarket. Since then the e-commerce has evolved in many ways, creating a secure and efficient way to acquire products or services.<br/><br/>First of all, I think e-commerce has developed something there was not been seen over the years and this is the enormous amount of advertising on the internet, brands and small companies got better responses to online advertising than other media.<br/><br/>Another important thing e-commerce has influenced in business id the fact of opening business worldwide it doesn’t matter where are you from your company with the right strategy can get in the market really fast and get great profits, related to this, the fact of the easy transactions we have now when buying on the internet, just your credit card or a variety of other options and zou’re done, this helped a lot and benefits business. The only bad thing about this way of doing business is the abuse of these services when people try to cheat and sell you something that doesn’t arrive and this kind of thing, although there are a lot of sites that regulate this so you feel comfortable. E-commerce has influenced a lot in business and changes the way people like to do and create a business, it seems that these changes are for good and should stay for a long time.",
            "Img": "/images/posts/ecommerce.jpg",
            "Author_name": "Felipe Organista",
            "Author_img": "/images/authors/felipe_org.jpeg",
            "Author_abt": "I am Felipe, an enthusiast on marketing, specialized on e-commerce. I have 2 different online stores at the moment and I provide the service of developing e-commerce for different companies."
        },
        {
            "Title": "Cybersecurity and the importance of cryptography",
            "Content": "Cybersecurity is a matter of all technology know a days, since the internet of things was launched on the common devices, it is pretty accseible to enter to any device one has, being even an Alexa can be hacked without the propper measures;<br/><br/>Being so, cybersecurity is one of the most important branches alongside programming, and within cybersecurity there is cryptography, the science to the art of cypher and altering the common algorithms to make them unnacesable unless you have the key/language to dechiper it.<br/><br/> In cryptography, it is a common practice to try to break the cypher by brute force, since a vulnerable key is not worth anything in the security world; Once you are not able to enter by brute force, you have a minimum security key.<br/><br/> By way of analogy, to get into your home you would put a key in a lock to open the door. This process (the use of a key and a lock) is the method or algorithm. Now this method only works if you have the proper key to stick in the lock, and your key will be valid only as long as you are the resident of the particular abode. The next resident will have the locks changed to a different key to make sure that you cannot enter even though you may know the method. <br/><br/> The selection of the above three items - algorithm, key and period - depend on your needs. If you are in the battlefield and are receiving current tactical data, you want an algorithm that makes it easy to decipher the message in the heat of battle. On the other hand, you must also assume that your opponent has intercepted your enciphered message and is busy trying to break it. Therefore you must choose an algorithm (method) that is complicated enough so that by the time your opponent figures it out, the data will be worthless. The easier the algorithm you choose, the more often you will have to change the key that unlocks the code - if you want to keep your enemy in the dark.<br/><br/>Ciphers are broken into two main categories; substitution ciphers and transposition ciphers. Substitution ciphers replace letters in the plaintext with other letters or symbols, keeping the order in which the symbols fall the same. Transposition ciphers keep all of the original letters intact, but mix up their order. The resulting text of either enciphering method is called the ciphertext. Of course, you can use both methods, one after the other, to further confuse an unintended receiver as well.",
            "Img": "/images/posts/key.jpg",
            "Author_name": "Eduardo Martínez",
            "Author_img": "/images/authors/Eduardo_MV.jpeg",
            "Author_abt": "Hello, my name is Eduardo Ulises Martínez Vaca and I'm a sciene computer engeneer student passionate about cybersecurity and internet of things, the development of new technologies and the implementation of optimizing process with daily tools through tech."
        }];

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/new", (req, res) => {
    res.render("new_post.ejs"); 
});

app.post("/save", (req, res) => {
    const { aImg } = req.files;
    var aImage_dir = '/images/upload/' + aImg.name;
    var aImage_dir_mv = __dirname + '/public' + aImage_dir;
    aImg.mv(aImage_dir_mv);

    const { img } = req.files;
    var img_dir = '/images/upload/' + img.name;
    var img_dir_mv = __dirname + '/public' + img_dir;
    img.mv(img_dir_mv);


    var nw =  {
        "Title": req.body.bTitle,
        "Content": req.body.bContent,
        "Img": img_dir,
        "Author_name": req.body.aName,
        "Author_img": aImage_dir,
        "Author_abt": req.body.aAbout
    };

    posts.push(nw);
    res.redirect("/");
});

app.post("/blog", (req,res) => {
    var title = req.body.searchbar;
    posts.forEach(function callback(post, index){
        if(post["Title"] == title){
            pos = index;
        }
    })
    res.render("blog.ejs", {post: posts[pos],
                            blogs: posts});
});

app.post("/edit", (req,res) =>{
    var title = req.body.searchbar;
    posts.forEach(function callback(post, index){
        if(post["Title"] == title){
            pos = index;
        }
    })
    res.render("edit.ejs", {post: posts[pos]});
});

app.post("/commit", (req, res) => {
    // Get the file that was set to our field named "image"
    const { aImg } = req.files;
    // Move the uploaded image to our upload folder
    var aImage_dir = '/images/upload/' + aImg.name;
    var aImage_dir_mv = __dirname + '/public' + aImage_dir;
    aImg.mv(aImage_dir_mv);

    const { img } = req.files;
    var img_dir = '/images/upload' + img.name;
    var img_dir_mv = __dirname + '/public' + img_dir;
    img.mv(img_dir_mv);

    posts[pos]["Title"] = req.body.bTitle;
    posts[pos]["Content"] = req.body.bContent;
    posts[pos]["Img"] = img_dir;
    posts[pos]["Author_name"] = req.body.aName;
    posts[pos]["Author_abt"] = req.body.aAbout;
    posts[pos]["Author_img"] = aImage_dir;
    res.redirect("/");
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
