import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import {
    Address,
    Value,
} from "@emurgo/cardano-serialization-lib-asmjs"
import { Buffer } from "buffer";
import Loader from "./nami-js/loader";
import './General.css';
import Main from './Main';
import Game from './Game';
import Leaderboard from './Leaderboard';

import logo from './assets/logotype.png';
import search_icon from './assets/searchIcon.png';
import noKobs_icon from './assets/noKobs.png';
import loadingKobNumbers from './assets/loadingKobNumber.gif';
import loadingAddress from './assets/loadingAddress.gif';

// wallet icons
import namiWalletIcon from './assets/namiWallet.png';
import eternlWalletIcon from './assets/eternlWallet.png';
import flintWalletIcon from './assets/flintWallet.png';
import yoroiWalletIcon from './assets/yoroiWallet.png';
import typhonWalletIcon from './assets/typhonWallet.png';

export default function General() {
    const [selectedGameId, setSelectedGameId] = useState(0);
    const apiURL="https://skillskopeserver.hopto.org:5001"; // https://kindofabrick.pythonanywhere.com // http://127.0.0.1:5000 // https://skillskopeserver.hopto.org:5001

    const [cardanoFoundWallets, setCardanoFoundWallets] = useState([]);
    const [walletIcons, setWalletIcons] = useState([ ["nami", namiWalletIcon], ["eternl", eternlWalletIcon], ["flint", flintWalletIcon], ["yoroi", yoroiWalletIcon], ["typhoncip30", typhonWalletIcon] ]); // set the order of wallet icons

    const [whichWalletSelected, setWhichWalletSelected] = useState(undefined);
    const [walletFound, setWalletFound] = useState(false);
    const [walletIsEnabled, setWalletIsEnabled] = useState(false);
    const [walletName, setWalletName] = useState(undefined);
    const [walletAPIVersion, setWalletAPIVersion] = useState(undefined);

    const [balance, setBalance] = useState(undefined);
    const [usedAddress, setUsedAddress] = useState(undefined);
    const [usedAddressShortened, setUsedAddressShortened] = useState(undefined);
    const [noKobs, setNoKobs] = useState(0)
    const [kobList, setKobList] = useState([])

    const [searchingForKobs, setSearchingForKobs] = useState(false);
    const [searchingForAddress, setSearchingForAddress] = useState(false);

    const [ipAddress, setIpAddress] = useState(null)

    const [apikey, setApiKey] = useState(undefined);

    var API = null;
      
    const pollWallets = (count = 0) => {
        if(count==0){
            setSearchingForAddress(true);
        }

        const wallets = [];
        for(const key in window.cardano) {
            if (window.cardano[key].enable && wallets.indexOf(key) === -1) {
                wallets.push(key);
            }
        }
        if (count < 3) {
            setTimeout(() => {
                pollWallets(count + 1);
            }, 1000);
            //return;
        }

        if(count==3){
            setSearchingForAddress(false);
            if (localStorage.getItem("lastUsedWallet") !== null) {
                setWhichWalletSelected(localStorage.getItem("lastUsedWallet"))
                orderWalletIcons(localStorage.getItem("lastUsedWallet"));
            }
        }
        
        setCardanoFoundWallets(wallets);
    }

    const orderWalletIcons = (walletKey) => {
        var temp = []

        temp.push(walletIcons.filter((el)=>el[0]==walletKey)[0]);

        walletIcons.filter((el)=>el[0]!=walletKey).map((el)=>{
            if(el[0]!=walletKey) temp.push(el);
        })
        
        setWalletIcons(temp)
    }

    const checkIfWalletEnabled = async () => {
        let walletIsEnabled = false;

        try {
            const walletName = whichWalletSelected;
            walletIsEnabled = await window.cardano[walletName].isEnabled();
        } catch (err) {
            console.log(err)
        }
        setWalletIsEnabled(walletIsEnabled);

        return walletIsEnabled;
    }

    const checkIfWalletFound = () => {
        const walletKey = whichWalletSelected;
        const walletFound = !!window?.cardano?.[walletKey];
        console.log(window.cardano)
        setWalletFound(walletFound);
        return walletFound;
    }

    const getAPIVersion = () => {
        const walletKey = whichWalletSelected;
        const walletAPIVersion = window?.cardano?.[walletKey].apiVersion;
        setWalletAPIVersion(walletAPIVersion);
        return walletAPIVersion;
    }

    const getWalletName = () => {
        const walletKey = whichWalletSelected;
        const walletName = window?.cardano?.[walletKey].name;
        setWalletName(walletName);
        return walletName;
    }

    const enableWallet = async () => {
        const walletKey = whichWalletSelected;
        try {
            API = await window.cardano[walletKey].enable();
            localStorage.setItem("lastUsedWallet", walletKey);
        } catch(err) {
            console.log(err);
        }
        return checkIfWalletEnabled();
    }

    const getBalance = async () => {
        try {
            const balanceCBORHex = await API.getBalance();

            const balance = Value.from_bytes(Buffer.from(balanceCBORHex, "hex")).coin().to_str();
            setBalance(balance)

        } catch (err) {
            console.log(err)
        }
    }

    const getUsedAddresses = async () => {

        try {
            const raw = await API.getUsedAddresses();
            const rawFirst = raw[0];
            const usedAddress = Address.from_bytes(Buffer.from(rawFirst, "hex")).to_bech32()
            setUsedAddress(usedAddress);
            setUsedAddressShortened(usedAddress.substring(0,5) + "..." + usedAddress.substring(usedAddress.length - 4, usedAddress.length));
            getNumberKobs(usedAddress);
        } catch (err) {
            console.log(err)
        }
    }

    const refreshData = async () => {
        //console.log("ola1")
        setSearchingForAddress(true);
        //console.log("ola2")

        try{
            //console.log("ola3.1")
            const walletFound = checkIfWalletFound();
            if (walletFound) {
                //console.log("ola4.1")
                await getAPIVersion();
                await getWalletName();
                const walletEnabled = await enableWallet();
                if (walletEnabled) {
                    //console.log("ola5.1")
                    await getBalance();
                    await getUsedAddresses();
                    
                } else {
                    //console.log("ola5.2")
                    setBalance(null);
                    setUsedAddress(null);
                }
            } else {
                //console.log("ola4.2")
                setWalletIsEnabled(false);

                setBalance(null);
                setUsedAddress(null);
            }
        } catch (err) {
            //console.log("ola3.2")
            console.log(err)
        }

        setSearchingForAddress(false);
    }

    const getNumberKobs = (addr) => {
        setSearchingForKobs(true);

        fetch(apiURL+"/assets?address="+addr, { mode: 'cors', headers: { 'Access-Control-Allow-Origin':'*' } }).then((data)=>data.json()).then((data)=>{
            setNoKobs(data["no_kobs"]);
            setSearchingForKobs(false);

            var tempKobList = [];
            for(var i=0; i<data["kobList"].length; i++){
                tempKobList.push("KOB #"+data["kobList"][i]);
            }

            setKobList(tempKobList);
        })
    }

    useEffect(()=>{

        pollWallets();
            
        fetch("https://api.ipify.org?format=json").then((data)=>{return data.json()}).then(data=>setIpAddress(data["ip"])).catch(()=>{console.log("there was an error on getting user's IP")});
    }, []);

    useEffect(()=>{
        if(whichWalletSelected != undefined)
            refreshData();
    }, [whichWalletSelected]);

    return (
        <div className="container">
            <Router>
            <div className="topFooter"><span style={{color:"red"}}>Brick</span>Games</div>

            <div className="topbar">
            <div className='topbarLogoContainer'>
                <Link to="/"><img src={logo} className="topbarLogo"/></Link>
                <Link to="/" style={{textDecoration:"None", color:"Black"}}><span className='topbarTitle'>KIND OF A BRICK</span></Link>
            </div>
            <div className='topbarFlexWrapper'></div>
            <div className='topbarControlsContainer'>
                <div className='topbarControlsContainerBadge'>{(!searchingForKobs) ? noKobs : <img src={loadingKobNumbers}/>}<img src={noKobs_icon}/></div>
                <span className='topbarConnectTitle' >{ (searchingForAddress) ? <img height="34px" src={loadingAddress}/> : (walletIsEnabled) ? usedAddressShortened : "connect " }</span>
                <div className='topbarConnectSelect'>
                {
                    walletIcons.map((el) => { return <img key={el[1]+"WalletIcon"} src={el[1]} onClick={() => {setWhichWalletSelected(el[0]); orderWalletIcons(el[0])}}/>})
                }
                </div>
            </div>
            <div className='topbarInputContainer'>
                <img src={search_icon} />
                <input className='topbarInput' placeholder='Search'/>
            </div>
            </div>
        
            
            <Switch>
                <Route exact path='/'><Main setGameId={setSelectedGameId}/></Route>
                <Route exact path='/game/:id'><Game address={usedAddress} listOfKobs={kobList} gameId={selectedGameId} ipAddress={ipAddress}/></Route>
                <Route exact path='/leaderboard'><Leaderboard /></Route>
            </Switch>
            </Router>
        </div>
      )
}