const { 
    UploadAirdropContract, 
    InstantiateAirdropContract,
    QueryConfig } = require("./airdrop");

async function deployAndInstantiateAirdropContract() {
    codeId = await UploadAirdropContract()

    // bluechip1hrpna9v7vs3stzyd4z3xf00676kf78zpe2u5ksvljswn2vnjp3ysvzsv2h
    contractAddress = await InstantiateAirdropContract(codeId)
}

async function queryConfigAirdrop() {
    await QueryConfig()
}

async function queryIsWhitelistedAirdrop() {
}

async function queryIsClaimedAirdrop() {
}

// 1. Deploy and instantiate
// contractAddress = deployAndInstantiateAirdropContract()
// 2. Query config
// queryConfigAirdrop(contractAddress)
queryConfigAirdrop("bluechip1hrpna9v7vs3stzyd4z3xf00676kf78zpe2u5ksvljswn2vnjp3ysvzsv2h")