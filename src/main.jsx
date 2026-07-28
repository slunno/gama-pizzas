import React from "react";

import ReactDOM from "react-dom/client";

import AOS from "aos";

import "aos/dist/aos.css";

import App from "./App.jsx";

import "./styles/global.css";

import "./styles/responsive.css";


AOS.init({

    duration:800,

    easing:"ease-in-out",

    once:true,

    offset:120

});



ReactDOM
.createRoot(
    document.getElementById("root")
)
.render(

    <React.StrictMode>

        <App />

    </React.StrictMode>

);