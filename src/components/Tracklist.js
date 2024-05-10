import React from "react";
import styles from "../styles/tracklist.module.css"

function Tracklist (props) {
    const tracks = props.tracklist;

    return(
        <div>
            <h2>Track list</h2>
            <div className={styles.contentContainer}>
                {tracks.map((track) => (
                    <div key={track.id} className={styles.tracks}>
                        <ul>
                            <li>{track.name}</li>
                            <li>{track.artist}</li>
                            <li>{track.album}</li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tracklist;