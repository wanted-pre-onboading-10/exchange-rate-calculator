import { Routes, Route } from 'react-router-dom';
import SimpleCalc from 'pages/simple-calc';
import TabCalc from 'pages/tab-calc';
import Navigation from 'components/nav';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route index element={<SimpleCalc />} />
        <Route path="/simple" element={<SimpleCalc />} />
        <Route path="/Tab" element={<TabCalc />} />
        <Route path="*" element={<SimpleCalc />} />
      </Routes>
    </>
  );
}

export default App;
