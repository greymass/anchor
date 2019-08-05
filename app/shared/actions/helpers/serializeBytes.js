
const serializer = {
  serialize: toHexString,
  deserialize: fromHexString
};

export default serializer;

function toHexString(byteArray) {
  if (byteArray.length <= 255) {
    const { length } = byteArray;
    const hexEnd = Array.from(byteArray, (byte) => {
      let hex = (byte).toString(16);
      while (hex.length < 4) {
        hex = '0' + hex;
      }
      const splitted = hex.split('');
      hex = splitted[2] + splitted[3] + splitted[0] + splitted[1];
      return hex;
    }).join('');
    let hexLength = length.toString(16);
    if (hexLength.length === 1) {
      hexLength = '0' + hexLength;
    }
    if (length > 127) {
      hexLength += '01';
    }
    return hexLength + hexEnd;
  }
  return null;
}

function fromHexString(hexString) {
  const decodedArray = [];
  let l = 2;
  const length = hexString.slice(0, l);
  const parsedLength = parseInt(length, 16);
  if (parsedLength > 127) {
    l += 2;
  }
  const splitted = hexString.split('');
  let couter = 0;
  let number = '';
  for (let i = l; i < splitted.length; i += 1) {
    number += splitted[i];
    couter += 1;
    if (couter === 4) {
      const splittedNumber = number.split('');
      const hexNumber = splittedNumber[2] + splittedNumber[3] + splittedNumber[0] + splittedNumber[1];
      decodedArray.push(parseInt(hexNumber, 16));
      couter = 0;
      number = '';
    }
  }
  if (decodedArray.length === parsedLength) {
    return decodedArray;
  }
  return null;
}
