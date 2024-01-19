import './App.css';
import Home from './components/Home';
import Events from './components/Events';
import CreateEvent from './components/CreateEvent';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { Routes, Route, useNavigate, useParams} from "react-router-dom"
import { useCelo } from '@celo/react-celo';
import { newKitFromWeb3 } from "@celo/contractkit";
import Web3 from "web3";
import { ContractABI } from './components/ContractABI';
import Modal from './components/Modal';
import Event from './components/Event';
import EventRegistration from './components/EventRegistration';
require('dotenv').config();


function App() {
  const navigate = useNavigate()
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const formattedTime = currentDate.toLocaleTimeString()
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [hostName, sethostName] = useState("");
  const [date,setDate] = useState(formattedDate);
  const [time,setTime]  = useState(formattedTime)
  const [totalFund, setTotalFund] = useState(0);
  const [amountRaised, setAmountRaised] = useState(0);
  const {id} = useParams()



  useEffect(() => {
    // Call getEvents() when the component mounts
    getEvents();
    /*const intervalId = setInterval(() => {
      getEvents();
    }, 3000);
    return () => clearInterval(intervalId);*/
  }, []);

  useEffect(() => {
    // Call getEventById() when the component mounts
    getEventById(id)
    console.log(event)
  }, [id])


 
  const web3 = new Web3(window.ethereum);

  const ContractAbi =  ContractABI;

  const ContractAddress = "0x6Ab62A0a42a204730Bab7E9bA19657C477a5b249";
  const Contract =  new web3.eth.Contract(ContractAbi, ContractAddress, {
    from: '0xF1a2fb3A8FeFe5ddeEb03AC6081b941d553b038b', // default from address
    // default gas price in wei, 20 gwei in this case
    });

    const PRIVATE_KEY = "0x46fb9d3f419a890b0e20d11a289976be9f482a766639754e60832985855a6c16";
    const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
    const gasPrice = web3.eth.getGasPrice();

    const getEvents = async () => {
      try {
        const eventLength = await Contract.methods.getTotalEvents().call();
        console.log(eventLength);
    
        const fetchedEvents = [];
    
        for (let i = 0; i < eventLength; i++) {
          const event = await Contract.methods.getEvent(i).call();
    
          const newEvent = {
            id: i,
            name: event[0],
            description: event[1],
            hostName: event[2],
            date: event[3],
            time: event[4],
            totalFund: event[5],
            amountRaised: event[6]
          };
    
          fetchedEvents.push(newEvent);
        }
    
        // Update the events state with the fetched events array
        setEvents(fetchedEvents);
      } catch (error) {
        // Handle any errors that may occur during contract method calls
        console.error("Error retrieving events:", error);
      }
    };
    
     const getEventById = async(id) =>{
        try {
          const eventData = await Contract.methods.eventById(id).call();
          console.log(eventData)
          setEvent(eventData)
        } catch (error) {
          console.error("Error retrieving event data:", error);
        }
     }

   /* const createEvent = async(_name,_image, _description, _hostName, _totalFund,_amountRaised) => {
        try {
         await account;
        await Contract.methods
        .createEvent(_name, _image,_description, _hostName, _totalFund,_amountRaised)
        .send({from: account.address, gas:200000});
        console.log(createEvent(_name,_image, _description, _hostName, _totalFund,_amountRaised))
       getEvents(); 
       }catch(error){
         alert(error);
        }
     
       }

    const handleSubmit = (e)=> {
        e.preventDefault();
        Contract.methods.createEvent(name, image, description, hostName, parseInt(totalFund), amountRaised).send({from:account.address})
          console.log(Contract.methods.createEvent(name, image, description, hostName, parseInt(totalFund), amountRaised).send({from:account.address}));
        getEvents()
        console.log(getEvents().then(data=>console.log(data.name)));
          navigate('/events')
      }*/

  /*const nameChange = (e) => {
    setName(e.target.value)
  }
  const descChange = (e) => {
    setDescription(e.target.value)
  }
  const hashChange = (e) => {
    sethostName(e.target.value)
  }
  const totalChange = (e) => {
    setTotalFund(e.target.value)
  }
  const amountChange = (e) => {
    setAmountRaised(e.target.value)
  }*/
  /*const amountChange = (e) => {
    setAmount(e.target.value)
  }*/
 /* console.log(typeof(parseInt(totalFund)))*/

  /*async function allEventForm(){
    const eventts = await Contract.methods.totalEvents().call();
    console.log(Contract.methods.totalEvents());
    for(var i=0; i<= eventts; i++)
      var event =  await Contract.methods.eventById(i).call();
      events.push([event]);
      setEvents((prevState)=> ([...prevState, events]))
  }*/
 
  const {connect, address} = useCelo();
  async function getAccountSummary() {
    const accounts = await kit.contracts.getAccounts()
    const data = await accounts.getAccountSummary(address)
    console.log(accounts)
    console.log(data)
  }
  
  const handleNext = ()=> {
    navigate('/create')
  }
  
  
  
  const kit = newKitFromWeb3(web3);
  
  kit.connection.addAccount(account.privateKey);
  kit.defaultAccount = account.address;

  const account2 = "";
  
  /*async function fundEventById(eventId){
    await account;
    const amount = amountRaised;
    await Contract.methods
    .fundEventById(eventId)
    .send({from: account.address, value: amount})
  }*/

   /* const getEvents = useCallback(async()=> {
    const events = [];
    const eventLength = await Contract.methods.getTotalEvents();
    console.log(eventLength)
    for(let i=0; i<= eventLength; i++) {
      let _events = new Promise(async (resolve, reject)=> {
        var event =  await Contract.methods.getEvent(i);
      console.log(event);
      resolve({
        id: i,
        name: event[0],
        description: event[1],
        hash: event[2],
        totalFund: event[3]
      });
    });
      events.push(_events);
      }
      let _events = await Promise.all(events);
      setEvents((prevState)=> ([...prevState, _events]));
  });*/
 
  
  return (
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create' element={<CreateEvent />} />
          <Route path='/events' element={<Events events={events} />}/>
          <Route path='/events/:id' element={<Event  getEventById={getEventById} event={event} />}/>            
          <Route path='/registration' element={<EventRegistration/>}/>
      </Routes>
  );
}

export default App;
