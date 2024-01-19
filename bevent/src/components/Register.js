import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Web3 from "web3";
import { useNavigate} from "react-router-dom"
import { ContractABI } from './ContractABI';

export default function Register({setIsOpen,event}) {
    const navigate = useNavigate();
    const [checked,setChecked] = useState('')
    const [amount,setAmount] = useState(0)
    const {id} = useParams()
    console.log(id)
    
    const web3 = new Web3(window.celo);


    //const accounts = kit.web3.eth.getAccounts()
      //kit.defaultAccount = accounts[0]

    const ContractAbi =  ContractABI;

    const ContractAddress = "0x6Ab62A0a42a204730Bab7E9bA19657C477a5b249";
    const Contract =  new web3.eth.Contract(ContractAbi, ContractAddress, {
    from: '0xF1a2fb3A8FeFe5ddeEb03AC6081b941d553b038b', // default from address
    // default gas price in wei, 20 gwei in this case
    });

    const PRIVATE_KEY1 = "0x46fb9d3f419a890b0e20d11a289976be9f482a766639754e60832985855a6c16";
    const account1 = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY1);
    const PRIVATE_KEY2 = "0x2d08aed05d3a8d3fd92e0038d08d1fde2ee4a2aa602d1946d2044ab2d9d5a924";
    const account2 = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY2);
    const gasPrice = web3.eth.getGasPrice();

    const account2a = "0xf0540EFa9621EE3805DddD7D240B5eDaeE743AE9";
    const handleRegister = async(e) => {
        e.preventDefault();
        try {
          const register = await Contract.methods.fundEventById(id,amount).send({from:account2.address, value: amount, gas: 100000})
          console.log(register)
          console.log("Transaction receipt:", register);
          console.log(account2.address)
          console.log(id)
          console.log(amount)
          console.log(register.status)
          if (register.status === 1n) {
            setIsOpen(false);
            navigate('/registration')
          } else {
            navigate('/events');
          }
          
        } catch (error) {
          console.error("Error sending amount:", error);
        }
        
      }
  return (
    <div className='darkBG'>
        <div className='box centered'>
        <button className='closeBtn' onClick={()=>setIsOpen(false)}>x</button>
    <h4 className='box-header'> Register for {event[0]}</h4>
    <div className='box-block'>
        <h5 className='box-text'>By connecting your wallet, you agree to BNUG DAO<span><a href='https://web-dapp-bnug.vercel.app'>Terms of Service</a></span> and 
        acknowledge that you have read and indeed, understood the <span><a href='https://web-dapp-bnug.vercel.app'>BNUGDAO Group protocol disclaimer.</a></span>
        </h5>
    </div>
        <>
        {id ? (<div > 
        <h4 className='blockBox'>Web3 Event Registration</h4> 
        <div className='formContainer'>
                        
                            <h3>Register For {event[0]}</h3>
                            <form className='formBlock' >
                                <div className='formChild'>
                                    <label for='id'>{event[0]}</label>
                                    <input type='number' placeholder='Event Id' name='id' value={id}/>
                                </div>
                                <div className='formChild'>
                                    <label for='amt'>Registration Fee</label>
                                    <input type='number' placeholder='Registration Fee' name='amt' onChange={(e)=>setAmount(e.target.value)} ></input>
                                </div>
                                <div className='formChild' onChange={(e) => setChecked(e.target.value)}>
                                    <label for='yes_no'>Would you be atanding this event?</label>
                                    <input type='radio' name='yes'value='Yes'/>Yes
                                    <input type='radio' name='no' value='No'/>No
                                </div>
                                <div className='formButton'> 
                                    <button className='button' type='button' name='submit' onClick={handleRegister}>SUBMIT</button>
                                </div>
                            </form>
                        
                    </div>
        </div>) : 
        (<div className='inner-block'>
            <p> Incorrect Event Id </p>
        </div>)
        }
        </>
    </div>
    </div>
  )
}
