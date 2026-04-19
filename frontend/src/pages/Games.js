import React, { useState } from 'react';

const Games = () => {
  const [view, setView] = useState('menu');
  const [memoryCards, setMemoryCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);

  const quizData = [
    { q: "Which instrument has 88 keys?", a: "Piano", opts: ["Violin", "Piano", "Drums"] },
    { q: "Who is known as the King of Pop?", a: "Michael Jackson", opts: ["Elvis Presley", "Michael Jackson", "Prince"] }
  ];

  // INIT MEMORY GAME
  const initMemory = () => {
    const icons = ['🎸','🎸','🎹','🎹','🥁','🥁','🎷','🎷'];

    const shuffled = icons
      .sort(() => Math.random() - 0.5)
      .map((icon, i) => ({
        id: i,
        icon,
        flipped: false,
        matched: false
      }));

    setMemoryCards(shuffled);
    setFlipped([]);
    setView('memory');
  };

  // CLICK CARD
  const handleClick = (id) => {
    const card = memoryCards.find(c => c.id === id);
    if (!card || card.flipped || card.matched || flipped.length === 2) return;

    const updated = memoryCards.map(c =>
      c.id === id ? { ...c, flipped: true } : c
    );

    const newFlipped = [...flipped, id];
    setMemoryCards(updated);
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const first = updated.find(c => c.id === newFlipped[0]);
      const second = updated.find(c => c.id === newFlipped[1]);

      if (first.icon === second.icon) {
        // MATCH
        setMemoryCards(prev =>
          prev.map(c =>
            c.icon === first.icon ? { ...c, matched: true } : c
          )
        );
        setFlipped([]);
      } else {
        // NOT MATCH
        setTimeout(() => {
          setMemoryCards(prev =>
            prev.map(c =>
              newFlipped.includes(c.id)
                ? { ...c, flipped: false }
                : c
            )
          );
          setFlipped([]);
        }, 800);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <h1>Games Page</h1>

      {/* MENU */}
      {view === 'menu' && (
        <>
          <button onClick={() => setView('quiz')}>Quiz</button>
          <button onClick={initMemory}>Memory</button>
        </>
      )}

      {/* BACK BUTTON */}
      {view !== 'menu' && (
        <button onClick={() => setView('menu')}>Back</button>
      )}

      {/* QUIZ */}
      {view === 'quiz' && (
        <div>
          <h3>{quizData[quizIndex].q}</h3>

          {quizData[quizIndex].opts.map(opt => (
            <button
              key={opt}
              onClick={() => {
                if (opt === quizData[quizIndex].a) {
                  if (quizIndex + 1 < quizData.length) {
                    setQuizIndex(quizIndex + 1);
                  } else {
                    alert("Finished!");
                    setQuizIndex(0);
                  }
                } else {
                  alert("Wrong");
                }
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* MEMORY */}
      {view === 'memory' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 80px)',
          gap: 10,
          justifyContent: 'center'
        }}>
          {memoryCards.map(card => (
            <div
              key={card.id}
              onClick={() => handleClick(card.id)}
              style={{
                width: 80,
                height: 80,
                background: card.flipped || card.matched ? '#fff' : '#333',
                color: card.flipped || card.matched ? '#000' : '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: 24,
                borderRadius: 6
              }}
            >
              {card.flipped || card.matched ? card.icon : "?"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Games;