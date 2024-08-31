"use client";

import React, { useState } from "react";
import { useCanvasClient } from "../hooks/useCanvasClient";
import { useResizeObserver } from "../hooks/useResizeObserver";
import Image from "next/image";
import { OgImage } from "@/utils/og";
import { Spinner } from "./spinner";
import { CreateMint } from "./create-mint";
function CanvasClientComponent() {
    const { client, user, isReady } = useCanvasClient();
    useResizeObserver(client);

    const openUserProfile = () => {
        if (!client || !user) return;
        const url = `https://dscvr.one/u/${user.username}`;
        client.openLink(url);
    };

    if (!isReady) {
        return <Spinner />;
    }
    if (!user) return;
    return (
        <section className="main-section py-4">
            <div className="container" style={{ marginBottom: "125px"}}>
                <div className="row">
                    <div className="col-md-6 text-center">
                        <a className={"mb-2"} onClick={openUserProfile}>
                            <Image
                                src={user.avatar ? user.avatar : OgImage}
                                alt="User Avatar"
                                height={60}
                                width={60}
                                className="rounded-pill"
                            />
                        </a>
                        <p className="mb-0">Welcome {user.username}</p>
                        <HeightButtons />
                    </div>
                    {/* <div className="col-md-12 text-center">
                        <div className="d-flex gap-2 justify-content-center">
                            {AppActions.map((action) => (
                                <button className={`btn text-capitalize ${currAction === action ? 'btn-info' : 'border text-white'}`} onClick={() => setCurrAction(action)}>
                                    {action}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-12 z-1">
                        {currAction === "token-creation" && <CreateToken />}
                    </div> */}
                    {
                        client && 
                        <CreateMint canvasClient={client}/>
                    }
                </div>
            </div>
        </section>
    );
}

function HeightButtons() {
    const [currentHeight, setCurrentHeight] = useState<string>(document.body.style.height)
    const setBodyHeight = (height: number) => {
        document.body.style.height = height ? `${height}px` : "";
        setCurrentHeight(`${height}px`)
    };
    return (
        <>
        <div className="text-center">
            <button className="btn text-white border" data-bs-toggle="collapse" data-bs-target="#reset-height">Change Canvas Height</button>
        </div>
        <div className="bg-dark collapse" id="reset-height">
            <div className="w-100">
                <hr />
                <p className="text-center">&#9759; Customize canvas height &#9759;</p>
                <div className="d-flex gap-2 justify-content-center">
                    {[0, 500, 1000].map((height) => (
                        <button
                            key={height}
                            type="button"
                            className={`btn border ${currentHeight === `${height}px` ? "bg-white text-black" : "text-white"}`}
                            onClick={() => setBodyHeight(height)}
                        >
                            {`${height}px height`}
                        </button>
                    ))}
                </div>
                <hr />
            </div>
        </div>
        </>
    );
}

export default function CanvasClientWrapper() {
    return <CanvasClientComponent />;
}
