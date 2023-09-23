const hre = require("hardhat")
const { items } = require("../src/items.json")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts
  const [deployer] = await ethers.getSigners()

  // Deploy Dexstore
  const Dexstore = await hre.ethers.getContractFactory("Dexstore")
  const dexstore = await Dexstore.deploy()
  await dexstore.deployed()

  console.log(`Deployed Dexstore Contract at: ${dexstore.address}\n`)

  // Listing items...
  for (let i = 0; i < items.length; i++) {
    const transaction = await dexstore.connect(deployer).list(
      items[i].id,
      items[i].name,
      items[i].category,
      items[i].image,
      tokens(items[i].price),
      items[i].rating,
      items[i].stock,
    )

    await transaction.wait()

    console.log(`Listed item ${items[i].id}: ${items[i].name}`)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//Deployed Dexstore Contract at: 0x80d03fA46Ad2aedB8bD46B7F033236F9E4c76607
