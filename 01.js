BASE_URL = "http://localhost:3000"

async function getAllData() {  
    const res = await axios(`${BASE_URL}/operators`);
    drawcards(res.data);
}

const cards = document.querySelector(".cards")


function drawcards(arr){
    cards.innerHTML = ""
    arr.forEach(element => {
        const card = document.createElement("div")

        card.classList.add("card")

        card.innerHTML= `
                <img src="${element.icon}">
                <p class="name">${element.id}</p>
                <p class="title">${element.email}</p>`
        
        
        cards.appendChild(card)
    });

    
}

getAllData()