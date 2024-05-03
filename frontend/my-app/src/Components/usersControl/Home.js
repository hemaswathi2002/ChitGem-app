import { useAuth } from "../../Context/AuthrorizeContext";
import React from "react";
import img from '../homeimg/Jewellery_Banner_AH_1920.jpg';
import LiveGoldPriceDisplay from "./LiveGoldPriceDisplay";

export default function Home() {
    const { user } = useAuth();

    return (
        <>
        <LiveGoldPriceDisplay/>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ backgroundColor: "#FCDEDA", width: "100%", padding: "90px" }}>
                <h2>Home Component</h2>
                {!user ? <p>User not logged in</p> : <p>Welcome { user.username }</p>}
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 180px)" }}>
                <img
                    src={img} 
                    alt="Your Image"
                    style={{ maxWidth: "100%", height: "auto" }}
                />
            </div>
        </div>
        </>
    );
}
