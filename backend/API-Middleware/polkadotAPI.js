
// Import
import { ApiPromise, WsProvider } from '@polkadot/api';


// Construct
const wsProvider = new WsProvider('wss://rpc.polkadot.io');
const api = await ApiPromise.create({ provider: wsProvider });

// Do something
export async function connectionTest(){
    ApiPromise
    .create({ provider: wsProvider })
    .then((api) => 
        console.log(api.genesisHash.toHex())
  );
}