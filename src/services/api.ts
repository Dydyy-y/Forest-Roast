const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; //meta : objet fourni par vite pour accéder aux variables d'environnement (propriété de import) ; obligatoire car .env pas fichier JS classique

interface HeaderOptions {
  includeAuth?: boolean; //savoir si on ajoute JWT
  contentType?: "json" | "form" | "multipart" | "none"; //contentType : indique le format envoyé dans le body ; multipart : envoyer des fichiers ; none : requete sans body (ex: GET)
  accept?: string; //format de reponse
  customHeaders?: Record<string, string>; //customHeaders : ajouter autre type pas prévu au cas ou ; Record : utilitaire ts pour créer un type objet (clé valeur) : necessaire car http est une paires nom valeur de str
}

/**
 * @param options options de configuration des headers
 * @returns objet headers pour fetch()
 */
const getHeaders = (options: HeaderOptions = {}): HeadersInit => {
  const {
    //valeurs par défaut
    includeAuth = false,
    contentType = "json",
    accept = "application/json",
    customHeaders = {},
  } = options; //destructuration, on extrait les valeurs de options et on leur donne des valeurs par défaut si elles ne sont pas fournies

  const headers: HeadersInit = {
    //objet final qui contient toutes les info header qui sera envoye a fetch
    Accept: accept, //type de réponse qu'on attend du serveur
    "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8", //langue préférée (français par défaut, puis anglais) ; le serveur peut utiliser ça pour renvoyer des messages d'erreur traduits ; q : pondération
    "X-Requested-With": "XMLHttpRequest",
    /* X-Requested-With : Standard pour identifier les requêtes AJAX ((Asynchronous JavaScript and XML) 
    Permet au serveur de distinguer une requête asynchrone d'une requête de navigation classique.
    On signale que la requête provient d'un appel JavaScript (fetch, XMLHttpRequest) et non d'un clic direct dans le navigateur.*/
    "X-Client-Version": "1.0.0", //transmet la version sémantique (semantic versioning) de l'application cliente. Utilisé pour le versioning d'API et la rétrocompatibilité.
    "Cache-Control": "no-cache, no-store, must-revalidate", //Cache-Control : Désactive le cache navigateur pour les requêtes API ; pour avoir des data a jour
    Pragma: "no-cache", //Pragma : Cache control pour navigateurs anciens (IE11) ; on force le navigateur à TOUJOURS demander les données au serveur, sans utiliser de données sauvegardées localement.
  };

  //contentType : indique au serveur le type MIME (= Multipurpose Internet Mail Extensions ; identifie le type de données sur interne) et l'encodage des données contenues dans le corps de la requête (request body).
  switch (contentType) {
    case "json":
      headers["Content-Type"] = "application/json; charset=UTF-8"; //[] : notation bracket por acceder/modif une propriété ; remplate le point car l'objet contient - ; aplication : type MIME pour indiquer que le corps de la requête est du JSON ; charset : encodage des caractères (UTF-8 est standard pour le web) ; ça permet au serveur de parser correctement les données envoyées
      break;
    case "form":
      headers["Content-Type"] =
        "application/x-www-form-urlencoded; charset=UTF-8";
      break;
    case "multipart":
      break;
    case "none":
      break;
  }

  //Ajoute token JWT aux headers s'il existe, sinon avertit
  if (includeAuth) {
    const token = localStorage.getItem("auth_token"); //on va chercher JWT dans localStorage
    if (token) {
      headers["Authorization"] = `Bearer ${token}`; //[] : convention des headers http ; Bearer : =porteur ; schéma d'authentification standardisé (défini dans RFC 6750), veut dire celui qui porte ce token est autorisé
    } else {
      console.warn(
        "Authentication requested but no token found in localStorage",
      );
    }
  }

  Object.assign(headers, customHeaders); //Objet.assign : méthode statique de l'objet Object qui copie toutes les propriétés énumérables d'un ou plusieurs objets sources vers un objet cible. Ici, on fusionne les customHeaders dans notre objet headers final.

  return headers;
};

export { API_BASE_URL, getHeaders };