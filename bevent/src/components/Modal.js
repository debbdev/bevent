import React from 'react'
import logo from '../assets/images/bnug-logo.svg';
import './Modal.css';
import { useCelo } from '@celo/react-celo';
import { useNavigate} from "react-router-dom"
import { newKitFromWeb3 } from "@celo/contractkit";
import Web3 from "web3";


export default function Modal({setIsOpen}) {
    const navigate = useNavigate()
    const {connect, address} = useCelo();
    const web3 = new Web3(window.ethereum);
    const kit = newKitFromWeb3(web3);
    const PRIVATE_KEY = "0x46fb9d3f419a890b0e20d11a289976be9f482a766639754e60832985855a6c16";
    const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
    kit.connection.addAccount(account.privateKey);
    kit.defaultAccount = account.address;
    
    const handleCreate = ()=> {
      navigate('/create')
    }
    const handleView = ()=> {
        navigate('/events')
      }
    
    async function getAccountSummary() {
        const accounts = await kit.contracts.getAccounts()
        const data = await accounts.getAccountSummary(address)
        console.log(accounts)
        console.log(data)
      }

    return (
    <div className='darkBG'>
        <div className='box centered'>
        <button className='closeBtn' onClick={()=>setIsOpen(false)}>x</button>
    <h4 className='box-header'> Connect to a DeFi wallet</h4>
    <div className='box-block'>
        <h5 className='box-text'>By connecting your wallet, you agree to BNUG DAO<span><a href='https://web-dapp-bnug.vercel.app'>Terms of Service</a></span> and 
        acknowledge that you have read and indeed, understood the <span><a href='https://web-dapp-bnug.vercel.app'>BNUGDAO Group protocol disclaimer.</a></span>
        </h5>
    </div>
        <>
        {address ? (<div > 
        <h4 className='blockBox'>Connected to <span>{address}</span></h4> 
        <div className='walletBtns'>
            <button className='wallet-btn' onClick={handleCreate}>Create Event</button>
            <button className='wallet-btn' onClick={handleView}>View Events</button>
        </div>
        </div>) : 
        (<div className='inner-block'>
            <button  className='blockBtn' onClick={connect}> Connect Wallet </button>
            <img src={logo} alt="name"></img>
        </div>)
        }
        </>
    </div>
    </div>
  )
}
