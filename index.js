import express from 'express';
import ejs from "ejs";
import bodyParser from 'body-parser';

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

const posts = [];

app.get("/", (req, res) => {
    res.render("main.ejs", { posts });
});

app.get("/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/new", (req, res) => {
    const postTitle = req.body.postTitle;
    const postContent = req.body.postContent;

    if (!postTitle || !postContent) {
        return res.status(400).send("Both title and content are required.");
    }

    const postObj = {
        title: postTitle,
        content: postContent
    };
    posts.push(postObj);
    console.log(posts);
    console.log(posts.indexOf(postObj));
    res.redirect("/");

});

app.get("/delete", (req, res) => {
    res.render("delete.ejs", { posts });
});
app.post("/delete", (req, res) => {
    const index = parseInt(req.body.postIndex,10);
    console.log(index);
    if (isNaN(index) || index < 0 || index >= posts.length) {
        return res.status(404).send("Post not found.");
    }
    else{posts.splice(index, 1);} 
    res.redirect("/");
});

app.get("/edit", (req, res) => {
    res.render("edit.ejs", { posts });
});

app.post("/edit", (req, res) => {
    const index = parseInt(req.body.postIndex, 10); 

    // Checking if Index is valid
    if (isNaN(index) || index < 0 || index >= posts.length) {
        return res.status(404).send("Post not found.");
        res.redirect("/");
    };

    posts[index].title = req.body.postTitle || posts[index].title;
    posts[index].content = req.body.postContent || posts[index].content;

    res.redirect("/");
});

    
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
