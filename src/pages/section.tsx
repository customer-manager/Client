import Calendar from "../components/Calendar";
import Navbar from "../components/Navbar";
import "../App.css";
import SearchBox from "../components/SearchBox";

const Section=()=>{
  return (
    <>
    <Navbar></Navbar>
    <SearchBox></SearchBox>
    <div style={{marginTop:"120px"}}>
    <Calendar></Calendar>
    </div>
    </>
  )
}

export default Section;