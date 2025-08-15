import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function App() {
  return (
    <Router>
      <div className="bg-slate-900 text-slate-200 min-h-screen font-sans p-4 sm:p-8">
        <main className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
