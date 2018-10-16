// @flow
const fcbuffer = require('fcbuffer');
const assert = require('assert');
const asn1 = require('asn1-ber');

export default function serialize(chainId, transaction, types) {
  const writer = new asn1.BerWriter();

  encode(writer, fcbuffer.toBuffer(types.checksum256(), chainId));
  encode(writer, fcbuffer.toBuffer(types.time(), transaction.expiration));
  encode(writer, fcbuffer.toBuffer(types.uint16(), transaction.ref_block_num));
  encode(
    writer,
    fcbuffer.toBuffer(types.uint32(), transaction.ref_block_prefix)
  );
  encode(
    writer,
    fcbuffer.toBuffer(types.unsigned_int(), 0) //transaction.net_usage_words
  );
  encode(
    writer,
    fcbuffer.toBuffer(types.uint8(), transaction.max_cpu_usage_ms)
  );
  encode(
    writer,
    fcbuffer.toBuffer(types.unsigned_int(), transaction.delay_sec)
  );

  assert(transaction.context_free_actions.length === 0);
  encode(writer, fcbuffer.toBuffer(types.unsigned_int(), 0));

  assert(transaction.actions.length === 1);
  encode(writer, fcbuffer.toBuffer(types.unsigned_int(), 1));

  const action = transaction.actions[0];

  encode(writer, fcbuffer.toBuffer(types.account_name(), action.account));
  encode(writer, fcbuffer.toBuffer(types.action_name(), action.name));

  encode(
    writer,
    fcbuffer.toBuffer(types.unsigned_int(), action.authorization.length)
  );
  for (let i = 0; i < action.authorization.length; i += 1) {
    const authorization = action.authorization[i];

    encode(
      writer,
      fcbuffer.toBuffer(types.account_name(), authorization.actor)
    );
    encode(
      writer,
      fcbuffer.toBuffer(types.permission_name(), authorization.permission)
    );
  }

  const data = Buffer.from(action.data, 'hex');
  encode(writer, fcbuffer.toBuffer(types.unsigned_int(), data.length));
  encode(writer, data);

  assert(writer, transaction.transaction_extensions.length === 0);
  encode(writer, fcbuffer.toBuffer(types.unsigned_int(), 0));
  encode(writer, fcbuffer.toBuffer(types.checksum256(), Buffer.alloc(32, 0)));

  return writer.buffer;
}

function encode(writter, buffer) {
  writter.writeBuffer(buffer, asn1.Ber.OctetString);
}
