yarn init
yarn add -D @types/node
--yarn global add solc  
yarn add solc  
 Installed "solc@0.8.26" with binaries: - solcjs
yarn add ethers
yarn add dotenv

yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol

ts-node deploy.ts

sepolia's contract address:
PS H:\web3\web3\hardhat\ethers-simple-storage> npx tsx .\deploy.ts
deploying..., please wait
Contract deployed to 0xcA51857e4e04D16EE01Ca029b879B9A37A6ec32d
currNum: 0
update favoriteNumber...
currNum: 77
