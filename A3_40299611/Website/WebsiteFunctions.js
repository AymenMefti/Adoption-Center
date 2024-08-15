//Date
function padS(num) {
    return num.toString().padStart(2, '0');
}
function updateDateTime() {
    const currentDate = new Date();
    const day = padS(currentDate.getDate());
    const month = padS(currentDate.getMonth() + 1);
    const year = currentDate.getFullYear();
    const hours = padS(currentDate.getHours());
    const minutes = padS(currentDate.getMinutes());
    const seconds = padS(currentDate.getSeconds());
    const dateTimeString = day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
    document.getElementById('datetime').textContent = dateTimeString;
}
setInterval(updateDateTime, 1000); 
updateDateTime();


//Find Pets
document.addEventListener("DOMContentLoaded", () => {
    const findForm = document.getElementById('findForm');
    findForm.addEventListener('submit', (event) => {

        let isValid = true;
        let errorMessage = '';

        if (!findForm.querySelector('input[name="animal"]:checked')) {
            isValid = false;
            errorMessage += 'Please select an animal type.\n';
        }
        if (!findForm.querySelector('input[name="breed"]').value.trim() && 
            !findForm.querySelector('input[name="breed"][value="Doesn\'t Matter"]').checked) {
            isValid = false;
            errorMessage += 'Please enter a breed or select "Doesn\'t Matter".\n';
        }
        if (!findForm.querySelector('select[name="age"]').value) {
            isValid = false;
            errorMessage += 'Please select an age.\n';
        }
        if (!findForm.querySelector('input[name="gender"]:checked')) {
            isValid = false;
            errorMessage += 'Please select a gender.\n';
        }
        if (!findForm.querySelector('input[name="dogs"]:checked') &&
        !findForm.querySelector('input[name="cats"]:checked') &&
        !findForm.querySelector('input[name="children"]:checked')) {
        isValid = false;
        errorMessage += 'Please select at least one compatibility option.\n';
        }
        if (!isValid) {
            alert(errorMessage);
            event.preventDefault(); 
        }
    });
});

//GiveAway
document.addEventListener("DOMContentLoaded", () => {
    const giveawayForm = document.getElementById('giveawayForm');
    giveawayForm.addEventListener('submit', (event) => {

        let isValid = true;
        let errorMessage = '';

        if (!giveawayForm.querySelector('input[name="animal"]:checked')) {
            isValid = false;
            errorMessage += 'Please select an animal type.\n';
        }
        if (!giveawayForm.querySelector('input[name="breed"]').value.trim()) {
            isValid = false;
            errorMessage += 'Please enter a breed.\n';
        }
        if (!giveawayForm.querySelector('select[name="age"]').value) {
            isValid = false;
            errorMessage += 'Please select an age.\n';
        }
        if (!giveawayForm.querySelector('input[name="gender"]:checked')) {
            isValid = false;
            errorMessage += 'Please select a gender.\n';
        }
        if (!giveawayForm.querySelector('input[name="dogs"]:checked') &&
            !giveawayForm.querySelector('input[name="cats"]:checked') &&
            !giveawayForm.querySelector('input[name="children"]:checked')) {
            isValid = false;
            errorMessage += 'Please select at least one compatibility option.\n';
        }  
        if (!giveawayForm.querySelector('textarea[name="info"]').value.trim()) {
        isValid = false;
        errorMessage += 'Please provide additional information about your animal.\n';
        }
        if (!giveawayForm.querySelector('input[name="gname"]').value.trim()) {
            isValid = false;
            errorMessage += 'Please enter the given name.\n';
        }
        if (!giveawayForm.querySelector('input[name="fname"]').value.trim()) {
            isValid = false;
            errorMessage += 'Please enter the family name.\n';
        }
        const email = giveawayForm.querySelector('input[name="Email"]').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            isValid = false;
            errorMessage += 'Please enter a valid email.\n';
        }
        if (!isValid) {
            alert(errorMessage);
            event.preventDefault(); 
        }
    });
});




document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('findForm');
    const petContainer = document.createElement('div');
    petContainer.className = 'pet-list';
    document.querySelector('.content').appendChild(petContainer);

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        petContainer.innerHTML = '';

        
        const animal = form.elements['animal'].value;
        const breed = form.elements['breed'].value.toLowerCase();
        const age = form.elements['age'].value;
        const gender = form.elements['gender'].value;
        const dogs = form.elements['dogs'].checked;
        const cats = form.elements['cats'].checked;
        const children = form.elements['children'].checked;

        const filteredPets = pets.filter(pet => {
            return (animal === '' || pet.breed.includes(animal)) &&
                   (breed === '' || pet.breed.toLowerCase().includes(breed)) &&
                   (age === 'Doesn\'t Matter' || (pet.age >= getAgeRange(age)[0] && pet.age <= getAgeRange(age)[1])) &&
                   (gender === 'Doesn\'t Matter' || pet.gender === gender) &&
                   (dogs === false || pet.breed.includes('Dog')) &&
                   (cats === false || pet.breed.includes('Cat')) &&
                   (children === false || pet.description.includes('Small Children'));
        });

    
        filteredPets.forEach(pet => {
            const petDiv = document.createElement('div');
            petDiv.className = 'pet-item';

            petDiv.innerHTML = `
                <img src="${pet.image}" alt="${pet.name}">
                <h3>${pet.name}</h3>
                <p>Breed: ${pet.breed} (${pet.gender})</p>
                <p>Age: ${pet.age} years</p>
                <p>${pet.description}</p>
            `;

            petContainer.appendChild(petDiv);
        });
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
});

document.querySelector('form').addEventListener('submit', function(event){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,}$/;

    if (!usernameRegex.test(username)) {
        alert("Invalid username format. It should only contain letters and digits.");
        event.preventDefault();
    }

    if (!passwordRegex.test(password)) {
        alert("Invalid password format. It should be at least 4 characters long, with at least one letter and one digit.");
        event.preventDefault();
    }
})