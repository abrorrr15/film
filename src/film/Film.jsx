import { useEffect, useState, useRef } from "react";
import './film.css';
import { useMovies  } from "./useMovies";
import { useLang } from "./useLang";
import ru from "./icons/russia.png";
import eng from "./icons/united-kingdom.png";
import uz from "./icons/flag.png";
import Spinner from "../Spinner";


  const now = new Intl.DateTimeFormat("en", {
    year: "numeric",
    // day: "2-digit",
    // month: "2-digit",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
  }).format(new Date());
  const future = new Date().getFullYear() + 1;
  const time = `${now}-${future}`;
  

export default function Film() {
  const [search, setSearch] = useState('');

  const [result, setResult] = useState([]);
  
  const [query, setQuery] = useState('');
  
  const { filmData, loading, errorMsg} = useMovies({query, setResult});
  const { rus, english, uzbek, activeLang, handleChangeLang } = useLang(search, handleButton)

  // useEffect(() => {
  //   localStorage.setItem('filmData', JSON.stringify(filmData));
  //   console.log(localStorage);
  // }, [filmData]);

  useEffect(() => {
    document.title = `Film/${activeLang}`
    return () => {
      document.title = 'Hello to my website!';
    };
  }, [activeLang]);

  function handleButton() {
    setQuery(search)
  }


  return (
    <Top>
      <Head
        search={search}
        query={query}
        onInput={(e) => setSearch(e.target.value)}
        onButton={handleButton}
        onLang={handleChangeLang}
        activeLang={activeLang}
        setQuery={setQuery}
      >
        {!rus && !uzbek && english && <LogoEng />
          || !english && !uzbek && rus && <LogoRu />
          || !rus && !english && uzbek && <LogoUz />}

      </Head>
      <Main>
        {!rus && !uzbek && english && <FoundEng data={result} errorMsg={errorMsg}/>
          // || errorMsg && <ErrorEng/> 
          || !english && !uzbek && rus && <FoundRu data={result} errorMsg={errorMsg}/>
          // || errorMsg && <ErrorRu/> 
          || !rus && !english && uzbek && <FoundUz data={result} errorMsg={errorMsg}/>
          // || errorMsg && <ErrorUz/>
        }
        <br />
        {loading && <Spinner />}
        {!loading && !errorMsg && filmData && <First data={filmData} />}
      </Main>
      {!rus && !uzbek && english && <FootEng /> || !english && !uzbek && rus && <FootRu /> || !rus && !english && uzbek && <FootUz />}
    </Top>
  )
}
// function Saved({ watched }) {
//   return (
//     <div className="film-list">
//       {watched.map((item, i) => (
//         <ul key={i}>
//           <img src={item.Poster} />
//           <li>{item.Title}</li>
//           <p><span>Year:</span> <u>{item.Year}</u></p>
//         </ul>
//       ))}
//     </div>
//   )
// }
function Top({ children }) {
  return (
    <div className="container">
      {children}
    </div>
  )
}
function Head({ children, onInput, search, onButton, onLang, activeLang, setQuery }) {
  const inputEl = useRef(null)
  useEffect(()=>{ 
    function callback(e){

      if(document.activeElement === inputEl.current)
      return;

      if(e.code === 'Enter'){
      inputEl.current.focus();
      setQuery("");
    }}
    document.addEventListener('keydown', callback);
    return()=> document.addEventListener('keydown', callback);
  },[setQuery]);

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Digit1') {
        onLang('rus');
      } else if (e.code === 'Digit2') {
        onLang('eng');
      } else if (e.code === 'Digit3') {
        onLang('uz');
      }
    })
  }, [activeLang])
  
  return (
    <div className="head">{children}
      <div className="search">
        <input type="text"
        placeholder="Film name..." 
        value={search} 
        ref={inputEl} 
        onChange={onInput} />

        <button type="submit" 
        onClick={onButton}>🍭</button>
      </div>
      <select onChange={(e) => onLang(e.target.value)} value={activeLang}>
        <option value='rus'>ru</option>
        <option value='eng'>eng</option>
        <option value='uz'>uz</option>
      </select>
      <div className="lang">
        {/* Russian flag */}
        <img
          src={ru}
          value='rus'
          onClick={() => onLang('rus')}
          className={activeLang === 'rus' ? 'active' : ''}
          alt="Russian Flag"
        />
        {/* English flag */}
        <img
          src={eng}
          value='eng'
          onClick={() => onLang('eng')}
          className={activeLang === 'eng' ? 'active' : ''}
          alt="English Flag"
        />
        {/* Uzbek flag */}
        <img
          src={uz}
          value='uz'
          onClick={() => onLang('uz')}
          className={activeLang === 'uz' ? 'active' : ''}
          alt="Uzbek Flag"
        />
      </div>
    </div>
  )
}

function LogoEng() {
  return (
    <h2 className="logo-eng">🍟FilmSearch</h2>
  )
}
function LogoRu() {
  return (
    <h2 className="logo-ru">🍟Поиск Фильмов</h2>
  )
}
function LogoUz() {
  return (
    <h2 className="logo-uz">🍟Kinolar Olami</h2>
  )
}
function First({ data }) {
  return (
    <div className="film-list">
      {data?.map((item, index) => (
        <ul key={index}>
          <img src={item.Poster} />
          <li>{item.Title}</li>
          <p><span>Year:</span> <u>{item.Year}</u></p>
        </ul>
      ))}
    </div>
  )
}
function Main({ children, error }) {
  return (
    <div className="film-container">
      <br />
      {children}
    </div>
  )
}
function FoundEng({ data, errorMsg }) {
  return (
    <p>{errorMsg && <ErrorEng/> || data.totalResults && `Film Found: ${data.totalResults}`}</p>
  )
}
function FoundRu({ data, errorMsg }) {
  return (
    <p>{errorMsg && <ErrorRu/> || data.totalResults && `Найдено: ${data.totalResults}`}</p>
  )
}
function FoundUz({ data, errorMsg }) {
  return (
    <p>{errorMsg && <ErrorUz/> || data.totalResults && `Filmlar soni: ${data.totalResults}`}</p>
  )
}
function ErrorRu() {
  return (
    <p>He Найдено</p>
  )
}
function ErrorEng() {
  return (
    <p>Not Found</p>
  )
}
function ErrorUz() {
  return (
    <p>Malumot Topilmadi</p>
  )
}
function FootRu() {
  return (
    <div className="foot">
      <h3>🎁Автор Аброр</h3>
      <time>{time}</time>
    </div>
  )
}
function FootUz() {
  return (
    <div className="foot">
      <h3>🎁Muallif - Abror</h3>
      <time>{time}</time>
    </div>
  )
}
function FootEng() {
  return (
    <div className="foot">
      <h3>🎁Made by Abror</h3>
      <time>{time}</time>
    </div>
  )
}
