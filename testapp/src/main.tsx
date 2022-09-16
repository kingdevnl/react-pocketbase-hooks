import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ClientProvider} from "../../context/client";
import PocketBase from 'pocketbase';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const client = new PocketBase('http://127.0.0.1:8090');


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ClientProvider client={client}>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <App />
        </ThemeProvider>
    </ClientProvider>
)
