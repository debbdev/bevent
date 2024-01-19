// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract EventFund {
    struct Event {
        string name;
        string image;
        string description;
        string hostName;
        string date;
        string time;
        uint256 totalFund;
        uint256 amountRaised;
        address payable wallet;
    }
    event NewEventLog(string name, string description, string hostName,string date, string time, uint256 totalFund, uint256 amountRaised, address indexed wallet);
    event EventLog(string name, string image, string description, string hostName,string date, string time, uint256 totalFund, uint256 amountRaised, address indexed wallet);
    event EventTargetReached(address indexed wallet);

    mapping(uint => Event) public events;

    uint internal totalEventsCreated = 0;

    function createEvent(string memory _name,string memory _image, string memory _description, string memory _hostName,string memory _date, string memory _time, uint256 _totalFund, uint256 _amountRaised) public {
        
        events[totalEventsCreated] = Event({
        name: _name, 
        image: _image,
        description: _description,
        hostName: _hostName,
        date: _date,
        time: _time,
        totalFund: _totalFund,
        amountRaised: _amountRaised,
        wallet: payable(msg.sender)
    });
        totalEventsCreated++;
        
        emit NewEventLog(_name, _description, _hostName, _date, _time, _totalFund, 0, msg.sender);
    }

    function getEvent(uint256 _eventId) public view returns (string memory, string memory,string memory,string memory, string memory, uint256, uint256) {
        return (
            events[_eventId].name,
            events[_eventId].description,
            events[_eventId].hostName,
            events[_eventId].date,
            events[_eventId].time,
            events[_eventId].totalFund,
            events[_eventId].amountRaised
        );
    }

    function getTotalEvents() public view returns(uint256) {
        return (totalEventsCreated);
    }

    function eventById(uint _id) public view returns(string memory, string memory, string memory, string memory, string memory, uint256, uint256) {
        return (events[_id].name, events[_id].description, events[_id].hostName, events[_id].date, events[_id].time, events[_id].totalFund, events[_id].amountRaised);
    }

    function deleteEventById(uint256 _id) public {
        require(msg.sender == events[_id].wallet, "You did not create this event");
        delete events[_id];
    }

    function fundEventById(uint _id, uint _amount) public payable {
        Event storage eventt = events[_id];
        require(msg.sender != eventt.wallet);
        require (msg.value > 0, "CELO amount must be greater than 0");
        require (msg.value <= eventt.totalFund, "CELO amount must be less than total amount");
        require (eventt.amountRaised <= eventt.totalFund, "This event has reached it's target amount");
        eventt.amountRaised += msg.value;
        (bool sent, bytes memory response) = eventt.wallet.call{value:msg.value}("");
        require (sent, "Failed to send CELO");
        emit EventLog(eventt.name, eventt.image, eventt.description, eventt.hostName, eventt.date, eventt.time, eventt.totalFund, eventt.amountRaised, eventt.wallet);
    }
}