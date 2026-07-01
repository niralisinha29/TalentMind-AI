import {
    Routes,
    Route
} from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CandidateDetails from "./pages/CandidateDetails";
import InterviewKit from "./pages/InterviewKit";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/report"
                element={<Dashboard />}
            />

            <Route
                path="/candidate/:name"
                element={<CandidateDetails />}
            />

            <Route
                path="/interview-kit"
                element={<InterviewKit />}
            />

        </Routes>

    );

}

export default App;