export default function Roll(props){
    return(
        <button 
            className="roll-button"
            onClick={props.handleClick}
        >{props.gameWon ? "New Game" : "Roll"}
        </button>
    )
}