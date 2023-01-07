import React, {useEffect, useState} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import reddot from "./images/reddot.svg";
import api from '../../api';
import { Link } from 'react-router-dom';

function GameStreams(){

    let location = useLocation();
    // console.log(location);
    let {slug} = useParams();

    const [streamData, setStreamData] = useState([]);
    const [viewers, setViewers] = useState(0);

    useEffect(() => {

        const fetchData = async () => {

            const result = await api.get(`https://api.twitch.tv/helix/streams?game_id=${location.state.gameID}`);

            let dataArray = result.data.data;
            let finalDataArray = dataArray.map(stream => {

                let newURL = stream.thumbnail_url
                    .replace('{width}', "320")
                    .replace('{height}', "180");
                
                stream.thumbnail_url = newURL;

                return stream;

            })

            // Total viewers pour un jeu
            let totalViewers = finalDataArray.reduce((acc, val) => {

                return acc + val.viewer_count;

            }, 0);

            let userIDs = dataArray.map(stream => {

                return stream.user_id;

            })

            let baseUrl = "https://api.twitch.tv/helix/users?";
            let queryParamsUsers = "";

            userIDs.map(id => {

                return (queryParamsUsers = queryParamsUsers + `id=${id}&`);

            })

            let finalUrl = baseUrl + queryParamsUsers;

            let getUsersLogin = await api.get(finalUrl);

            let userLoginArray = getUsersLogin.data.data;

            finalDataArray = dataArray.map(stream => {

                stream.login = "";

                userLoginArray.forEach(login => {

                    if (stream.user_id === login.id) {
                        stream.login = login.login;
                    }

                })

                return stream;

            })

            setViewers(totalViewers);
            setStreamData(finalDataArray);

        }

        fetchData();

    }, [])

    // console.log(viewers);
    // console.log(streamData);

    return(

        <div className="gameStreams">

            <h2>Parcourir : Streams sur {slug}</h2>
            
            <div className="gameStreamsTotalViewersCount">
                <img className="gameStreamsTotalRedDot" src={reddot} alt="red-dot"/>
                <span className="gameStreamsTotalViewers">{viewers}</span>
                <span>&nbsp;spectateurs</span>
            </div>
            <div className="gameStreamsLives">

                <div className="gameStreamsList">

                    {streamData.map((stream, index) => (

                        <Link to={{pathname: `/live-streamer/${stream.login}`}}>

                            <div key={index} className="gameStreamsCard">

                                <div className="gameStreamsImg">
                                    <img src={stream.thumbnail_url} alt="top-game-poster"/>
                                </div>
                                <div className="gameStreamsTag">
                                    <span>Live</span>
                                </div>
                                <div className="gameStreamsMeta">
                                    <div className="gameStreamsIntro">
                                        {/* <img className="streamerLivePicture" src={stream.userPicture} alt="user-picture"/> */}
                                        <h2>{stream.user_name}</h2>
                                        <p>{stream.gameTitle}</p>
                                    </div>
                                    <div className="gameStreamsRedDotViewersWatch">
                                        <div className="gameStreamsRedDotViewers">
                                            <img className="gameStreamsRedDot" src={reddot} alt="red-dot"/>
                                            <span className="gameStreamsViewers">{stream.viewer_count}</span>
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

export default GameStreams;