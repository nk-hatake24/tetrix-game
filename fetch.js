const scoreUsers = document.getElementById('scoreUsers')
const table = document.createElement('table');
    table.classList.add('table');

    // Créer l'en-tête du tableau
    const tableHeader = document.createElement('thead');
    tableHeader.innerHTML = `
      <tr>
        <th>Nom</th>
        <th>Score</th>
      </tr>
    `;

const url = "http://localhost:3001/api/user/topscore";
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};


fetch(url, options)
  .then((response) => {
    // Vérifier le statut de la réponse
    if (response.ok) {
      // La requête a réussi
      return response.json();
    } else {
      // La requête a échoué
      throw new Error(`Erreur de requête : ${response.status}`);
    }
  })
  .then((data) => {
    // Traiter les données reçues de l'API
    console.log(data);
    console.log(data.topUsers)
    

    // Créer le corps du tableau
    const tableBody = document.createElement('tbody');
    data.topUsers.forEach(user => {
      const tableRow = document.createElement('tr');
      tableRow.innerHTML = `
        <td>${user.name}</td>
        <td>${user.score}</td>
      `;

      tableBody.appendChild(tableRow);
    });

    // Assembler le tableau
    table.appendChild(tableHeader);
    table.appendChild(tableBody);

    // Insérer le tableau dans le DOM
    scoreUsers.appendChild(table);
  })
  .catch((error) => {
    // Gérer les erreurs de requête
    console.error(error.message);
  });
