const IPFS = require('ipfs-api');
const ipfs = new IPFS({ 
  host: 'ipfs.telos.miami', 
  port: 5002, 
  protocol: 'https' 
});
export default ipfs;
