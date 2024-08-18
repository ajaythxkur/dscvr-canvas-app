import { Dispatch, SetStateAction } from "react";

interface Props {
    nftCount: number;
    // umi: Umi;
    // metadata: MetadataArgsArgs;
    setInfo: Dispatch<SetStateAction<string | undefined>>
}
export async function mintCompressedNFT({ nftCount, setInfo }: Props){
    setInfo(`👾 Initializing a Merkle Tree for ${nftCount.toLocaleString()} Compressed NFTs.`);

}