import React from "react";
import styles from "../styles/tracklist.module.css"

function Tracklist (props) {
    const {searchResults} = props;

    if(searchResults) {
        const tracks = searchResults.tracks.items;
        console.log(tracks);

        return(
            <div className={styles.contentContainer}>
                {tracks.map((track) => (
                    <div key={track.id} className={styles.tracks}>
                        <a href={track.album.uri}><img src={track.album.images[2].url} alt="Album cover" className={styles.trackImg}/></a>
                        <ul>
                            <li><a href={track.uri}>{track.name}</a></li>
                            <li>Artist: {track.artists[0].name}</li>
                            <li>Album: {track.album.name}</li>
                        </ul>
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <>
            </>
        );
    }
}

export default Tracklist;