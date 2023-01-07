import React, {useEffect, useState} from 'react';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import {useParams} from 'react-router-dom';
import api from '../../api';
import reddot from "./images/reddot.svg";

function LiveStreamer(){

    let {slug} =  useParams();
    // console.log(slug);

    const [infoStream, setInfoStream] = useState([]);
    const [infoGame, setInfoGame] = useState([]);

    useEffect(() => {

        const fetchData = async () => {

            const result = await api.get(`https://api.twitch.tv/helix/streams?user_login=${slug}`);

            if (result.data.data.length === 0) {
                setInfoStream(false);
            } else {

                
                // console.log(result);
                
                let gameID =  result.data.data.map(gameid => {
                    return gameid.game_id;
                })
                
                const resultGame = await api.get(`https://api.twitch.tv/helix/games?id=${gameID}`);
                
                // console.log(resultGameName);
                
                let gameTitle = resultGame.data.data.map(gameTitle => {
                    
                    return gameTitle.name;
                    
                })
                
                setInfoGame(gameTitle);
                setInfoStream(result.data.data[0]);
            
            }

        }

        fetchData();

    }, [])

    // console.log(infoStream)

    return (
        
        infoStream ?
            
        <div className="liveStreamer">
            <h2>Stream de {infoStream.user_name}</h2>
            <ReactTwitchEmbedVideo height="500px" width="100%" channel={slug}/>
            <div className="liveStreamerInfo">
                <div className="liveStreamerIntro">
                    {/* <img className="streamerLivePicture" src={newUrl} alt="user-picture"/> */}
                    <div>
                        <h2>{infoStream.user_name}</h2>
                        <p>{infoStream.title}</p>
                        <p className="liveStreamerLanguage">{infoStream.language}</p>
                    </div>
                </div>
                <div className="">
                    <div className="liveStreamerRedDotViewers">
                        <img className="liveStreamerRedDot" src={reddot} alt="red-dot"/>
                        <span className="">{infoStream.viewer_count}</span>
                    </div>
                </div>
            </div>
        </div >
            
        :

        <div className="liveStreamer">
            <ReactTwitchEmbedVideo height="500px" width="100%" channel={slug}/>
            <div className="liveStreamerInfo">
                <div>Le streamer est offline.</div>
            </div>
        </div>
    )
}

export default LiveStreamer;