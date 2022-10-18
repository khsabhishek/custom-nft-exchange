const ethers = require('ethers');
const exchangeAbi = require('../backend/abis/exchangeAbi.json');
require('dotenv').config();

async function main() {
  const exchangeAddress = '';
  const provider = new ethers.providers.WebSocketProvider(
    `wss://goerli.infura.io/ws/v3/${process.env.INFURA_WEBSOCKET}`,
  );

  const contract = new ethers.Contract(exchangeAddress, provider);

  contract.on('buy', (_to, _tokenId, _amount, event) => {
    let buy = {
      To: _to,
      TokenIdBuy: _tokenId,
      AmountBuy: _amount,
      dataBuy: event,
    };
    console.log(JSON.stringify(buy));
  });

  contract.on('sell', (_tokenId, amount, adminAmount, event) => {
    let sell = {
      tokenIdSell: _tokenId,
      AmountSell: amount,
      AdminAmount: adminAmount,
      dataSell: event,
    };
    console.log(JSON.stringify(sell));
  });
}

main();
