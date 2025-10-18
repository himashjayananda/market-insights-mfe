import { Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { HomePage } from "../features/search";
import OverviewWrapper from "../features/overview/OverviewWrapper";
import { FinancialStatements } from "../features/financials";
import { NewsFeed } from "../features/news";
import CompanyLayout from "../layouts/CompanyLayout";

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/company/:ticker" element={<CompanyLayout />}>
          <Route index element={<OverviewWrapper />} />
          <Route path="financials" element={<FinancialStatements />} />
          <Route path="news" element={<NewsFeed />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
