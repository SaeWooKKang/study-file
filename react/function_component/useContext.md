# useConext 흐름

1. React.createContext로 context만들고
``` javascript
// context/ThemeContext.js
import { createContext } from 'react';

export const ThemeContext = createContext(null);
```

2. Context.Provider로 감싸고 
``` javascript
// ./App
import { ThemeContext } from './context/ThemeContext';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark}}>
      <Header />
    </ThemeContext.Provider>
  );
}
```

3. useContext로 해당 컴포넌트에서 사용
``` javascript
// ./Header
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';

function Header() {
  const {isDart, setIsDark} = useConext(ThemeContext);

  const handleBgToggle = () => {
    setIsDark((prev) => !prev);
  }

  return  (
    <>
      <div style={{background: isDark ? 'black' : 'white'}}>
        header
      </div>
      <button onClick={handleBgToggle}>bg toggle</button>
    </>
  );
}
```

버튼 클릭시 상태 변경 했으므로  
해당 context사용하는 App, Header 컴포넌트 모두 리렌더링
