const { calculateFee, GasPrice, isMsgSubmitProposalEncodeObject } = require("@cosmjs/stargate");
const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const { SigningCosmWasmClient, CosmWasmClient } = require("@cosmjs/cosmwasm-stargate");
const _ = require("fs");

// const rpcEndpoint = "https://bluechip.rpc.bluechip.link:443";
const rpcEndpoint = "http://localhost:26657";

const sender = {
    mnemonic: "bottom soccer blue sniff use improve rough use amateur senior transfer quarter",
    address: "bluechip14u53eghrurpeyx5cm47vm3qwugtmhcpnjvtxwj",
};

async function UploadAirdropContract() {
    const airdropWasm = "./wasms/airdrop.wasm";
    const gasPrice = GasPrice.fromString("0.05ubluechip");

    // Upload contract
    const sender_wallet = await DirectSecp256k1HdWallet.fromMnemonic(sender.mnemonic, { prefix: "bluechip" });
    const sender_client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, sender_wallet);
    const wasm = await _.readFileSync(airdropWasm);
    const uploadFee = await calculateFee(2_500_0000, gasPrice);
    const uploadVault = await sender_client.upload(sender.address, wasm, uploadFee, "Upload airdrop contract");
    console.log("Upload succeeded. Receipt:", uploadVault);
    return uploadVault.codeId;
}

async function InstantiateAirdropContract(codeId) {
    // // Instantiate
    const gasPrice = GasPrice.fromString("0.05ubluechip");
    const instantiateFee = calculateFee(500_000, gasPrice);
    const sender_wallet = await DirectSecp256k1HdWallet.fromMnemonic(sender.mnemonic, { prefix: "bluechip" });
    const sender_client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, sender_wallet);
    const initMsg = {
        "TotalWhitelistWallets": 0,
        "EligibleWallets": 0,
        "AirdropAmount": 100000000,
    };

    const { contractAddress } = await sender_client.instantiate(
        sender.address,
        codeId,
        initMsg,
        "Airdrop contract",
        instantiateFee,
        { memo: `Create a airdrop contract instance` },
    );
    console.info(`Contract instantiated at: `, contractAddress);

}

async function getBalance() {
    // Upload contract
    const sender_wallet = await DirectSecp256k1HdWallet.fromMnemonic(sender.mnemonic, { prefix: "bluechip" });
    const sender_client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, sender_wallet);
    const balance = await sender_client.queryContractSmart("osmo17a5wqch2wnvst55e7zg8a2m59ehwty2xurls0vhy2cm2luap8mfq97xyxp",
    {
        balance:{
            address:"osmo17ruwha2r5yj0r4gwdjqw2y0kep3qjz3yrk99k7"
        }
    })
    console.info(`DGM balance: `, balance);

    return balance;
}


async function sendTokens() {
    const gasPrice = GasPrice.fromString("0.05ubluechip");
    const sender_wallet = await DirectSecp256k1HdWallet.fromMnemonic(sender.mnemonic, { prefix: "bluechip" });
    const sender_client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, sender_wallet);
    const executeFee = calculateFee(300_000, gasPrice);
    const msg =
    {
        transfer: {
            recipient: "osmo17ruwha2r5yj0r4gwdjqw2y0kep3qjz3yrk99k7",
            amount: "500000000"
        }

    }

    const create_result = await sender_client.execute(
        sender.address,
        "mun1suhgf5svhu4usrurvxzlgn54ksxmn8gljarjtxqnapv8kjnp4nrsfttf7h",
        msg,
        executeFee,
        "",
    );
    console.log("SetMaximumNum", create_result)

}

async function sendIBCPacket() {
    const gasPrice = GasPrice.fromString("0.05ubluechip");
    const sender_wallet = await DirectSecp256k1HdWallet.fromMnemonic(sender.mnemonic, { prefix: "bluechip" });
    const sender_client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, sender_wallet);
    const executeFee = calculateFee(300_000, gasPrice);
    const msg =
    {
        "encrypt_add": {
            "channel_id":"channel-1793", // IBC channel
            "contract_address":"0xCBC18EF2bF2b9e315a8670fCe688E57e9d7a15fd", 
            "function_name":"add",
            "argument":"5" 
        }

    }

    const send_ibc_result = await sender_client.execute(
        sender.address,
        "osmo148ezcd79z6llt75l3fu9xsrp8sde3ldyqw0kefpz3xwx4tc0dyrssgz063",
        msg,
        executeFee,
        "",
    );
    console.log("SendIBCPacket", send_ibc_result)
}

async function getResult() {
    // Upload contract
    const sender_wallet = await DirectSecp256k1HdWallet.fromMnemonic(sender.mnemonic, { prefix: "osmo" });
    const sender_client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, sender_wallet);
    const result = await sender_client.queryContractSmart("osmo148ezcd79z6llt75l3fu9xsrp8sde3ldyqw0kefpz3xwx4tc0dyrssgz063",
    {
        list_results:{
        }
    })
    console.info(`Result: `, result);

    return result;
}

export {UploadAirdropContract, InstantiateAirdropContract}
// uploadContract()
// instantiateContract(1)
// getBalance()
// sendTokens()
// sendIBCPacket()
// getResult()
