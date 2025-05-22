// @flow
const fcbuffer = require('fcbuffer');
const assert = require('assert');
const asn1 = require('asn1-ber');

export default function serialize(chainId, transaction, types) {
  console.log('[LEDGER-SERIALIZE] Called with:');
  console.log('[LEDGER-SERIALIZE] chainId:', chainId);
  console.log('[LEDGER-SERIALIZE] transaction:', JSON.stringify(transaction, null, 2));
  console.log('[LEDGER-SERIALIZE] types:', types);

  const chunks = [];
  {
    console.log('[LEDGER-SERIALIZE] Encoding transaction header');
    const writer = new asn1.BerWriter();

    console.log('[LEDGER-SERIALIZE] Encoding chainId:', chainId);
    encode(writer, fcbuffer.toBuffer(types.checksum256(), chainId));
    console.log('[LEDGER-SERIALIZE] Encoding expiration:', transaction.expiration);
    encode(writer, fcbuffer.toBuffer(types.time(), transaction.expiration));
    console.log('[LEDGER-SERIALIZE] Encoding ref_block_num:', transaction.ref_block_num);
    encode(writer, fcbuffer.toBuffer(types.uint16(), transaction.ref_block_num));
    console.log('[LEDGER-SERIALIZE] Encoding ref_block_prefix:', transaction.ref_block_prefix);
    encode(writer, fcbuffer.toBuffer(types.uint32(), transaction.ref_block_prefix));
    console.log('[LEDGER-SERIALIZE] Encoding net_usage_words (0)');
    encode(
      writer,
      fcbuffer.toBuffer(types.unsigned_int(), 0) // transaction.net_usage_words
    );
    console.log('[LEDGER-SERIALIZE] Encoding max_cpu_usage_ms:', transaction.max_cpu_usage_ms);
    encode(writer, fcbuffer.toBuffer(types.uint8(), transaction.max_cpu_usage_ms));
    console.log('[LEDGER-SERIALIZE] Encoding delay_sec:', transaction.delay_sec);
    encode(writer, fcbuffer.toBuffer(types.unsigned_int(), transaction.delay_sec));

    assert(transaction.context_free_actions.length === 0);
    console.log('[LEDGER-SERIALIZE] Encoding context_free_actions.length (0)');
    encode(writer, fcbuffer.toBuffer(types.unsigned_int(), 0));

    console.log('[LEDGER-SERIALIZE] Encoding actions.length:', transaction.actions.length);
    encode(writer, fcbuffer.toBuffer(types.unsigned_int(), transaction.actions.length));

    chunks.push(writer.buffer);
    console.log('[LEDGER-SERIALIZE] Header chunk generated:', writer.buffer.toString('hex'));
  }

  for (let i = 0; i < transaction.actions.length; i += 1) {
    console.log(`[LEDGER-SERIALIZE] Encoding action ${i}`);
    const writer = new asn1.BerWriter();

    const action = transaction.actions[i];
    console.log(`[LEDGER-SERIALIZE] Action ${i} account:`, action.account);
    encode(writer, fcbuffer.toBuffer(types.account_name(), action.account));
    console.log(`[LEDGER-SERIALIZE] Action ${i} name:`, action.name);
    encode(writer, fcbuffer.toBuffer(types.action_name(), action.name));

    console.log(
      `[LEDGER-SERIALIZE] Action ${i} authorization.length:`,
      action.authorization.length
    );
    encode(writer, fcbuffer.toBuffer(types.unsigned_int(), action.authorization.length));
    for (let authIndex = 0; authIndex < action.authorization.length; authIndex += 1) {
      console.log(`[LEDGER-SERIALIZE] Action ${i}, Authorization ${authIndex}`);
      const authorization = action.authorization[authIndex];

      console.log(`[LEDGER-SERIALIZE] Action ${i}, Auth ${authIndex} actor:`, authorization.actor);
      encode(writer, fcbuffer.toBuffer(types.account_name(), authorization.actor));
      console.log(
        `[LEDGER-SERIALIZE] Action ${i}, Auth ${authIndex} permission:`,
        authorization.permission
      );
      encode(writer, fcbuffer.toBuffer(types.permission_name(), authorization.permission));
    }

    const data = Buffer.from(action.data, 'hex');
    console.log(`[LEDGER-SERIALIZE] Action ${i} data (hex):`, action.data);
    console.log(`[LEDGER-SERIALIZE] Action ${i} data.length:`, data.length);
    if (data.length > 0) {
      encode(writer, fcbuffer.toBuffer(types.unsigned_int(), data.length));
      encode(writer, data);
    } else {
      try {
        console.log(`[LEDGER-SERIALIZE] Action ${i} has empty data, encoding 0 length.`);
        encode(writer, fcbuffer.toBuffer(types.unsigned_int(), 0));
        encode(writer, new Buffer(0));
      } catch (e) {
        console.log('[LEDGER-SERIALIZE] Error encoding empty data:', e);
      }
    }

    chunks.push(writer.buffer);
    console.log(`[LEDGER-SERIALIZE] Action ${i} chunk generated:`, writer.buffer.toString('hex'));
  }

  {
    console.log('[LEDGER-SERIALIZE] Encoding transaction extensions and context free data hash');
    const writer = new asn1.BerWriter();
    assert(writer, transaction.transaction_extensions.length === 0);
    console.log('[LEDGER-SERIALIZE] Encoding transaction_extensions.length (0)');
    encode(writer, fcbuffer.toBuffer(types.unsigned_int(), 0));
    console.log('[LEDGER-SERIALIZE] Encoding context_free_data_hash (empty hash)');
    encode(writer, fcbuffer.toBuffer(types.checksum256(), Buffer.alloc(32, 0)));
    chunks.push(writer.buffer);
    console.log('[LEDGER-SERIALIZE] Footer chunk generated:', writer.buffer.toString('hex'));
  }
  console.log(
    '[LEDGER-SERIALIZE] All chunks:',
    chunks.map(c => c.toString('hex'))
  );
  return chunks;
}

function encode(writter, buffer) {
  // console.log('[LEDGER-SERIALIZE] Encoding buffer:', buffer.toString('hex')); // Optional: very verbose
  writter.writeBuffer(buffer, asn1.Ber.OctetString);
}
