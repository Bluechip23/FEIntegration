const { calculateFee, GasPrice } = require("@cosmjs/stargate");
const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const { SigningCosmWasmClient } = require("@cosmjs/cosmwasm-stargate");
const _ = require("fs");
const { rpcEndpoint, sender } = require("./common");

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
        "total_whitelist_wallets": "0",
        "eligible_wallets": "0",
        "airdrop_amount": "100000000",
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
    return contractAddress;
}

async function QueryConfig(contractAddress) {
    // Upload contract
    const sender_wallet = await DirectSecp256k1HdWallet.fromMnemonic(sender.mnemonic, { prefix: "bluechip" });
    const sender_client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, sender_wallet);
    const config = await sender_client.queryContractSmart(contractAddress,
    {
        config: {}
    })
    console.info(`Aidrop config: `, config);

    return config;
}

async function QueryIsWhitelisted(contractAddress, address) {
    // Upload contract
    const sender_wallet = await DirectSecp256k1HdWallet.fromMnemonic(sender.mnemonic, { prefix: "bluechip" });
    const sender_client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, sender_wallet);
    const isWhitelisted = await sender_client.queryContractSmart(contractAddress,
    {
        is_whitelisted: {address: address}
    })
    console.info(`Aidrop isWhitelisted: `, isWhitelisted);

    return isWhitelisted;
}

async function QueryIsClaimed(contractAddress, address) {
    // Upload contract
    const sender_wallet = await DirectSecp256k1HdWallet.fromMnemonic(sender.mnemonic, { prefix: "bluechip" });
    const sender_client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, sender_wallet);
    const isClaimed = await sender_client.queryContractSmart(contractAddress,
    {
        is_claimed: {address : address }
    })
    console.info(`Aidrop is claimed: `, isClaimed);

    return isClaimed;
}

module.exports = {
    UploadAirdropContract, 
    InstantiateAirdropContract, 
    QueryConfig,
    QueryIsWhitelisted,
    QueryIsClaimed,
};