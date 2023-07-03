import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import ProductsPage from './features/products/ProductsPage';
import PrivateRoute from './components/common/PrivateRoute';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/" element={<PrivateRoute><ProductsPage/></PrivateRoute>}/>
            </Routes>
        </Router>
    );
};

export default App;
