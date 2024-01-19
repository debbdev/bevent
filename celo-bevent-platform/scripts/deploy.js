
const {ethers} = require("hardhat");

async function main() {
    const EventFund = await ethers.getContractFactory("EventFund");
    const eventFund = await EventFund.deploy();

    const address = await eventFund.getAddress();
    console.log(`Event fund smart contract address: ${address}`);

}

main().catch((error)=> {
    console.log(error);
    process.exitCode = 1
})