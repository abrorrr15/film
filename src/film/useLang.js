import { useState, useEffect } from "react";

export function useLang(search, handleButton){
  const [rus, setRus] = useState(true);
  const [english, setEnglish] = useState(false);
  const [uzbek, setUzbek] = useState(false);
  const [activeLang, setActiveLang] = useState('rus');


  function handleChangeLang(lang) {
    switch (lang) {
      case 'rus':
        setRus(true);
        setEnglish(false);
        setUzbek(false);
        setActiveLang('rus');
        break;
      case 'eng':
        setRus(false);
        setEnglish(true);
        setUzbek(false);
        setActiveLang('eng');
        break;
      case 'uz':
        setUzbek(true);
        setEnglish(false);
        setRus(false);
        setActiveLang('uz');
        break;
      default:
        setRus(true);
        setEnglish(false);
        setUzbek(false);
        setActiveLang('rus')
        break;
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Enter') {
        handleButton()
      }
    })
  }, [search]);

  return { rus, english, uzbek, activeLang, handleChangeLang }
}