document.addEventListener("DOMContentLoaded", async function () {
    const userContainer = document.getElementById("container");
    const sortSelect = document.getElementById("select");
    const searchInput = document.getElementById("input");

    let users = [];

    async function fetchUsers() {
        try {
            const response = await fetch("https://randomuser.me/api/?results=100");
            const data = await response.json();
            users = data.results.map(user => ({
                name: `${user.name.first} ${user.name.last}`,
                age: user.dob.age,
                phone: user.phone,
                email: user.email,
                location: `${user.location.city}, ${user.location.country}`,
                picture: user.picture.large
            }));
            renderUsers(users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }
    function renderUsers(userList) {
        userContainer.innerHTML = "";
        userList.forEach(user => {
            const userCard = document.createElement("div");
            userCard.classList.add(
                "bg-white", 
                "border", 
                "border-gray-200", 
                "rounded-lg", 
                "p-6", 
                "mb-6", 
                "max-w-xs", 
                "shadow-lg", 
                "transition-transform", 
                "transform", 
                "hover:scale-105", 
                "hover:shadow-2xl"
            );
            userCard.innerHTML = `
                <img src="${user.picture}" alt="${user.name}" class="w-24 h-24 rounded-full mx-auto mb-4"/>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">${user.name}</h3>
                <p class="text-gray-600"><strong>Yosh:</strong> ${user.age}</p>
                <p class="text-gray-600"><strong>Telefon:</strong> ${user.phone}</p>
                <p class="text-gray-600"><strong>Email:</strong> ${user.email}</p>
                <p class="text-gray-600"><strong>Manzil:</strong> ${user.location}</p>
            `;
            userContainer.appendChild(userCard);
        });
    }
    
    function sortUsers(criteria) {
        if (criteria === "name") {
            users.sort((a, b) => a.name.localeCompare(b.name));
        } else if (criteria === "age") {
            users.sort((a, b) => a.age - b.age);
        }
        renderUsers(users);
    }

    function searchUsers(query) {
        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(query.toLowerCase())
        );
        renderUsers(filteredUsers);
    }

    sortSelect.addEventListener("change", () => {
        sortUsers(sortSelect.value);
    });

    searchInput.addEventListener("input", () => {
        searchUsers(searchInput.value);
    });

    fetchUsers();
});
