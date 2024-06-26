import React from "react";
import styles from "../styles/tracklist.module.css"

function Tracklist (props) {
    const {
        searchResults,
        playlists,
        setPlaylists
    } = props;

    function handleAddOnclick (event) {
        event.preventDefault();
        const clickedId = event.target.value;

        const workingArray = [...playlists];
        const currentTrackArray = searchResults.tracks.items;
        for (const playlist of workingArray) {
            if (playlist.isSelected) {
                if(playlist.tracks.find((track) => track.id === clickedId) === undefined) {
                    const selectedTrack = currentTrackArray.filter((track) => track.id === clickedId);
                    const trackdetails = {
                        "id": selectedTrack[0].id,
                        "name": selectedTrack[0].name,
                        "artist": selectedTrack[0].artists[0].name,
                        "album": selectedTrack[0].album.name,
                        "uri": selectedTrack[0].uri,
                        "preview": selectedTrack[0].preview_url,
                        "img": selectedTrack[0].album.images[2].url,
                        "playlist": playlists.find((playlist) => playlist.isSelected).id
                    }
                    playlist.tracks.push(trackdetails);
                    playlist.isAddingTracks = true;
                    playlist.isChanged = true;
                } else {
                    window.alert("This song is already part of the selected playlist");
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
                            <li><span>Artist:</span> {track.artists[0].name}</li>
                            <li><span>Album:</span> {track.album.name}</li>
                        </ul>
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