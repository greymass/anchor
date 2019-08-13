export default function checkForBeos(connection) {
  if (connection.chain === 'BEOS') {
    return true;
  }
  return false;
}
