import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center bg-gradient-to-r from-blue-50 to-green-50 py-16 px-6">
      <div className="flex flex-col gap-6 my-2 max-w-2xl mx-auto">
        <span className="mx-auto px-6 py-2 rounded-lg bg-blue-100 text-blue-600 font-semibold text-sm shadow-md">
          Your Gateway to a Successful Career
        </span>
        <h1 className="text-4xl font-extrabold leading-tight text-gray-900">
          Find & Land Your <br />{" "}
          <span className="text-green-600">Dream Job</span> Today!
        </h1>
        <p className="text-gray-700 text-lg max-w-xl mx-auto">
          Explore thousands of opportunities that fit your passion and skills.
          Your next adventure starts here!
        </p>
        <div className="flex w-full max-w-xl mx-auto shadow-lg border border-gray-400 rounded-lg overflow-hidden items-center bg-white">
          <input
            type="text"
            placeholder="Search for jobs..."
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full px-5 py-3 text-gray-800"
          />
          <Button
            onClick={searchJobHandler}
            className="bg-green-500 hover:bg-green-600 transition-all rounded-none px-6 py-3 text-white font-bold"
          >
            <Search className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
