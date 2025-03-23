import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public")); // Serve static files
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.set("view engine", "ejs"); // Set the view engine to ejs

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/apply", (req, res) => {
  res.render("apply.ejs");
}
);

app.post("/contact", (req, res) => {
const { name, email, message, phone } = req.body;
console.log(`Name: ${name}, Email: ${email}, Message: ${message}, Phone: ${phone}`);
res.send(`Thank you for contacting us, ${name}! We will respond to your message on ${phone} shortly.`);
}
);

app.post("/apply", (req, res) => {
  const { name, email, phone, resume, message } = req.body;
  console.log(`Name: ${name}, Email: ${email}, Phone: ${phone}, Resume: ${resume}, Message: ${message}`);
  res.send(`Thank you for applying, ${name}! We will review your resume and get in touch on ${phone}.`);
}
);

app.get("/jobs", (req, res) => {
  axios.get("https://jobs.github.com/positions.json?description=python&location=new+york")
    .then((response) => {
      res.render("jobs.ejs", { jobs: response.data });
    })
    .catch((error) => {
      console.log(error);
    });
}
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}
);