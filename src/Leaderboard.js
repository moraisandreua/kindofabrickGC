import React, { useEffect, useState } from 'react';
import './Leaderboard.css';

export default function Leaderboard(props) {
    const [ranking, setRanking] = useState({});
    const [rankingShow, setRankingShow] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(async ()=>{
        await fetch("https://kindofabrick.pythonanywhere.com/points/filter2").then((response) => response.json()).then((data)=>{
            var tempDict = {};
            var limit = (parseInt(props.limit)>=0) ? parseInt(props.limit) : 100000;

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
            
            await fetch("https://kindofabrick.pythonanywhere.com/points/filter2?kob="+termo).then((response) => response.json()).then((data)=>{
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

  return (<>
    <div className="containerLeaderboard">
		<div className="leaderboard">
			<div className="headLeaderboard">
				<i className="fas fa-crown"></i>
				<h1>{props.title}</h1>
			</div>
			<div className="bodyLeaderboard">
                <input style={{width:"100%", padding:"10px", fontFamily:"pixelart", fontSize:"12pt", backgroundColor:"black", border:"2px solid white", color:"white"}} placeholder="search for your KOB (KOB #1234)" onKeyDown={filterResults}/>
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
                            <li key={props.limit+"entry_"+entry["address"]+"_"+entry["kob"]+"_"+game+"_"+entry["points"].toString().replace("-", "")}>
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