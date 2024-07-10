import { Routes, Route } from "react-router-dom";
import { Home, Stream, Reports, Settings } from "./views/index";
import Layout from "./Layout";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout>{<Home />}</Layout>} />
      <Route path="/stream" element={<Layout>{<Stream />}</Layout>} />
      <Route path="/reports" element={<Layout>{<Reports />}</Layout>} />
      <Route path="/settings" element={<Layout>{<Settings />}</Layout>} />
    </Routes>
  );
};

export default AppRouter;
