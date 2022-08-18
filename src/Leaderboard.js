import React, { useEffect, useState } from 'react';
import './Leaderboard.css';
import gameIcon from './assets/gamesIcon.png';
import game1Icon from './assets/racingMastersIcon.png';
import game2Icon from './assets/towerBuildingIcon.png';
import game3Icon from './assets/hextrisIcon.png';
import game4Icon from './assets/pacmanIcon.png';
import game5Icon from './assets/hexglIcon.png';

export default function Leaderboard(props) {
    const apiURL="https://skillskopeserver.hopto.org:5001"; // https://kindofabrick.pythonanywhere.com // http://127.0.0.1:5000 // https://skillskopeserver.hopto.org:5001

    const [ranking, setRanking] = useState({});
    const [rankingShow, setRankingShow] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [gameInfo, setGameInfo] = useState([ ["Select the game", gameIcon, 0],["Racing Masters", game1Icon, 1],["Tower Building", game2Icon, 2],["Hextris", game3Icon, 3],["Pacman", game4Icon, 4],["HexGl", game5Icon, 5] ]);

    const selectIconFilter = (name) => {
        var temp = gameInfo.filter((el)=>el[0]==name).concat(gameInfo.filter((el)=>el[0]!=name));
        setGameInfo(temp);
        filterGameResults(temp[0][2]);
    }

    useEffect(async ()=>{
        await fetch(apiURL+"/points/filter2").then((response) => response.json()).then((data)=>{
            var tempDict = {};
            var limit = (parseInt(props.limit)>=0) ? parseInt(props.limit) : 100000;

            if(data.length==0){
                tempDict[0]=[{"address":"no", "kob":"plays", "points":"yet"}];
            }else{
                for(var i=0; i<data.length; i++){
                    if(!Object.keys(tempDict).includes(data[i]["game"])){
                        tempDict[data[i]["game"]]=[{"address":data[i]["address"], "kob":data[i]["kob"], "points":data[i]["points"]}];
                    }else if(tempDict[data[i]["game"]].length < limit){
                        tempDict[data[i]["game"]].push({"address":data[i]["address"], "kob":data[i]["kob"], "points":data[i]["points"]});
                    }
                }
            }

            setRanking(tempDict);
            setResults(tempDict, searchTerm);
        });
    }, []);

    const setResults = (source, termo) => {
        var tempDict={}
        
        Object.keys(source).map((game)=>
        {source[game].map((entry)=>
            {if(entry["kob"].toString().includes(termo)){
                if(tempDict[game]==null || tempDict[game]==undefined){
                    tempDict[game]=[entry];
                }else{
                    tempDict[game].push(entry);
                }
            }})})

        setRankingShow(tempDict);
    }

    const filterResults = async (e) => {
        if (e.keyCode === 13) {
            setRanking({});
            var termo = e.target.value.toLowerCase().replace("kob", "").replace(" ", "").replace("#", "").trim();
            
            await fetch(apiURL+"/points/filter2?kob="+termo+"&gameId="+gameInfo[0][2]).then((response) => response.json()).then((data)=>{
                var tempDict = {};
                var limit = (parseInt(props.limit)>=0) ? parseInt(props.limit) : 25;

                if(data.length==0){
                    tempDict[data[i]["game"]]=[{"address":"no", "kob":"plays", "points":"yet"}];
                }else{
                    for(var i=0; i<data.length; i++){
                        if(!Object.keys(tempDict).includes(data[i]["game"])){
                            tempDict[data[i]["game"]]=[{"address":data[i]["address"], "kob":data[i]["kob"], "points":data[i]["points"]}];
                        }else if(tempDict[data[i]["game"]].length < limit){
                            tempDict[data[i]["game"]].push({"address":data[i]["address"], "kob":data[i]["kob"], "points":data[i]["points"]});
                        }
                    }
                }

                setRanking(tempDict);
            });
        }
    }

    const filterGameResults = async (gameId) => {
        await fetch(apiURL+"/points/filter2?&gameId="+gameId).then((response) => response.json()).then((data)=>{
            var tempDict = {};
            var limit = (parseInt(props.limit)>=0) ? parseInt(props.limit) : 25;

            if(data.length==0){
                tempDict[0]=[{"address":"no", "kob":"plays", "points":"yet"}];
            }else{
                for(var i=0; i<data.length; i++){
                    if(!Object.keys(tempDict).includes(data[i]["game"])){
                        tempDict[data[i]["game"]]=[{"address":data[i]["address"], "kob":data[i]["kob"], "points":data[i]["points"]}];
                    }else if(tempDict[data[i]["game"]].length < limit){
                        tempDict[data[i]["game"]].push({"address":data[i]["address"], "kob":data[i]["kob"], "points":data[i]["points"]});
                    }
                }
            }

            setRanking(tempDict);
        });
    }

  return (<>
    <div className="containerLeaderboard">
        <div className="leaderboardSearchbar">
            <div className="leaderboardSearchbarControls">
                <div className='leaderboardSearchbarControlsIcon'>
                    {gameInfo.map((el)=><img key={"icon_" + el[0].replace(" ", "")} src={el[1]} onClick={() => selectIconFilter(el[0])}/>)}
                </div>
                
                {gameInfo[0][0]}
            </div>
            <div className="leaderboardSearchbarWrapper">
                
            </div>
            <div className="leaderboardSearchbarControls" style={{justifyContent:"flex-end"}}>
                <input placeholder="search for your KOB (KOB #1234)" onKeyDown={filterResults}/>
            </div>
            
        </div>

		<div className="leaderboard">
			<div className="bodyLeaderboard">
                <ul className="rankingHeader">
                    <li>
                        <div>KOB</div>
                        <div>Game</div>
                        <div>Points</div>
                    </li>
                </ul>
                {Object.keys(ranking).map((game)=>
                    <ol key={"gameGroup_"+game.replace(" ", "")}>
                        {ranking[game].map((entry)=>
                            <li className='rankingListItem' key={props.limit+"entry_"+entry["address"]+"_"+entry["kob"]+"_"+game+"_"+entry["points"].toString().replace("-", "")}>
                                <div>KOB #{entry["kob"]}</div>
                                <div>{game}</div>
                                <div>{entry["points"].toString().replace("-", "")}</div>
                            </li>
                        )}
                    </ol>)
                }
			</div>
		</div>
	</div>
  </>
  )
}