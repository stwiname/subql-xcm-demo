import {SubstrateExtrinsic,SubstrateEvent} from "@subql/types";
import {XCMTransfer} from "../types";


export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const [account, otherReserve, amount, extra] = event.event.data.toJSON() as any;

    const transfer = XCMTransfer.create({
        id: event.extrinsic.extrinsic.hash.toHex(),
        amount: amount,
        toAddress: extra.interior.x2[1].accountId32.id,
        fromAddress: account,
        parachainId: extra.interior.x2[0].parachain,
        currencyId: otherReserve.otherReserve,
    });

    await transfer.save();
}

// export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
//     const record = await StarterEntity.get(extrinsic.block.block.header.hash.toString());
//     //Date type timestamp
//     record.field4 = extrinsic.block.timestamp;
//     //Boolean tyep
//     record.field5 = true;
//     await record.save();
// }


