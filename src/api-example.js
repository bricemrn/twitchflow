import axios from "axios";

let api = axios.create({
    headers: {
        'Client-ID': '',
        'Authorization': ''
    }
})

/* 
    Si erreur 401, il faut ajouter un token bearer d'authentification :
    
    CLIENT_ID = ''

    REDIRECT = 'http://localhost/' (aussi à ajouter aux URLs de redirection de la developer twitch console)

    AUTH LINK SAMPLE = 'https://id.twitch.tv/oauth2/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT}&response_type=token'

    Si une erreur 401 se produit malgré la mise en place du bearer, relancer le live server et obtenir un nouveau token bearer en copiant de nouveau le AUTH LINK SAMPLE dans la barre d'adresse du navigateur en remplaçant bien les paramètres CLIENT_ID et REDIRECT (sans les accolades), puis récupérer le token généré en retour dans l'URL. REDIRECT représente la base de l'URL de notre application (http://localhost, http://localhost:3000, etc.)
*/

export default api;