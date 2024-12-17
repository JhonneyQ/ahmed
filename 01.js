BASE_URL = "http://localhost:3000";

// Fetching all the data
async function getAllData() {
    const res = await axios(`${BASE_URL}/operators`);
    drawcards(res.data);
}

const add = document.querySelector(".add");

const a = document.querySelector(".img");
const b = document.querySelector(".id");
const c = document.querySelector(".unit");

const d = document.querySelector(".editID");
const e = document.querySelector(".editIMG");
const f = document.querySelector(".editUNIT");

add.addEventListener("click", async function addOperator() {
    await axios.post(`${BASE_URL}/operators`, {
        icon: a.value.trim(),
        id: b.value.trim(),
        unit: c.value.trim(),
    });
    getAllData();
});

const cards = document.querySelector(".cards");

function drawcards(arr) {
    cards.innerHTML = "";
    arr.forEach(element => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${element.icon}">
            <p class="name">${element.id}</p>
            <p class="title">${element.unit}</p>
            <button class="delete">delete</button>
            <button class="edit">edit</button>
        `;
        cards.appendChild(card);

        // Get the delete and edit buttons for the current card
        const del = card.querySelector(".delete");
        const edit = card.querySelector(".edit");

        // Delete button event listener
        del.addEventListener("click", async () => {
            await axios.delete(`${BASE_URL}/operators/${element.id}`)
            card.remove(); // Remove the card from DOM after deletion
        });

        // Edit button event listener
        edit.addEventListener("click", async function editOperator() {
            // Get new values for editing
            const newIcon = e.value.trim();
            const newId = d.value.trim();
            const newUnit = f.value.trim();

            // If the ID field is not empty, allow to edit
            if (newId && newIcon && newUnit) {
                await axios.patch(`${BASE_URL}/operators/${element.id}`, {
                    icon: newIcon,
                    id: newId,  // Ensure this field is allowed to be changed by your API
                    unit: newUnit
                });
                getAllData();
            } else {
                alert("Please fill in all fields before editing.");
            }
        });
    });
}

// Delete operator function
// async function deletedata(id) {
//     await axios.delete(`${BASE_URL}/operators/${id}`);
//     console.log(`Deleted operator with id: ${id}`);
// }

getAllData();
