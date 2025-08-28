import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import { store } from '../src/store/store'; // Import your Redux store
import InsuranceApp from './components/pages/insuranceApp';

function App() {

  return (
    <Provider store={store}> {/* Provide the store to the entire app */}
      <Router> {/* Set up React Router */}
      

          <Routes>
            <Route path="/" element={<InsuranceApp />} />
          </Routes>
      </Router>
    </Provider>
  );
}

// A simple home component to show the count functionality


export default App;
