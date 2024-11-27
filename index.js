const { UploadAirdropContract, InstantiateAirdropContract } = require("./airdrop");

async function runAirdrop() {
    codeId = await UploadAirdropContract()
    await InstantiateAirdropContract(codeId)
}

runAirdrop()