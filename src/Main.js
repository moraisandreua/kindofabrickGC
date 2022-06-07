import React, { useEffect, useState } from 'react';
import './Main.css';
import './general.css';
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom';
import game1 from './assets/game1.png';
import game1_hover from './assets/game1_hover.png';
import game2 from './assets/game2.png';
import game2_hover from './assets/game2_hover.png';
import game3 from './assets/game3.png';
import game3_hover from './assets/game3_hover.png';
import game4 from './assets/game4.png';
import game4_hover from './assets/game4_hover.png';
import game5 from './assets/game5.png';
import game5_hover from './assets/game5_hover.png';
import game6 from './assets/game6.png';
import game6_hover from './assets/game6_hover.png';
import game7 from './assets/game7.png';
import game7_hover from './assets/game7_hover.png';
import game8 from './assets/game8.png';
import game8_hover from './assets/game8_hover.png';
import game9 from './assets/game9.png';
import game9_hover from './assets/game9_hover.png';
import game10 from './assets/game10.png';
import game10_hover from './assets/game10_hover.png';
import game11 from './assets/game11.png';
import game11_hover from './assets/game11_hover.png';
import game12 from './assets/game12.png';
import game12_hover from './assets/game12_hover.png';
import game13 from './assets/game13.png';
import game13_hover from './assets/game13_hover.png';
import game14 from './assets/game14.png';
import game14_hover from './assets/game14_hover.png';
import game15 from './assets/game15.png';
import game15_hover from './assets/game15_hover.png';
import game16 from './assets/game16.png';
import game16_hover from './assets/game16_hover.png';
import game17 from './assets/game17.png';
import game17_hover from './assets/game17_hover.png';
import game18 from './assets/game18.png';
import game18_hover from './assets/game18_hover.png';
import game19 from './assets/game19.png';
import game19_hover from './assets/game19_hover.png';
import game20 from './assets/game20.png';
import game20_hover from './assets/game20_hover.png';
import game21 from './assets/game21.png';
import game21_hover from './assets/game21_hover.png';
import game22 from './assets/game22.png';
import game22_hover from './assets/game22_hover.png';
import game23 from './assets/game23.png';
import game23_hover from './assets/game23_hover.png';
import game24 from './assets/game24.png';
import game24_hover from './assets/game24_hover.png';
import game25 from './assets/game25.png';
import game25_hover from './assets/game25_hover.png';
import game26 from './assets/game26.png';
import game26_hover from './assets/game26_hover.png';
import game27 from './assets/game27.png';
import game27_hover from './assets/game27_hover.png';
import game28 from './assets/game28.png';
import game28_hover from './assets/game28_hover.png';
import game29 from './assets/game29.png';
import game29_hover from './assets/game29_hover.png';
import game30 from './assets/game30.png';
import game30_hover from './assets/game30_hover.png';
import game31 from './assets/game31.png';
import game31_hover from './assets/game31_hover.png';
import game32 from './assets/game32.png';
import game32_hover from './assets/game32_hover.png';
import game33 from './assets/game33.png';
import game33_hover from './assets/game33_hover.png';
import game34 from './assets/game34.png';
import game34_hover from './assets/game34_hover.png';
import game35 from './assets/game35.png';
import game35_hover from './assets/game35_hover.png';
import game36 from './assets/game36.png';
import game36_hover from './assets/game36_hover.png';
import game37 from './assets/game37.png';
import game37_hover from './assets/game37_hover.png';
import game38 from './assets/game38.png';
import game38_hover from './assets/game38_hover.png';
import game39 from './assets/game39.png';
import game39_hover from './assets/game39_hover.png';
import game40 from './assets/game40.png';
import game40_hover from './assets/game40_hover.png';
import game41 from './assets/game41.png';
import game41_hover from './assets/game41_hover.png';
import game42 from './assets/game42.png';
import game42_hover from './assets/game42_hover.png';
import game43 from './assets/game43.png';
import game43_hover from './assets/game43_hover.png';
import game44 from './assets/game44.png';
import game44_hover from './assets/game44_hover.png';
import discord_icon from './assets/discord_icon.png';
import twitter_icon from './assets/twitter_icon.png';
import jpg_icon from './assets/jpg_icon.png';
import search_icon from './assets/searchIcon.png';
import advertiseHere1 from './assets/advertiseHere1-01.svg';
import p2egame from './assets/p2egame.png';
import unknownBrick from './assets/unknownBrick.png';
import footerBanner from './assets/footerBanner.png';

// wallet icons
import namiWalletIcon from './assets/namiWallet.png';
import eternlWalletIcon from './assets/eternlWallet.png';
import flintWalletIcon from './assets/flintWallet.png';
import yoroiWalletIcon from './assets/yoroiWallet.png';
import typhonWalletIcon from './assets/typhonWallet.png';

//import NamiWalletApi, { Cardano } from './nami-js';
import blockfrostApiKey from '../config.js'; 
let nami;

export default function Main() {
  const [walletIcons, setWalletIcons] = useState([ ["nami", namiWalletIcon], ["eternl", eternlWalletIcon], ["flint", flintWalletIcon], ["yoroi", yoroiWalletIcon], ["typhon", typhonWalletIcon] ]); // set the order of wallet icons
  const [viewAll, setViewAll] = useState(false)
  const [viewAllReleases, setViewAllReleases] = useState(false)

  const [connected, setConnected] = useState()
  const [address, setAddress] = useState()
  const [nfts, setNfts] = useState([])
  const [balance, setBalance] = useState()
  const [addrShort, setAddrShort] = useState()
  const [choosenGame, setChoosenGame] = useState()
  const [choosenGame2, setChoosenGame2] = useState()
  const [previousChoosenGame, setPreviousChoosenGame] = useState(false)
  const [particlesOff, setParticlesOff] = useState(false)

  // game -> name, foto, fotoHover, holding number, category
  const games=[
    ["Racing Masters", game1, game1_hover,1],
    ["Tower Building", game2, game2_hover,3],
    ["Hextris", game9, game9_hover,0],
    ["Pacman", game44, game44_hover,15],
    ["HexGL", game5, game5_hover,0],
    ["Mimstris", game6, game6_hover,3],
    ["Astray", game7, game7_hover,15],
    ["Clumsy Bird", game8, game8_hover,1],
    ["Pocket Island", game3, game3_hover,3],
    ["Pixel Defense", game10, game10_hover,15],
    ["OPHOG", game11, game11_hover,1],
    ["Radius Raid", game12, game12_hover,0],
    ["Circus Charly", game13, game13_hover,3],
    ["Breaklock", game14, game14_hover,0],
    ["Diablo-JS", game15, game15_hover,15],
    ["Duck Hunt", game16, game16_hover,3],
    ["Minesweeper", game17, game17_hover,1],
    ["Infinite Mario", game18, game18_hover,0],
    ["Tap Tap Adventure", game19, game19_hover,15],
    ["The Original Tetris", game20, game20_hover,0],
    ["Alien Invasion", game21, game21_hover,1],
    ["Sleeping Beauty", game22, game22_hover,0],
    ["One More Enigma", game23, game23_hover,3],
    ["Escape The Room Enigma", game24, game24_hover,15],
    ["Fading Snake", game25, game25_hover,0],
    ["AI Snake", game26, game26_hover,1],
    ["3D Snake", game27, game27_hover,1],
    ["Snake", game28, game28_hover,1],
    ["Gameboy Tetris", game29, game29_hover,1],
    ["Memory Blocks", game30, game30_hover,3],
    ["Flappy DINO", game31, game31_hover,3],
    ["Flappy Ring", game32, game32_hover,15],
    ["Flappy Block", game33, game33_hover,15],
    ["Flappy Text", game34, game34_hover,0],
    ["Traffic Run", game35, game35_hover,0],
    ["Tower Blocks", game36, game36_hover,0],
    ["The Cube", game37, game37_hover,3],
    ["Crossy Road", game38, game38_hover,3],
    ["Rabbit Game", game39, game39_hover,1],
    ["The Aviator", game40, game40_hover,1],
    ["Solitaire", game41, game41_hover,3],
    ["Coronavirus Shooting Game", game42, game42_hover,1],
    ["Pinball", game43, game43_hover,0],
    ["2048", game4, game4_hover, 15], 
  ]

  const playNow=[
    ["1","Racing Masters",game1,3],
    ["2","Tower Building",game2,1],
    ["3","Hextris",game9,1],
    ["4","Kind of Pacman",game44,0]
  ]

  useEffect(()=>{
    window.addEventListener("keydown", function(e) {
      if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
          e.preventDefault();
      }
    }, false);

    /*async function t() {

        const S = await Cardano();
        nami = new NamiWalletApi(
            S,
            window.cardano,
          blockfrostApiKey
        )

        if (await nami.isInstalled()) {
            await nami.isEnabled().then(result => { setConnected(result); getAddress(); })
        }
    }

    t()
    init();*/
  }, []);

  /*const connect = async () => {
    // Connects nami wallet to current website 
    await nami.enable()
        .then(result => {setConnected(result); getAddress();})
        .catch(e => console.log("error: ",e))
  }

  const getAddress = async () => {
      // retrieve address of nami wallet
      /*if (!connected) {
          await connect()
      }*/
      /*await nami.getAddress().then((newAddress) => { setAddress(newAddress);  setAddrShort(newAddress.substring(0,6) + "..." + newAddress.substring(newAddress.length-6, newAddress.length)); getBalance(); })
  }

  const getBalance = async () => {
      /*if (!connected) {
          await connect()
      }*/
      /*await nami.getBalance().then(result => { setNfts(result.assets.filter((el) => {return el.policy=="e00352bf7e5623ab63afb8cf05b3ee1e90bd8af9457bba9f28a7c8b6"}));})
  }*/

  const init = () => {
    //console.log(window.cardano)
  }

  const scrollIntoView = (e) =>{
      e.preventDefault();

      document.querySelector(e.target.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  }

  const selectWalletToConnect= (walletName) => {
    var temp=[]
    walletIcons.map((el) => {if(el[0]==walletName) temp.push(el)});
    walletIcons.map((el) => {if(el[0]!=walletName) temp.push(el)});
    setWalletIcons(temp);
  }

  return (
      <div className="container containerMain">
        <div className='mainContainer'>
          <div className='mainAdvertisements'>
            <div className='mainAdvertisementCard'>
              <img src={advertiseHere1}/>
            </div>
            <div className='mainAdvertisementCard'>
              <img src={advertiseHere1}/>
            </div>
          </div>
        </div>

        <div className='navbar'>
          <a href="#">P2E GAMES & TOURNAMENTS</a> | <a href="#">LEADERBOARDS</a> | <a href="#">RENT SPACES</a> | <a href="#">MERCHANDISING</a> | <a href="#">MARKETPLACE</a> | <a href="#">ABOUT</a> | <a href="#">TEAM</a> | <a href="#">FAQ</a> | <a href="#">HALL OF FAME</a>
        </div>

        <div className='mainDestaquesContainer'>
          <div className='mainDestaques'>
            <div className='Badge0Holder' style={{bottom:"40px", right:"84px"}}>0+ Holders</div>
            {/* image here */}
          </div>
        </div>

        <div className='catalogContainer'>
          <div className='catalogTopbar'>
            <div className='catalogTopbarTitle'>Play Now</div>
            <div className='catalogTopbarWrap'></div>
            <div className='catalogTopbarViewAll'><button onClick={()=>{setViewAll(!viewAll)}}> {(!viewAll) ? "VIEW ALL +" : "VIEW LESS -"} </button></div>
          </div>
          <div className='catalogList'>
            {playNow.map((el, i)=>
              (!viewAll && i<3) ? <Link to="/game" key={"gameCard_"+el[0]}><div className='catalogListItem'>
                <div className='catalogListItemCard'>
                  <div className='catalogListItemCardHover' style={{backgroundImage:"url("+el[2] + ")"}}></div>
                  <div className='catalogListItemCardHover' style={{background:"linear-gradient(to top, #000, transparent)"}}>
                    {el[1]}
                  </div>
                  <div className={'Badge'+el[3]+'Holder'} style={{bottom:"0px", right:"0px", borderRadius:"10px 0px 10px 0px", fontSize:"10pt", padding:"5px 15px"}}>{el[3]}+ Holders</div>
                </div>
              </div></Link> : (viewAll) ? <Link to="/game" key={"gameCard_"+el[0]}><div className='catalogListItem'>
                <div className='catalogListItemCard'>
                  <div className='catalogListItemCardHover' style={{backgroundImage:"url("+el[2] + ")"}}></div>
                  <div className='catalogListItemCardHover' style={{background:"linear-gradient(to top, #000, transparent)"}}>
                    {el[1]}
                  </div>
                  <div className={'Badge'+el[3]+'Holder'} style={{bottom:"0px", right:"0px", borderRadius:"10px 0px 10px 0px", fontSize:"10pt", padding:"5px 15px"}}>{el[3]}+ Holders</div>
                </div>
              </div></Link> : <div></div>
            )}
          </div>

          <div className='catalogAdvertisement'>
            <div className='catalogAdvertisementCard'>
              <img src={advertiseHere1}/>
            </div>
            <div className='catalogAdvertisementCard'>
              <img src={advertiseHere1}/>
            </div>
            <div className='catalogAdvertisementCard'>
              <img src={advertiseHere1}/>
            </div>
          </div>

          <div className='catalogTopbar'>
            <div className='catalogTopbarTitle'>Next Releases</div>
            <div className='catalogTopbarWrap'></div>
            <div className='catalogTopbarViewAll'><button onClick={()=>{setViewAllReleases(!viewAllReleases)}}> {(!viewAllReleases) ? "VIEW ALL +" : "VIEW LESS -"} </button></div>
          </div>
          <div className='nextReleasesList'>
            {games.map((el, i)=>
              (!viewAllReleases && i>=playNow.length && i<10+playNow.length) ? <div key={"releaseCard_"+i} className='nextReleasesListItem'>
                <div className='nextReleasesListItemCard'>
                  <div className='nextReleasesListItemCardImageContainer'>
                    <img className='nextReleasesListItemCardImage' src={el[1]}/>
                  </div>
                  <div className='nextReleasesListItemCardTitle'>{el[0]}</div>
                  <div className='nextReleasesListItemCardSubtitle'>Arcade</div>
                  <div className='nextReleasesListItemCardWrapper'></div>
                  <div className={"nextReleasesListItemCardHolders Badge"+el[3]+"Holder"}>{el[3]}+ Holders</div>
                </div>
              </div> : (viewAllReleases && i>=playNow.length) ? <div key={"releaseCard_"+i} className='nextReleasesListItem'>
                <div className='nextReleasesListItemCard'>
                  <div className='nextReleasesListItemCardImageContainer'>
                    <img className='nextReleasesListItemCardImage' src={el[1]}/>
                  </div>
                  <div className='nextReleasesListItemCardTitle'>{el[0]}</div>
                  <div className='nextReleasesListItemCardSubtitle'>Arcade</div>
                  <div className='nextReleasesListItemCardWrapper'></div>
                  <div className={"nextReleasesListItemCardHolders Badge"+el[3]+"Holder"}>{el[3]}+ Holders</div>
                </div>
              </div> : <div style={{display:"none"}}></div>
            )}
          </div>

          <div className='catalogAdvertisement'>
            <div className='catalogAdvertisementCard'>
              <img src={advertiseHere1}/>
            </div>
            <div className='catalogAdvertisementCard'>
              <img src={advertiseHere1}/>
            </div>
            <div className='catalogAdvertisementCard'>
              <img src={advertiseHere1}/>
            </div>
          </div>

          <div className='catalogTopbar'>
            <div className='catalogTopbarTitle'>Cardano Projects P2E Games</div>
            <div className='catalogTopbarWrap'></div>
          </div>

          <div className='p2eGameList'>
            <div className='p2eGameListItem'>
              <div className='p2eGameListItemCard'>
                <div className='p2eGameListItemCardImageContainer'>
                  <img className='p2eGameListItemCardImage' src={p2egame}/>
                </div>
                <div className='p2eGameListItemCardTitle'>Project Name</div>
                <div className='p2eGameListItemCardSubtitle'>Game Name</div>
                <div className={"p2eGameListItemCardHolders Badge3Holder"}>10 WL Spots</div>
              </div>
            </div>
            <div className='p2eGameListItem'>
              <div className='p2eGameListItemCard'>
                <div className='p2eGameListItemCardImageContainer'>
                  <img className='p2eGameListItemCardImage' src={p2egame}/>
                </div>
                <div className='p2eGameListItemCardTitle'>Project Name</div>
                <div className='p2eGameListItemCardSubtitle'>Game Name</div>
                <div className={"p2eGameListItemCardHolders Badge3Holder"}>Free Mint</div>
              </div>
            </div>
            <div className='p2eGameListItem'>
              <div className='p2eGameListItemCard'>
                <div className='p2eGameListItemCardImageContainer'>
                  <img className='p2eGameListItemCardImage' src={p2egame}/>
                </div>
                <div className='p2eGameListItemCardTitle'>Project Name</div>
                <div className='p2eGameListItemCardSubtitle'>Game Name</div>
                <div className={"p2eGameListItemCardHolders Badge3Holder"}>5 Free Mints</div>
              </div>
            </div>
            <div className='p2eGameListItem'>
              <div className='p2eGameListItemCard'>
                <div className='p2eGameListItemCardImageContainer'>
                  <img className='p2eGameListItemCardImage' src={p2egame}/>
                </div>
                <div className='p2eGameListItemCardTitle'>Project Name</div>
                <div className='p2eGameListItemCardSubtitle'>Game Name</div>
                <div className={"p2eGameListItemCardHolders Badge3Holder"}>25 WL Spots</div>
              </div>
            </div>
            <div className='p2eGameListItem'>
              <div className='p2eGameListItemCard'>
                <div className='p2eGameListItemCardImageContainer'>
                  <img className='p2eGameListItemCardImage' src={p2egame}/>
                </div>
                <div className='p2eGameListItemCardTitle'>Project Name</div>
                <div className='p2eGameListItemCardSubtitle'>Game Name</div>
                <div className={"p2eGameListItemCardHolders Badge3Holder"}>Special NFT</div>
              </div>
            </div>
            <div className='p2eGameListItem'>
              <div className='p2eGameListItemCard'>
                <div className='p2eGameListItemCardImageContainer'>
                  <img className='p2eGameListItemCardImage' src={p2egame}/>
                </div>
                <div className='p2eGameListItemCardTitle'>Project Name</div>
                <div className='p2eGameListItemCardSubtitle'>Game Name</div>
                <div className={"p2eGameListItemCardHolders Badge3Holder"}>$100 Token</div>
              </div>
            </div>
          </div>

          <div className='catalogAdvertisement'>
            <div className='catalogAdvertisementCard'>
              <img src={advertiseHere1}/>
            </div>
            <div className='catalogAdvertisementCard'>
              <img src={advertiseHere1}/>
            </div>
            <div className='catalogAdvertisementCard'>
              <img src={advertiseHere1}/>
            </div>
          </div>

          <div className='catalogTopbar'>
            <div className='catalogTopbarTitle'>Trading Bricks</div>
            <div className='catalogTopbarWrap'></div>
            <div className='catalogTopbarViewAll'><button onClick={()=>{setViewAllReleases(!viewAllReleases)}}> {(!viewAllReleases) ? "VIEW ALL +" : "VIEW LESS -"} </button></div>
          </div>

          <div className='p2eGameList'>
            <div className='p2eGameListItem'>
              <div className='p2eGameListItemCard'>
                <div className='p2eGameListItemCardImageContainer'>
                  <img className='p2eGameListItemCardImage' src={unknownBrick}/>
                </div>
                <div className='p2eGameListItemCardTitle'>Unknow Brick</div>
                <div className='p2eGameListItemCardSubtitle'>Scoring Point: 0</div>
                <div className={"p2eGameListItemCardHolders Badge3Holder"}>0 ADA</div>
              </div>
            </div>
            <div className='p2eGameListItem'>
              <div className='p2eGameListItemCard'>
                <div className='p2eGameListItemCardImageContainer'>
                  <img className='p2eGameListItemCardImage' src={unknownBrick}/>
                </div>
                <div className='p2eGameListItemCardTitle'>Unknow Brick</div>
                <div className='p2eGameListItemCardSubtitle'>Scoring Point: 0</div>
                <div className={"p2eGameListItemCardHolders Badge3Holder"}>0 ADA</div>
              </div>
            </div>
            <div className='p2eGameListItem'>
              <div className='p2eGameListItemCard'>
                <div className='p2eGameListItemCardImageContainer'>
                  <img className='p2eGameListItemCardImage' src={unknownBrick}/>
                </div>
                <div className='p2eGameListItemCardTitle'>Unknow Brick</div>
                <div className='p2eGameListItemCardSubtitle'>Scoring Point: 0</div>
                <div className={"p2eGameListItemCardHolders Badge3Holder"}>0 ADA</div>
              </div>
            </div>
            <div className='p2eGameListItem'>
              <div className='p2eGameListItemCard'>
                <div className='p2eGameListItemCardImageContainer'>
                  <img className='p2eGameListItemCardImage' src={unknownBrick}/>
                </div>
                <div className='p2eGameListItemCardTitle'>Unknow Brick</div>
                <div className='p2eGameListItemCardSubtitle'>Scoring Point: 0</div>
                <div className={"p2eGameListItemCardHolders Badge3Holder"}>0 ADA</div>
              </div>
            </div>
            <div className='p2eGameListItem'>
              <div className='p2eGameListItemCard'>
                <div className='p2eGameListItemCardImageContainer'>
                  <img className='p2eGameListItemCardImage' src={unknownBrick}/>
                </div>
                <div className='p2eGameListItemCardTitle'>Unknow Brick</div>
                <div className='p2eGameListItemCardSubtitle'>Scoring Point: 0</div>
                <div className={"p2eGameListItemCardHolders Badge3Holder"}>0 ADA</div>
              </div>
            </div>
            <div className='p2eGameListItem'>
              <div className='p2eGameListItemCard'>
                <div className='p2eGameListItemCardImageContainer'>
                  <img className='p2eGameListItemCardImage' src={unknownBrick}/>
                </div>
                <div className='p2eGameListItemCardTitle'>Unknow Brick</div>
                <div className='p2eGameListItemCardSubtitle'>Scoring Point: 0</div>
                <div className={"p2eGameListItemCardHolders Badge3Holder"}>0 ADA</div>
              </div>
            </div>
          </div>
        </div>

        <div className='mainDestaquesContainer' style={{paddingTop:"50px", paddingLeft:"0px", paddingRight:"0px"}}>
          <div className='mainDestaques'>
            <img className='mainDestaquesAd' src={advertiseHere1}/>
          </div>
        </div>

        <div className='mainDestaquesContainer' style={{paddingTop:"50px", paddingLeft:"0px", paddingRight:"0px"}}>
          <div className='mainDestaques'>
            <img className='mainDestaquesAd' src={footerBanner}/>
          </div>
        </div>
        
        <div className='initFooter'>
          <a href="https://twitter.com/kindoabrick" target="_blank"><img src={twitter_icon} /></a>
          <a href="https://discord.gg/kindoabrick" target="_blank"><img src={discord_icon} /></a>
          <a href="https://www.jpg.store/collection/kindofabrick" target="_blank"><img src={jpg_icon} style={{height:"25px", width:"auto"}} /></a>
        </div>
      </div>
  )
}