import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import ProductsPage from './features/products/ProductsPage';
import PrivateRoute from './components/common/PrivateRoute';
import SalesPage from './features/sales/SalesPage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/products" element={<PrivateRoute><ProductsPage/></PrivateRoute>}/>
                <Route path="/sales" element={<PrivateRoute><SalesPage/></PrivateRoute>}/>
            </Routes>
        </Router>
    );
};

export default App;
