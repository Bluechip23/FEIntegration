const { 
    UploadAirdropContract, 
    InstantiateAirdropContract,
    QueryConfig,
    QueryIsWhitelisted,
    QueryIsClaimed,
 } = require("./airdrop");

async function deployAndInstantiateAirdropContract() {
    codeId = await UploadAirdropContract()

    // bluechip1hrpna9v7vs3stzyd4z3xf00676kf78zpe2u5ksvljswn2vnjp3ysvzsv2h
    contractAddress = await InstantiateAirdropContract(codeId)
}

async function queryConfigAirdrop(contractAddress) {
    await QueryConfig(contractAddress)
}

async function queryIsWhitelistedAirdrop(contractAddress, address) {
    await QueryIsWhitelisted(contractAddress, address)
}

async function queryIsClaimedAirdrop(contractAddress, address) {
    await QueryIsClaimed(contractAddress, address)
}

// 1. Deploy and instantiate
// contractAddress = deployAndInstantiateAirdropContract()
// 2. Query config
// queryConfigAirdrop(contractAddress)
queryConfigAirdrop("bluechip1hrpna9v7vs3stzyd4z3xf00676kf78zpe2u5ksvljswn2vnjp3ysvzsv2h")
// 3. Query is whitelisted
// queryIsWhitelistedAirdrop(contractAddress, address)
queryIsWhitelistedAirdrop("bluechip1hrpna9v7vs3stzyd4z3xf00676kf78zpe2u5ksvljswn2vnjp3ysvzsv2h", "bluechip14u53eghrurpeyx5cm47vm3qwugtmhcpnjvtxwj")
// 4. Query is claimed
// queryIsClaimedAirdrop(contractAddress, address)
queryIsClaimedAirdrop("bluechip1hrpna9v7vs3stzyd4z3xf00676kf78zpe2u5ksvljswn2vnjp3ysvzsv2h", "bluechip14u53eghrurpeyx5cm47vm3qwugtmhcpnjvtxwj")