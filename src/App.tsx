// App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes /> {/* Use the separate routes component */}
    </Router>
  );
};

export default App;
