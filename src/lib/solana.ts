import { Dispatch, SetStateAction } from "react";
import * as web3 from "@solana/web3.js"
import { getMinimumBalanceForRentExemptMint, MintLayout, TOKEN_2022_PROGRAM_ID, createInitializeMintInstruction } from "@solana/spl-token";
interface Props {
    nftCount: number;
    // umi: Umi;
    // metadata: MetadataArgsArgs;
    setInfo: Dispatch<SetStateAction<string | undefined>>
}
export async function mintCompressedNFT({ nftCount, setInfo }: Props){
    setInfo(`👾 Initializing a Merkle Tree for ${nftCount.toLocaleString()} Compressed NFTs.`);

}

export async function createMintTransaction(connection: web3.Connection, mint: web3.PublicKey, user: web3.PublicKey){
    const rent = await getMinimumBalanceForRentExemptMint(connection);
    const { blockhash } = await connection.getRecentBlockhash();

    const txn = new web3.Transaction({
        recentBlockhash: blockhash,
        feePayer: user
    });

    const accIx = web3.SystemProgram.createAccount({
        fromPubkey: user,
        newAccountPubkey: mint,
        lamports: rent,
        space: MintLayout.span,
        programId: TOKEN_2022_PROGRAM_ID,
    });

    const mintIx = createInitializeMintInstruction(
        mint,
        8,
        user,
        null,
        TOKEN_2022_PROGRAM_ID
    );

    txn.add(accIx, mintIx);
    return txn
}