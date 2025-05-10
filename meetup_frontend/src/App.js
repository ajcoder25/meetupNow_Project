import logo from "./logo.svg";
import "./App.css";
import useFetch from "./useFetch";
import capture from "./assets/capture.png";
import { useState } from "react";
import Header from "./component/Header";

export default function App() {
  const [search, setSearch] = useState("");
  const { data, loading, error } = useFetch(
    "https://meetupnow-pro.onrender.com/v1/events"
  );

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        data={data}
        loading={loading}
      />
    </>
  );
}
