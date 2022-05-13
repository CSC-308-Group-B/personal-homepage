import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import UserPage from "./components/UserPage";
import TermsOfUsePage from "./components/TermsOfUsePage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styling/App.scss";
import "./draggable.js";


class App extends React.Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="terms" element={<TermsOfUsePage />} />
                        <Route path="privacy" element={<PrivacyPolicyPage />} />
                        <Route path="/" element={<UserPage />} />
                        <Route path="*" element={<UserPage />} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
