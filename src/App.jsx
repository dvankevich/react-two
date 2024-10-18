import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

const Modal = () => {
  useEffect(() => {
		// Зберігаємо ідентифікатор інтервалу в змінну
    const intervalId = setInterval(() => {
      console.log(`Interval - ${Date.now()}`);
		  }, 2000);
		
		return () => {
			// Очищаємо інтервал за його ідентифікатором
      clearInterval(intervalId);
      console.log(`clean interval with ID ${intervalId}`);
      
		};
  }, []);

  return <div>Modal</div>;
};

const App = () => {
  const [clicks, setClicks] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("Effect");

    return () => {
      console.log("Clean up");
    };
  });

    // Оголошуємо ефект
  useEffect(() => {
    document.title = `You clicked ${clicks} times`;
  });

  // режимі розробки будь-який компонент монтується двічі. 
  useEffect(() => {
    // Саме тому ми бачимо повідомлення двічі. 
    console.log("You can see me only once!");
  }, []);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close" : "Open"}
      </button>
      {isOpen && <Modal />}

      <button onClick={() => setClicks(clicks + 1)}>
         You clicked {clicks} times
      </button>
    </div>
  );
};

export default App
