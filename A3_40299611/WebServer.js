const express = require('express');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const session = require('express-session');

app.use(express.json());
app.use(cookieParser());    
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'Website'));

app.use(express.static(path.join(__dirname, 'Website')));


app.use(session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));


function isLoggedIn(req, res, next) {
    if (req.session && req.session.username) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.get('/giveaway', isLoggedIn, (req, res) => {
    res.render('giveaway');
});


app.get('/', (req, res) => {
    res.render('home');
});
app.get('/home', (req, res) => {
    res.render('home');
});
app.get('/giveaway', (req, res) => {
    res.render('giveaway');
});
app.get('/find', (req, res) => {
    res.render('find');
});
app.get('/dogcare', (req, res) => {
    res.render('dogcare');
});
app.get('/catcare', (req, res) => {
    res.render('catcare');
});
app.get('/contactus', (req, res) => {
    res.render('contactus');
});
app.get('/disclaimer', (req, res) => {
    res.render('disclaimer');
});
app.get('/CreateAccount', (req, res) => {
    res.render('CreateAccount');
});





app.post('/giveawaypets', (req, res) => {
    writeGiveAway(req, res);
});



function writeGiveAway(req, res) {
    const animal = req.body.animal;
    const breed = req.body.breed;
    const age = req.body.age;
    const gender = req.body.gender;
    const getAlong = req.body.GetAlong;
    const description = req.body.info.trim();
    const prsnName = req.body.name;
    const prsnEmail = req.body.Email.trim();
    const usrName = req.session.username;

    const filePath = path.join(__dirname, 'Website', 'petInfo.txt');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file: ', err);
        } 

        let pos;
        if (data.trim().length === 0) {
            pos = "1";
        } else {
            let lines = data.trim().split("\n");
            let lastLine = lines[lines.length - 1];
            let posString = lastLine.split(":")[0];
            let posNum = parseInt(posString) + 1;
            pos = posNum.toString();
        }

        let petLine = `${pos}:${animal}:${breed}:${age}:${gender}:${description}:${getAlong}i:${usrName}:${prsnName}:${prsnEmail}`;

        const filePath = path.join(__dirname, 'Website', 'petInfo.txt');

        fs.appendFile(filePath, petLine + "\n", 'utf8', (err) => {
            if (err) {
                console.error('Error writing file: ', err);
            } else {
                res.render('giveaway');
                
            }
        });
})}












app.post('/CreateAccount', (req, res) => {
    const { username, password } = req.body;

    // Check if username and password meet the criteria
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,}$/;

    if (!usernameRegex.test(username)) {
        return res.send("Invalid username format. It should only contain letters and digits.");
    }

    if (!passwordRegex.test(password)) {
        return res.send("Invalid password format. It should be at least 4 characters long, with at least one letter and one digit.");
    }

    // Check if username already exists
    const loginFilePath = path.join(__dirname, 'Website','login.txt');
    if (fs.existsSync(loginFilePath)) {
        const data = fs.readFileSync(loginFilePath, 'utf-8');
        const users = data.split('\n').filter(Boolean).map(line => line.split(':')[0]);

        if (users.includes(username)) {
            return res.send("Username already exists. Please choose another one.");
        }
    }

    // Save the new username and password
    const newUser = `${username}:${password}\n`;
    fs.appendFileSync(loginFilePath, newUser);

    // Return success message
    res.send("Account successfully created. You can now log in.");
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});











app.get('/login', (req, res) => {
    res.render('login'); // Create a login.ejs file
});

// Route to handle login form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const loginFilePath = path.join(__dirname,'Website','login.txt');
    if (fs.existsSync(loginFilePath)) {
        const data = fs.readFileSync(loginFilePath, 'utf-8');
        const users = data.split('\n').filter(Boolean);

        const userExists = users.some(user => {
            const [savedUsername, savedPassword] = user.split(':');
            return savedUsername === username && savedPassword === password;
        });

        if (userExists) {
            req.session.username = username; // Save username in session
            return res.redirect('/giveaway');
        } else {
            return res.send("Invalid username or password.");
        }
    } else {
        return res.send("No users found. Please create an account first.");
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send("Error logging out.");
        }
        res.render('logout');
    });
});














app.post('/find', async (req, res) => {
    const { animal, breed, age, gender, dogs, cats, children } = req.body;

    try {
        // Read the pets data from the JSON file
        const petsFilePath = path.join(__dirname, 'Website', 'pets.json');
        const petsData = await fs.promises.readFile(petsFilePath, 'utf-8');
        const pets = JSON.parse(petsData);

        // Filter pets based on the criteria
        const filteredPets = pets.filter(pet => {
            const matchesAnimal = !animal || pet.breed.includes(animal);
            const matchesBreed = !breed || pet.breed.toLowerCase().includes(breed.toLowerCase());
            const matchesAge = age === 'Doesn\'t Matter' || (pet.age >= getAgeRange(age)[0] && pet.age <= getAgeRange(age)[1]);
            const matchesGender = gender === 'Doesn\'t Matter' || pet.gender === gender;
            const matchesDogs = !dogs || pet.description.includes('dog');
            const matchesCats = !cats || pet.description.includes('cat');
            const matchesChildren = !children || pet.description.includes('Small Children');

            return matchesAnimal && matchesBreed && matchesAge && matchesGender && matchesDogs && matchesCats && matchesChildren;
        });

        // Render the results
        res.render('find', { pets: filteredPets });
    } catch (error) {
        console.error('Error reading pets file:', error);
        res.status(500).send('Internal Server Error');
    }
});

function getAgeRange(age) {
    switch(age) {
        case '0-1': return [0, 1];
        case '1-3': return [1, 3];
        case '3-5': return [3, 5];
        case '5-7': return [5, 7];
        case '7-9': return [7, 9];
        case 'over 9': return [9, Infinity];
        default: return [0, Infinity];
    }
}

