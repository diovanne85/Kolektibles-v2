"use client";
import React from 'react'
import { FacebookProvider, CustomChat } from "react-facebook";

export default function FacebookMsg() {
  
    return (
      <FacebookProvider appId="1691892234556666" chatSupport>
        <CustomChat pageId="163954276796435" minimized={true}/>
      </FacebookProvider>    
    );
  
}
