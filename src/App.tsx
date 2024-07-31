import { BrowserRouter,Routes,Route } from "react-router-dom";
import Section from "./pages/section";
import LoginPage from "./pages/login";

const App=()=>{
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Section></Section>}></Route>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;