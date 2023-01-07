import React, {useState, useEffect} from 'react';
import api from '../../api';
import {Link, useParams} from 'react-router-dom';
import SearchError from '../SearchError/SearchError';

function Search(){

    let {slug} = useParams();

    const [result, setResult] = useState(true);
    const [streamerInfo, setStreamerInfo] = useState([]);

    let cleanSearch = slug.replace(/ /g,'');

    useEffect(() => {

        const fetchData = async () => {

            const result = await api.get(`https://api.twitch.tv/helix/users?login=${cleanSearch}`);

            // console.log(result)

            if(result.data.data.length === 0){
                setResult(false);
            } else {
                setStreamerInfo(result.data.data);
            }

        }

        fetchData();

    }, [cleanSearch])

    return(

        result ?

        <div className="search">
            
            <h2>Résultat de la recherche :</h2>

            {streamerInfo.map((stream, index) => (

                <div className="searchResult" key={index}>
                    <div className="searchResultImg">
                        <img src={stream.profile_image_url} alt=""/>
                    </div>
                    <div className="searchResultMeta">
                        <h3>{stream.display_name}</h3>
                        {stream.broadcaster_type ? (
                        <span className="spanYes">{stream.broadcaster_type}</span>
                        ) : (
                            <span className="spanNo">Streamer</span>
                        )}
                        <p>{stream.description}</p>
                        <Link to={{pathname: `/live-streamer/${stream.login}`}}>
                            <button>Regarder</button>
                        </Link>
                    </div>
                </div>

            ))}


        </div>

        :

        <SearchError/>

    )
}

export default Search;