import React, {useState, useEffect} from 'react';
import api from '../../api';
import {Link} from 'react-router-dom';

function TopGames(){

    const [topGames, setTopGames] = useState([]);

    useEffect(() => {

        const fetchData = async() => {

            const result = await api.get('https://api.twitch.tv/helix/games/top');
            // console.log(result)

            let topGamesArray = result.data.data;
            // console.log(dataArray)

            let finalTopGamesArray =  topGamesArray.map(topGame => {

                let newImageUrl = topGame.box_art_url
                    .replace("{width}", "250")
                    .replace("{height}", "300");

                topGame.box_art_url = newImageUrl;

                return topGame;
                
            });
            
            setTopGames(finalTopGamesArray);
            
        }

        fetchData();

    }, [])

    // console.log(topGames);

    return(

        <div className="topGames">
            <h2>Parcourir : Top jeux</h2>
            <div className="topGamesContent">
                {topGames.map((topGame, index) => (

                    <Link to={{
                            pathname: "game-streams/" + topGame.name, 
                            state: {
                                gameID: topGame.id
                            }
                    }}
                    >
                        <div key={index} className="topGameCard">

                            <div className="topGameImage">
                                <img src={topGame.box_art_url} alt="top-game-poster"/>
                            </div>

                            <div className="topGameMeta">
                                <h2>{topGame.name}</h2>
                            </div>
                            <div className="topGameBtn">
                                    <button>Voir</button>
                            </div>

                        </div>
                    </Link>

                ))}
            </div>

        </div>

    )

}

export default TopGames;