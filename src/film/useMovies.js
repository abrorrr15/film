import { useState, useEffect } from "react";
import Spinner from "../Spinner";
const apiKey = "b1c9cb16";

export function useMovies({ query, setResult }) {
  const [filmData, setFilmData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  useEffect(() => {
    const controller = new AbortController();
    async function fetchFilm() {
      if (query < 3) return;
      try {
        setErrorMsg("");
        setLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Something went wrong. Try again!");
        }

        const data = await response.json();

        if (data.Response === "False") {
          throw new Error("Error. Try Again!");
        }

        setFilmData(data.Search);
        setResult(data);
        setLoading(false);
        setErrorMsg("");
      } catch (err) {
        console.error(err.message);
        if (err.name !== "AbortError") {
          setErrorMsg(err.message);
        }
        setFilmData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFilm();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { filmData, loading, errorMsg };
}
