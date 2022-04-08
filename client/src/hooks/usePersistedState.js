import { useState, useEffect, useRef } from "react";

// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
// localStorage.setItem('myCat', 'Tom');
// const cat = localStorage.getItem('myCat');
// localStorage.removeItem('myCat');

// const [numCookies, setNumCookies] = usePersistedState(1000, "num-cookies");

const usePersistedState = (name, defaultValue) => {
  const nameRef = useRef(name);
  const [value, setValue] = useState(() => {
    return localStorage.getItem(nameRef.current)
    ? JSON.parse(localStorage.getItem(nameRef.current))
    : defaultValue
  });

  useEffect(() => {
    localStorage.setItem(nameRef.current, JSON.stringify(value));
  // }, [name, value]);
  });
    
  return [value, setValue];
};

export default usePersistedState;