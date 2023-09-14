import React from "react";
import {UserButton} from "@clerk/nextjs";

export default function Unauthorized() {
    return (
        <div>
            <UserButton afterSignOutUrl="/editor"/>
            <h1>Unauthorized</h1>
            <p>you are an unauthorized user to edit this page, please sign out from your account and sign in as an authorized user</p>
        </div>
    )
}