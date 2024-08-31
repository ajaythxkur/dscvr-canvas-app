"use client"

import { validateHostMessage } from "@/lib/dscvr"
import { CanvasClient, CanvasInterface } from "@dscvr-one/canvas-client-sdk"
import { useState } from "react"
import * as bs58 from "bs58"
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js"
import { createMintTransaction } from "@/lib/solana"

interface Props {
    canvasClient: CanvasClient
}
export function CreateMint(props: Props){
    const [mintAddr, setMintAddr] = useState<string|null>(null)
    const [errorMessage, setErrorMessage] = useState<string|null>(null)
    const onCreateMint = async() => {
        try {
            sendTransaction()
        } catch (error: any) {
            setErrorMessage(error.message)
        }
    }
    const createTx = async (
        response: CanvasInterface.User.ConnectWalletResponseMessage
      ): Promise<CanvasInterface.User.UnsignedTransaction | undefined> => {
        const isValidResponse = await validateHostMessage(response);
        if (!isValidResponse) {
          setErrorMessage('Security error');
          return;
        }
      
        if (!response.untrusted.success) {
          setErrorMessage('Failed to connect wallet');
          return;
        }
        const mint = Keypair.generate();
        const user = new PublicKey(response.untrusted.address);
        const connection = new Connection(clusterApiUrl("devnet"));
        const transaction = await createMintTransaction(
            connection,
            mint.publicKey,
            user
        );
      
        if (!transaction) {
          setErrorMessage('Failed to create send transaction');
          return;
        }
        setMintAddr(mint.publicKey.toBase58())
        const unsignedTx = bs58.default.encode(transaction.serialize());
      
        return {
          unsignedTx
        };
      };
    const sendTransaction = async () => {
        const response = await props.canvasClient.connectWalletAndSendTransaction(
          "solana:103", //devnet
          createTx
        );
      
        if (!response) {
          setErrorMessage('Transaction not executed');
          return;
        }
      
        const isValidResponse = await validateHostMessage(response);
        if (!isValidResponse) {
          setErrorMessage('Security error');
          return;
        }
      
        if (response.untrusted.success) {
            setErrorMessage(null)
        } else if (response.untrusted.errorReason === 'user-cancelled') {
          setErrorMessage('User cancelled transaction');
        } else {
          setErrorMessage(response?.untrusted.error ?? "error");
        }
      };
    return(
        <div className="text-center">
            <button className="btn btn-info" onClick={onCreateMint}>Create Mint</button>
            {
                mintAddr &&
                <div className="">
                    <p>Save this mint address somewhere for future</p>
                    <p>{mintAddr}</p>
                </div>
            }
            {
                errorMessage
                &&
                <div className="">
                    <p className="text-danger">{errorMessage}</p>
                </div>
            }
        </div>
    )
}