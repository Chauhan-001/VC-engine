import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import MergePdf from "../pages/pdf/MergePdf";
import SplitPdf from "../pages/pdf/SplitPdf";

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pdf/merge" element={<MergePdf />} />
        <Route path="/pdf/split" element={<SplitPdf />} />
      </Routes>

  )
}



