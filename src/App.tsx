import { useState } from 'react';
import "@fontsource/poppins";
import MarkDownOutput from './components/MarkDownOutput';
import { Telescope } from "lucide-react";
import './App.css';
import LogoImage from "./assets/logo.svg";
import BrandNameImage from "./assets/brandname.png";

function App() {

  const [searchedText, setSearchedText] = useState('');
  const [unFormattedOutputText, setUnFormattedOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function fetchHistory(e: React.SubmitEvent) {

    e.preventDefault();
    setLoading(true);

    if (!searchedText) {
      setMessage("Search is empty!")
      return;
    }

    try {

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/history?search=${searchedText}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST"
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUnFormattedOutputText(data.output);
      }

    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err?.message)
        console.error(err?.message);
      } else {
        setMessage("Something went wrong!");
      }
      throw err;
    } finally {
      setLoading(false);
    }

  }

  return (
    <>

      <div className="header-section">
        <div className="brand">
          <img src={LogoImage} alt="" width="85" className='brand-logo' />
          <img src={BrandNameImage} alt="" width="135" className='brand-name' />
        </div>
      </div>

      <form onSubmit={fetchHistory}>
        <div className="container" style={container}>
          <input 
            type="text"
            value={searchedText}
            onChange={(e) => setSearchedText(e.target.value)}
            style={inputStyle}
            placeholder="What's on your mind?"
            required
          /> 
          <button 
            type="submit" 
            style={buttonStyle}
            disabled={loading}
          >
            Search History <Telescope size={18} />
          </button>
        </div>
      </form>

      { message && (
        <>
          <p style={{ textAlign: "center" }}>
            {message}
          </p> 
        </>
      )}
      {
        loading ? (
          <>
            <p style={{ textAlign: "center" }}>
              Fetch the history of {searchedText} ...
            </p> 
          </>
        ): (
          <MarkDownOutput unFormattedText={unFormattedOutputText} />
        )
      }
    </>
  )
}

const inputStyle = {
  outline: "none",
  padding: "12px 18px",
  border: "none",
  borderRadius: ".6rem",
  backgroundColor: "#e7e7e7",
  color: "#2b2d42",
  width: "60vmin",
  height: "4vmin",
  fontSize: "14px",
  letterSpacing: "2px",
};

const buttonStyle = {
  border: "none",
  outline: "none",
  borderRadius: ".5rem",
  backgroundColor: "#2b2d42",
  color: "#f1f1f1",
  padding: "12px 18px",
  cursor: "pointer",
  height: "7.5vmin",
  display: "flex",
  gap: ".5rem",
  alignItems: "center"
};

const container = {
  width: "100vw",
  height: "20vmin",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  gap: "2rem",
  padding: "0 2rem"
}

export default App;
