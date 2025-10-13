import { Routes, Route } from "react-router-dom";
import AppLayout from "../shared/layouts/AppLayout";
import HomePage from "../features/search/HomePage";
import CompanyOverview from "../features/company-overview/CompanyOverview";
import FinancialStatements from "../features/financials/FinancialStatements";
import NewsFeed from "../features/news/NewsFeed";
import CompanyLayout from "../features/company/CompanyLayout";

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/company/:ticker" element={<CompanyLayout />}>
          <Route index element={<CompanyOverview />} />
          <Route path="financials" element={<FinancialStatements />} />
          <Route path="news" element={<NewsFeed />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
