const { network } = require("hardhat")

const {
    developmentChains,
    // DECIMALS,
    // INITAL_ANSWER,
    //why did the above imports not work
} = require("../helper-hardhat-config")
const DECIMALS = 8
const INITAL_ANSWER = 200000000000
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if (developmentChains.includes(network.name)) {
        log("Local Network Detected! Deploying Mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITAL_ANSWER],
        })
        log("Mocks Deployed")
        log("--------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
