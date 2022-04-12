import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {persistor, reduxStore} from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {StyledEngineProvider} from "@mui/styled-engine-sc";


const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        }},
    palette: {
        primary: {
            main :"#2962FF"
        },
        secondary: {
            main: "#ffc629"
        },
    },
    typography: {
        h1: {
            fontSize: "3.25rem"
        },
        h2: {
            fontSize: "2.125rem"
        },
        h3: {
            fontSize: "1.5rem"
        },
        h4: {
            fontSize: "1.15rem"
        },
        h5:{
            fontSize: "1.05rem"
        },
        h6:{
            fontSize: "1.00rem"
        },
    },
});

ReactDOM.render(
    <Provider store={reduxStore}>
        <PersistGate loading={null} persistor={persistor}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </StyledEngineProvider>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
