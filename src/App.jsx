import { useState, useEffect } from 'react';
import { useId } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';

// Колбек-функція для обробки сабміту форми
const handleLogin = userData => {
  // Виконуємо необхідні операції з даними
  console.log(userData);
};

const LoginForm = ({ onLogin }) => {
  const loginId = useId();
  const passwordId = useId();
  const handleSubmit = evt => {
    evt.preventDefault();

    const form = evt.target;
    const { login, password } = form.elements;

    // Викликаємо пропс onLogin
    onLogin({
      login: login.value,
      password: password.value,
    });

    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={loginId}>Login</label>
      <input type="text" name="login" id={loginId} />
      <label htmlFor={passwordId}>Password</label>
      <input type="password" name="password" id={passwordId} />
      <button type="submit">Login</button>
    </form>
  );
};

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = evt => {
    setInputValue(evt.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
      <p>{inputValue}</p>
    </div>
  );
};

const LangSwitcher = ({ value, onSelect }) => {
  const selectId = useId();

  return (
    <div>
      <label htmlFor={selectId}>Choose language</label>
      <select
        id={selectId}
        value={value}
        onChange={evt => onSelect(evt.target.value)}
      >
        <option value="uk">Ukrainian</option>
        <option value="en">English</option>
        <option value="pl">Polish</option>
      </select>
    </div>
  );
};

const App = () => {
  const [clicks, setClicks] = useState(() => {
    const savedClicks = window.localStorage.getItem('saved-clicks');
    if (savedClicks !== null) {
      return Number(savedClicks);
    }
    return 0;
  });

  const [lang, setLang] = useState('uk');
  const [coffeeSize, setCoffeeSize] = useState('sm');

  const handleSizeChange = evt => {
    setCoffeeSize(evt.target.value);
  };

  useEffect(() => {
    window.localStorage.setItem('saved-clicks', clicks);
  }, [clicks]);

  const [hasAccepted, setHasAccepted] = useState(false);

  const handleChange = evt => {
    setHasAccepted(evt.target.checked);
  };

  return (
    <>
      <div>
        <h2>checkbox</h2>
        <label>
          <input
            type="checkbox"
            name="terms"
            checked={hasAccepted}
            onChange={handleChange}
          />
          I accept terms and conditions
        </label>
        <button type="button" disabled={!hasAccepted}>
          Proceed
        </button>
      </div>
      <div>
        <h2>Select coffee size</h2>
        <label>
          <input
            type="radio"
            name="coffeeSize"
            value="sm"
            checked={coffeeSize === 'sm'}
            onChange={handleSizeChange}
          />
          Small
        </label>
        <label>
          <input
            type="radio"
            name="coffeeSize"
            value="md"
            checked={coffeeSize === 'md'}
            onChange={handleSizeChange}
          />
          Meduim
        </label>
        <label>
          <input
            type="radio"
            name="coffeeSize"
            value="lg"
            checked={coffeeSize === 'lg'}
            onChange={handleSizeChange}
          />
          Large
        </label>
      </div>
      <div>
        <h2>select element</h2>
        <p>Selected language: {lang}</p>
        <LangSwitcher value={lang} onSelect={setLang} />
      </div>
      <div>
        <h2>Search bar</h2>
        <SearchBar />
      </div>
      <div>
        <h2>Please login to your account!</h2>
        {/* Передаємо колбек як пропс форми */}
        <LoginForm onLogin={handleLogin} />
      </div>
      <div>
        <h2>Clicks</h2>
        <button onClick={() => setClicks(clicks + 1)}>
          You clicked {clicks} times
        </button>
        <button onClick={() => setClicks(0)}>Reset</button>
      </div>
    </>
  );
};

export default App;
