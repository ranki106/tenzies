import Die from "./Die.jsx";
import Roll from "./Roll.jsx";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function Main() {
    const [dice, setDice] = useState(() => generateAllNewDice())

    const gameWon = dice.every(die => die.isHeld && 
        die.value === dice[0].value)

    function generateAllNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                isHeld: false,
                id: nanoid(),
                value: Math.floor(Math.random() * 6) + 1
            })
        }
        return newDice
    }

    function resetGame() {
        setDice(generateAllNewDice())
    }

    const updatedDice = dice.map((die) =>{
        return <Die 
                    value={die.value} 
                    key={die.id} 
                    isHeld={die.isHeld} 
                    hold={hold}
                    id={die.id}
                />
    })
 
    function rollDice() {
        if(gameWon) {
            setDice(generateAllNewDice())
            return
        } else {
            setDice(prevDice => {
                return prevDice.map(die => {
                    return die.isHeld ? 
                    {...die} : {
                        ...die,
                        value: Math.floor(Math.random() * 6) + 1,
                    }
                })
            })
        }
    }

    function hold(id) {
        setDice(prevDice => {
            return prevDice.map(die => {
                return die.id === id ? {
                    ...die,
                    isHeld: !die.isHeld,
                } : {...die}
            })
        })
    }

    return (
        <main >
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {updatedDice}
            </div>
            <Roll 
                handleClick={rollDice}
                gameWon={gameWon}
                className="roll-button"
            />
            {gameWon && <Confetti />}
        </main>
    )
}