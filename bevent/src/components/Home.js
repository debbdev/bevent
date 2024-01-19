import React, {useState} from 'react';
import './Home.css';
import logo from '../assets/images/bnug-logo.svg';
import text from '../assets/images/bnugtext.svg';
import Modal from './Modal';

export default function Home() {
    const [isOpen, setIsOpen] = useState(false)
    return (
    <>
        <div className='wrapper'>
            <div className='container'>
                <a href='https://web-dapp-bnug.vercel.app'>
                    <img src={logo} alt="bnuglogo" ></img>
                    <img src={text} alt="bnugtext"></img>
                </a>
                <h3>...Earn rewards when you stake or provide liquidity into our pool</h3>
                <button className='btn' onClick={()=>setIsOpen(true)}>Connect to a DeFi wallet</button>
                {isOpen && <Modal setIsOpen={setIsOpen} />}
            </div>
            <div className='rewards'>
                <div><h3>Rewards</h3></div>
                <div className='rewards_container'>
                    <div className='rewards_box'>
                        <h4>Staking Rewards</h4>
                        <p>No wallet Connected! Please Connect a wallet to view and claim User Staking Rewards</p>
                    </div>
                    <div className='rewards_box'>
                        <h4>Liquidity Rewards</h4>
                        <p>No wallet Connected!Please Connect a wallet to view and claim User LP Rewards</p>
                    </div>
                    <div className='rewards_box rewards_black'>
                        <h4>Earn rewards when you stake or provide liquidity into our pool</h4>
                        <p>We're a DAO, Leveraging a strong community to build an inclusive financial ecosystem. We're agile, collaborative, diversified and transparent!</p>
                        <a href='https://web-dapp-bnug.vercel.app'>Start Earning</a>
                    </div>
                </div>
            </div>
            <div className='footer'>
               <div><a href='https://web-dapp-bnug.vercel.app'>Team</a></div> 
                <div><a href='https://web-dapp-bnug.vercel.app'>Support</a></div>
                <div><a href='https://web-dapp-bnug.vercel.app'>About BnugDAO</a></div>
                <div><a href='https://web-dapp-bnug.vercel.app'>Legal & Privacy</a></div>
                <div><a href='https://web-dapp-bnug.vercel.app'>Contact</a></div>
            </div>
        </div>
    </>
  )
}
