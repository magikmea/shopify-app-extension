import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import ABI from "./assets/nft.abi.json"

let account;
let provider;
let web3Modal;
let web3;

async function getWeb3Modal() {
  const web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: false,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "995b087f3910499a829e5e460ca55e5c",
        },
      },
    },
  });
  return web3Modal;
}

/* invoke this function to prompt user and connect wallet */
async function connectWallet() {
  try {
    web3Modal = await getWeb3Modal();
    const connection = await web3Modal.connect();
    provider = new Web3Provider(connection);
    const accounts = await provider.listAccounts();
    console.log({ accounts });
    if (accounts.length === 0) return;

    const selectedAccount = accounts[0];
    account = selectedAccount;

    document.querySelector("#crypto-wallet-button").innerHTML = selectedAccount;
    fetchUserAccount();
    fetchIfUserHasAnNFTFromContract("0xed5af388653567af2f388e6224dc7c4b3241c544");
  }
  catch (err) {
    console.log('error in fetchingUserAccount and NFT', err);
  }
  //const discountForAccount = await getDiscountCodeForAccount(accounts);
  //if (!discountForAccount) return;
  //alert("Discount has been applied!");
  //window.location.href = `/discount/${discountForAccount}`; // this will apply the discount
}

async function fetchUserAccount() {
  try {
    web3 = new Web3(provider);
    console.log("Web3 instance is", web3);
    const chainId = await web3.eth.getChainId();
    // Load chain information over an HTTP API
    //const chainData = evmChains.getChain(chainId);
    console.log('chainId', chainId);
  }
  catch (err) {
    console.log('error during chainId')
  }
  // Get connected chain id from Ethereum node

  //console.log('chainData', chainData);

}

async function fetchIfUserHasAnNFTFromContract(contractaddress) {
  try {
    const contractAddress = contractaddress;
    const erc721 = new ethers.Contract(contractAddress, ABI, provider);
    console.log('erc721', erc721);
    const result = await erc721.balanceOf(account)
    const name = await erc721.name();
    const num = web3.utils.hexToNumber(result)
    console.log('this address has ', num, ' ', name)
  } catch (err) {
    console.log(err, 'error in fetching NFT balance and name')
  }
}

async function getDiscountCodeForAccount(accounts) {
  // TODO: check if account is eligible for discount on the backend
  // Generate one time unique discount code using https://shopify.dev/api/admin-rest/2021-07/resources/discountcode#[post]/admin/api/2021-07/price_rules/%7Bprice_rule_id%7D/discount_codes.json

  // const contractAddress = 'GET FROM BACKEND';
  // const erc20 = new ethers.Contract(contractAddress, ABI, provider);
  // const balance = await erc20.balanceOf(accounts)
  return "pepe";
}

async function disconnectWallet() {
  console.log('pressed disconnected')
  account = null;
}

async function toggleConnection() {
  if (account === null)
    connectWallet();
  else
    disconnectWallet();
}



const button = document.querySelector("#crypto-wallet-button");
button.addEventListener("click", () => toggleConnection());