const API_URL = "/users";

async function loadUsers() {
  const response = await fetch(API_URL);
  const users = await response.json();

  const list = document.getElementById("userList");
  list.innerHTML = "";

  users.forEach(user => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${user.name} - ${user.email} - ${user.age}
      <button onclick="deleteUser('${user.id}')">Excluir</button>
    `;
    list.appendChild(li);
  });
}

async function createUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value; // 👈 sem parseInt

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, age })
  });

  if (response.ok) {
    loadUsers();
  } else {
    const errorData = await response.json();
    console.log(errorData);
  }
}

async function deleteUser(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  loadUsers();
}

loadUsers();
