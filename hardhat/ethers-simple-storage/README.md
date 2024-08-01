yarn init
yarn add -D @types/node
--yarn global add solc  
yarn add solc  
 Installed "solc@0.8.26" with binaries: - solcjs
yarn add ethers

yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol
