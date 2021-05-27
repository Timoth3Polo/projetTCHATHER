import React from "react"
import { Router as ReachRouter } from "@reach/router"
import Home from "../views/Home"
import Feed from "../views/Feed"
export const Router: React.FC<unknown> = () => {
    return(
        <ReachRouter>
            <Home path="/" />
            <Feed path="/feed" />
        </ReachRouter>
    );
};