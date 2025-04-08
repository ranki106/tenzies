export default function Die(props){
    
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white",
    }

    return(
        <button
            onClick={() => props.hold(props.id)}
            style={styles}
        >
            {props.value}
        </button>
    )
}