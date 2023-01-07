import React, {useEffect, useState} from 'react';
import reddot from "./images/reddot.svg";
import api from '../../api';
import {Link} from 'react-router-dom';

function TopStreamers(){

    const [topStreamers, setTopStreamers] = useState([]);

    useEffect(() => {

        const fetchData = async () => {

            const result  = await api.get('https://api.twitch.tv/helix/streams');

            let dataArray = result.data.data;
            // console.log(dataArray);    

            let gameIDs = dataArray.map(stream => {
                return stream.game_id;
            })            
            let userIDs = dataArray.map(stream => {
                return stream.user_id;
            })
            // console.log(gameIDs, userIDs);

            // Création des URLs personnalisées
            let baseUrlGames = "https://api.twitch.tv/helix/games?";
            let baseUrlUsers = "https://api.twitch.tv/helix/users?";

            let gamesQueryParams = "";
            let usersQueryParams = "";

            gameIDs.map(id => {
                return (gamesQueryParams = gamesQueryParams + `id=${id}&`);
            })            
            userIDs.map(id => {
                return (usersQueryParams = usersQueryParams + `id=${id}&`);
            })

            // URL finale
            let urlFinalGames = baseUrlGames +  gamesQueryParams;
            let urlFinalUsers = baseUrlUsers +  usersQueryParams;
            // console.log(urlFinalGames);
            // console.log(urlFinalUsers);

            let getGames = await api.get(urlFinalGames);
            let getUsers = await api.get(urlFinalUsers);

            let gamesArray = getGames.data.data;
            let usersArray = getUsers.data.data;
            // console.log(gamesArray, usersArray);

            // Résultat final

            let finalArray = dataArray.map(stream => {

                stream.gameTitle = "";
                stream.userPicture = "";
                stream.userLogin = "";

                gamesArray.forEach(title => {
                    usersArray.forEach(user => {
                        if(stream.game_id === title.id && stream.user_id === user.id) {
                            stream.gameTitle = title.name;
                            stream.userPicture = user.profile_image_url;
                            stream.userLogin = user.login;
                        }
                    })
                })

                let newUrl = stream.thumbnail_url
                .replace('{width}', "320")
                .replace('{height}', "180");

                stream.thumbnail_url = newUrl;

                return stream;


            })

            setTopStreamers(finalArray);

        }

        fetchData();

    }, [])

    // console.log(topStreamers);
    
    return(

        <div className="topStreamers">

            <h2>Parcourir : Top streams</h2>
            
            <div className="topStreamersLives">

                <div className="streamersLivesList">

                    {topStreamers.map((stream, index) => (

                        <Link to={{pathname: `/live-streamer/${stream.userLogin}`}}>

                            <div key={index} className="streamerLiveCard">

                                <div className="streamerLiveImg">
                                    <img src={stream.thumbnail_url} alt="top-game-poster"/>
                                </div>
                                <div className="streamerLiveTag">
                                    <span>Live</span>
                                </div>
                                <div className="streamerLiveMeta">
                                    <div className="streamerLiveIntro">
                                        <img className="streamerLivePicture" src={stream.userPicture} alt="user-picture"/>
                                        <div>
                                            <h2>{stream.user_name}</h2>
                                            <p>{stream.gameTitle}</p>
                                        </div>
                                    </div>
                                    <div className="streamerLiveRedDotViewersWatch">
                                        <div className="streamerLiveRedDotViewers">
                                            <img className="streamerLiveRedDot" src={reddot} alt="red-dot"/>
                                            <span className="streamerLiveViewers">{stream.viewer_count}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </Link>

                    ))}

                </div>
                
            </div>

        </div>

    )
}

export default TopStreamers;