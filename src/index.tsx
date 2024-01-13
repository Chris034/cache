import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DeadEnd, Home, Home2, Layout } from './pages';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home/:" element={<Home2 />} />
          <Route path="*" element={<DeadEnd />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
