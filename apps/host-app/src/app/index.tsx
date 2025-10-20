import { Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { HomePage } from "../features/search";
import OverviewWrapper from "../features/overview/OverviewWrapper";
import FinancialsWrapper from "../features/financials/FinancialsWrapper";
import NewsWrapper from "../features/news/NewsWrapper";
import CompanyLayout from "../layouts/CompanyLayout";

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/company/:ticker" element={<CompanyLayout />}>
          <Route index element={<OverviewWrapper />} />
          <Route path="financials" element={<FinancialsWrapper />} />
          <Route path="news" element={<NewsWrapper />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
