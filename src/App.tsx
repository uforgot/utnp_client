import { BrowserRouter, Route, Routes } from 'react-router';
import CoreLayout from '@/core/core.layout.tsx';
import PageMain from '@/page/page.main.tsx';

function App() {
  return (
    <BrowserRouter>
      <CoreLayout>
        <Routes>
          <Route path='/' element={<PageMain />} />
        </Routes>
      </CoreLayout>
    </BrowserRouter>
  );
}

export default App;
