import { ethers } from "ethers";
import { useEffect, useState } from "react";
import web3 from 'web3'
import axios from "axios";
import Web3Modal from "web3modal";
import Image from 'next/image'
import { nftmarketaddress, nftaddress } from "../config";

import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import { loadGetInitialProps } from "next/dist/next-server/lib/utils";

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [details, setDetails] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);

  
  async function loadNFTs() {
    
    
    const provider = new ethers.providers.JsonRpcProvider("https://rpc.testnet.fantom.network/")
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
    const data = await marketContract.fetchMarketItems()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = web3.utils.fromWei(i.price.toString(), 'ether');
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
      }
      return item
    }))
    console.log('maldito items: ', items[0].price)
    setNfts(items)
    const details = items.filter(i => i.tokenId)
    setDetails(details)
    console.log('details: ', details)
    //setLoaded('loaded') 
  }
  //if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets owned</h1>)
  return (
    <div className="flex justify-center">
      <div className="p-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
         
            {/* <img src="../images/fibbotest.png" className="rounded" /> */}
            {
            details.map((nft, i) => (
              <div key={i} className="border p-4 shadow max-w-xs">
                <Image src={nft.image} className="rounded" width="300px" height="250px" />
                <p className="text-2xl my-4 font-bold">Price paid: {nft.price}</p>
              </div>
            ))
          }
          
          
                  
          

          </div>
        </div>
      </div>
    
  );
}
