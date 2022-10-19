const ethers = require('ethers');
import abi from '../src/abis/test.json';
// require('dotenv').config();

async function main() {
  const exchangeAddress = '';
  const provider = new ethers.providers.WebSocketProvider(
    `wss://mainnet.infura.io/ws/v3/7c29a074ebf044f18251c824fb11472f`,
  );

  const contract = new ethers.Contract(exchangeAddress, abi, provider);

  contract.on('Transfer', (from, to, value) => {
    let buy = {
      from: from,
      to: to,
      value: value,
    };
    console.log(JSON.stringify(buy));
  });

  //   contract.on('sell', (_tokenId, amount, adminAmount, event) => {
  //     let sell = {
  //       tokenIdSell: _tokenId,
  //       AmountSell: amount,
  //       AdminAmount: adminAmount,
  //       dataSell: event,
  //     };
  //     console.log(JSON.stringify(sell));
  //   });
}

main();
