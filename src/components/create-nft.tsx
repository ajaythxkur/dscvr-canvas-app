"use client";
import "@/css/create-nft.css";
import { useState } from "react";
import { mintCompressedNFT } from "@/lib/solana";
interface FormData {
    name: string;
    symbol: string;
    uri: string;
}
export function CreateNFT() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        symbol: "",
        uri: ""
    });
    const [info, setInfo] = useState<string>()
    const mintNFT = async () => {
        try {
            await mintCompressedNFT({ nftCount: 1, setInfo, })
        } catch (error: any) {
            setInfo(error.message)
        }
    }
    return (
        <section className="main-section d-flex align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form className="border border-2 border-info rounded p-3">
                            <h4 className="text-center fw-bold">Compressed NFT</h4>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control border-2 border-info"
                                    placeholder="Enter name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="symbol"
                                    className="form-control border-2 border-info"
                                    placeholder="Enter symbol"
                                    value={formData.symbol}
                                    onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="uri"
                                    className="form-control border-2 border-info"
                                    placeholder="Enter uri"
                                    value={formData.uri}
                                    onChange={(e) => setFormData({ ...formData, uri: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary text-white p-3" type="button" onClick={mintNFT}>Mint compressed NFT</button>
                            </div>
                            {info && <p className="mb-2 text-info">{info}</p>}
                        </form>

                    </div>
                </div>
            </div>

        </section>
    )
}