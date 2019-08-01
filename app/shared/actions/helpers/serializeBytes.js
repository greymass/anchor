
export default function toHexString(byteArray) {
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
  } else {
    return null;
  }
}
