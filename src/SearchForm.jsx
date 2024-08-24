import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "./context";

const SearchForm = () => {
  const [inputVal, setInputVal] = useState("");
  const { setSearchTerm } = useGlobalContext();
  const submitBtn = (event) => {
    event.preventDefault();
    if (inputVal.trim()) {
      setSearchTerm(inputVal);
      setInputVal("");
      toast.success("sucess");
    } else {
      toast.error("Please enter a value");
    }
  };

  return (
    <div className="top-bar">
      <h1 className="title">Bon Pexel Photos</h1>
      <div className="logo">
        <img
          style={{ maxWidth: "120px" }}
          src="../public/logo.png"
          alt="project logo"
        />
      </div>
      <form className="search-form" onSubmit={submitBtn}>
        <input
          placeholder="Cat"
          type="text"
          name="search"
          className="form-input search-input"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SearchForm;
