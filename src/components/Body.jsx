import Die from "./Die.jsx";
import Roll from "./Roll.jsx";
import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function Main() {
    const [dice, setDice] = useState(() => generateAllNewDice())
    const [rolls, setRolls] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)

    const rollButton = useRef(null)

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

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [seconds])

    useEffect(() => {
        if(seconds === 60) {
            setSeconds(0)
            setMinutes(prevMinutes => prevMinutes + 1)
        }
    }, [seconds])

    useEffect(() => {
        if(minutes === 60) {
            setMinutes(0)
            setHours(prevHours => prevHours + 1)
        }
    }, [minutes])
    

    function timesRolled() {
        setRolls(prevRolls => prevRolls + 1)
    }

    useEffect(() => {
        if(gameWon) {
            rollButton.current.focus()
        }
    }, [gameWon])

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
            setRolls(0)
            setSeconds(0)
            setMinutes(0)
            setHours(0)
            return
        } else {
            timesRolled()
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
                ref={rollButton}
                handleClick={rollDice}
                gameWon={gameWon}
                className="roll-button"
            />
            {gameWon && <Confetti />}
            <p>Times rolled: {rolls}
                <br/> Play Time: {hours} Hours {minutes} Minutes {seconds} Seconds</p>
        </main>
    )
}