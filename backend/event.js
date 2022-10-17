const ethers = require("ethers")
const exchangeAbi = require("../backend/abis/exchangeAbi.json")
require("dotenv").config();

async function main() {
    const exchangeAddress = "";
    const provider = new ethers.providers.WebSocketProvider(
        `wss://goerli.infura.io/ws/v3/${process.env.INFURA_WEBSOCKET}`
    );

    const contract = new ethers.Contract(exchangeAddress, provider);

    contract.on("buy", (_to, _tokenId, _amount) => {
        let buy = {
            To: _to,
            TokenIdBuy: _tokenId,
            AmountBuy: _amount,
        };
        console.log(JSON.stringify(buy));
    });

    contract.on("sell", (_tokenId, amount, adminAmount) => {
        let sell = {
            tokenIdSell: _tokenId,
            AmountSell: amount,
            AdminAmount: adminAmount,
        };
        console.log(JSON.stringify(sell))
    });
}

main();