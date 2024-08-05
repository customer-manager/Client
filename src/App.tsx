import { BrowserRouter,Routes,Route } from "react-router-dom";
import Section from "./pages/section";
import LoginPage from "./pages/login";
import AuthGuard from "./utils/route-guard/authGuard";

const App=()=>{
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthGuard><Section></Section></AuthGuard>}></Route>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;