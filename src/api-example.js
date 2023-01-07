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

    REDIRECT = 'http://localhost/' (à ajouter aux URLs de redirection de la developer twitch console)

    AUTH LINK SAMPLE = 'https://id.twitch.tv/oauth2/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT}&response_type=token'

    Si une erreur 401 se produit malgré la mise en place du bearer, relancer le live server et obtenir un nouveau token bearer en copiant ensuite de nouveau le AUTH LINK dans le navigateur et en récupérant le token généré dans l'URL. 
*/

export default api;