import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <MantineProvider
        theme={{
            // Override any other properties from default theme
            fontFamily: "Open Sans, Roboto, Verdana, sans serif",
            spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
            colorScheme: "light"
        }}
        withGlobalStyles
        withNormalizeCSS
    >
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </MantineProvider>
);
