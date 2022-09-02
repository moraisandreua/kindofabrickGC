import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import game1 from './assets/game1.png';
import game2 from './assets/game2.png';
import game9 from './assets/game9.png';
import game44 from './assets/game44.png';
import game5 from './assets/game5.png';
import game45 from './assets/game45.png';
import game16 from './assets/game16.png';
import './Game.css';

export default function Game(props) {

  const params=useParams();
  const apiURL="https://skillskopeserver.hopto.org:5001"; // https://kindofabrick.pythonanywhere.com // http://127.0.0.1:5000 // https://skillskopeserver.hopto.org:5001/
  const gameURL="https://brickgames.io/game/"; // https://brickgames.io/game/ // http://localhost:8888/GAMECENTER/game

  const [ipAddress, setIpAddress] = useState()
  const [address, setAddress] = useState()
  const [kob, setKob] = useState()
  const [kobToken, setKobToken] = useState()
  const [gameId, setGameId] = useState(0);
  const [nfts, setNfts] = useState([])
  const [useRandom, setUseRandom] = useState(false)
  const [showGameHover, setShowGameHover] = useState(true)

  const aGames=[
    ["0","Loading","",0,"loading..."],
    ["1","Racing Masters",game1,3, "description"],
    ["2","Tower Building",game2,1, "description"],
    ["3","Hextris",game9,1, "description"],
    ["4","Kind of Pacman",game44,0, "description"],
    ["5","HexGL",game5,0, "description"],
    ["6","OnOff",game45 ,0, "description"],
    ["7","Duck Hunt",game16 ,0, "description"]
  ];

  useEffect(()=>{
    setAddress(props.address);
    setKob(props.kob);
    setNfts(props.listOfKobs);
    setIpAddress(props.ipAddress);
    setGameId(params.id);

    if(kob!=undefined && kob!=null){
      document.getElementById("game"+gameId).contentWindow.focus();
    }
  }, []);

  const selectKob = (e) => {
    var tempkob = e.target.value.toLowerCase().replace("kob", "").replace("#", "").replace(" ", "").trim();

    if(isNaN(tempkob)){
      alert("Please enter a valid KOB");
    }else{
      setKob(tempkob);

      fetch(apiURL+"/kob/token?kob="+tempkob, {method:"POST"}).then(response=>response.json()).then((data)=>{
        setKobToken(data["token"]);
      })
    }
  }

  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const playWithRandom = () => {
    setUseRandom(true);
  }

  return (
    <div className="container containerGame">
      <div className="containerGameWrapper" style={ (showGameHover)?{display:"flex"}:{display:"none"}}>
        <div style={{flexGrow:"1"}}></div>
        <div className='containerGameWrapperGameInfo'>
          <div className='containerGameWrapperGameInfoLogo'>
            <div className='containerGameWrapperGameInfoLogoContainer'>
              <img className='containerGameWrapperGameInfoLogoContainerImage' src={aGames[gameId][2]}/>
            </div>
          </div>
          <div className='containerGameWrapperGameInfoTitle'>
            {aGames[gameId][1]}
          </div>
          <div className='containerGameWrapperGameInfoButton'>
            <div className="Badge3Holder" style={{cursor:"pointer"}} onClick={()=>{setShowGameHover(false)}}>Play Now</div>
          </div>
        </div>
      </div>

        {(gameId && kobToken) ? <iframe src={gameURL+gameId+"/index.html?address="+address+"&token="+kobToken+"&ip_address="+ipAddress} width="644" height="516" id={"game"+gameId}></iframe> : (gameId && useRandom) ? <iframe src={gameURL+gameId+"/index.html?address="+address+"&ip_address="+ipAddress} width="644" height="516" id={"game"+gameId}></iframe> : <div></div>}
        
        {
          (!kob) ? (nfts.length>0) ? <select className="inputkob" onChange={selectKob}><option value="none" default>Select your KOB</option>{nfts.map((nft)=><option key={nft} value={nft}>{nft}</option>)}</select> : (!useRandom) ? <button onClick={playWithRandom} className="button-54 buttonPlay">Play with Random KOB</button> : <div></div> : <div></div>
        }

    </div>
  )
}