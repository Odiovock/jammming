import React from "react";
import styles from "../styles/tracklist.module.css"

function Tracklist (props) {
    // const tracks = props.tracklist;
    const newList = props.searchResults;

    if(newList) {
        const tracks = newList.tracks.items;
        console.log(tracks);

        return(
            <div>
                <h2>Track list</h2>
                <div className={styles.contentContainer}>
                    {tracks.map((track) => (
                        <div key={track.id} className={styles.tracks}>
                            <ul>
                                <li>{track.name}</li>
                                <li>{track.artists[0].name}</li>
                                <li>{track.album.name}</li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Tracklist;