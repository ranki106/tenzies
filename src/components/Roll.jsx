export default function Roll(props){
    return(
        <button 
            className="roll-button"
            onClick={props.handleClick}
            ref={props.ref} 
        >{props.gameWon ? "New Game" : "Roll"}
        </button>
    )
}