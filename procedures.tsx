import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { User } from './User'
import { Index } from './Index'

// create and render root
const user = new User()
createRoot(document.getElementById("root")!).render(<Index user={user}/>)