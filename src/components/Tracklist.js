import React from "react";
import styles from "../styles/tracklist.module.css"
import { click } from "@testing-library/user-event/dist/click";
import { type } from "@testing-library/user-event/dist/type";

function Tracklist (props) {
    const {
        searchResults,
        playlists,
        setPlaylists
    } = props;

    function handleAddOnclick (event) {
        event.preventDefault();
        const clickedId = event.target.value;
        console.log(clickedId);
        

        const workingArray = [...playlists];
        const currentTrackArray = searchResults.tracks.items;
        for (const playlist of workingArray) {
            if (playlist.isSelected) {
                console.log(playlist);
                console.log(playlist.tracks.indexOf(clickedId));
                if(playlist.tracks.indexOf(clickedId) === -1) {
                    const selectedTrack = currentTrackArray.filter((track) => track.id === clickedId);
                    const trackdetails = {
                        "id": selectedTrack[0].id,
                        "name": selectedTrack[0].name,
                        "artist": selectedTrack[0].artists[0].name,
                        "album": selectedTrack[0].album.name,
                        "uri": selectedTrack[0].uri,
                        "preview": selectedTrack[0].preview_url,
                        "img": selectedTrack[0].album.images[2].url
                    }
                    playlist.tracks.push(trackdetails);
                }
            }
        }
        setPlaylists(workingArray);
    }

    if(searchResults) {
        const tracks = searchResults.tracks.items;

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
                        <button type="submit" value={`play${track.id}`}>Play</button>
                        <button type="submit" value={track.id} onClick={handleAddOnclick}>Add</button>
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