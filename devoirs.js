Autor: NAMA NKOA GUERSHOM
const getFoods = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  // POURQUOI map() AVANT filter() ?
  // On utilise .map() en premier pour transformer les données brutes
  // de l'API en objets simples avec seulement id, name, category, price.
  // Si on faisait .filter() en premier, on travaillerait sur des données
  // brutes avec 10+ champs inutiles, ce qui rendrait le code plus compliqué.
  // map() prépare les données, filter() les sélectionne ensuite.

  // Exigence 1 — Transformation
  const foods = data.map(item => ({
    id: item.id,
    name: item.name,
    category: item.company.bs,
    price: item.id * 500
  }));

  // DIFFERENCE ENTRE map() ET filter() ?
  // .map() transforme chaque élément, le tableau résultat a TOUJOURS
  // le même nombre d'éléments.
  // .filter() sélectionne certains éléments, le tableau résultat a
  // MOINS d'éléments ou autant.

  // Exigence 2 — Filtrage
  const filterByCategory = (keyword) => {
    return foods.filter(food =>
      food.category.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  // POURQUOI TRANSFORMER LES DONNEES AVANT AFFICHAGE ?
  // Les données brutes contiennent des champs inutiles et des formats
  // non adaptés. En transformant avec .map(), on obtient des données
  // propres, structurées et prêtes à afficher directement.

  // Exigence 3 — Affichage
  const displayFoods = (foods) => {

    // Exigence 4 — Cas vide
    if (foods.length === 0) {
      console.log("Aucun plat trouve !");
      return;
    }

    foods.forEach(food => {
      console.log(`
[ PLAT ]  ${food.name.toUpperCase()}
Categorie : ${food.category}
Prix      : ${food.price} FCFA
──────────────────────────────
      `);
    });
  };

  // Exigence 5 — Statistiques
  const resultat = filterByCategory("e-enable");
  console.log(`Total des plats    : ${foods.length}`);
  console.log(`Resultats filtres  : ${resultat.length}`);
  console.log(`──────────────────────────────`);

  // BONUS 1 — Trier par prix
  const trierParPrix = (foods) => {
    return foods.sort((a, b) => a.price - b.price);
  };

  // BONUS 2 — Filtrer vegetariens
  const filterVegetarien = (foods) => {
    return foods.filter(food =>
      food.category.toLowerCase().includes("e-enable")
    );
  };

  // BONUS 3 — console.table()
  const vegetariens = filterVegetarien(foods);
  const tries = trierParPrix(vegetariens);
  console.log("--- Plats vegetariens tries par prix ---");
  console.table(tries);

  // Affichage final
  displayFoods(resultat);

};

getFoods();
