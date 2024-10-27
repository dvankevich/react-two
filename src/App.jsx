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

const App = () => {
  const [clicks, setClicks] = useState(() => {
    const savedClicks = window.localStorage.getItem('saved-clicks');
    if (savedClicks !== null) {
      return Number(savedClicks);
    }
    return 0;
  });

  useEffect(() => {
    window.localStorage.setItem('saved-clicks', clicks);
  }, [clicks]);

  return (
    <>
      <div>
        <h1>Please login to your account!</h1>
        {/* Передаємо колбек як пропс форми */}
        <LoginForm onLogin={handleLogin} />
      </div>
      <div>
        <button onClick={() => setClicks(clicks + 1)}>
          You clicked {clicks} times
        </button>
        <button onClick={() => setClicks(0)}>Reset</button>
      </div>
    </>
  );
};

export default App;
