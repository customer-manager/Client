import Calendar from "../components/Calendar";
import Navbar from "../components/Navbar";
import "../App.css";

const Section=()=>{
  return (
    <>
    <Navbar></Navbar>
    <div style={{marginTop:"120px"}}>
    <Calendar></Calendar>
    </div>
    </>
  )
}

export default Section;