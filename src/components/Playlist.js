import React from "react";
import styles from "../styles/playlist.module.css";

function Playlist (props) {
    const {
        playlists, 
        setPlaylists,
        selectedPlaylist,
        setSelectedPlaylist
    } = props;


    function handleOnClick (event) {
        const proceedWithDeletion = window.confirm("Are you sure you want to delete this track from your playlist?");

        if( proceedWithDeletion === true) {
            const targetId = event.target.id;
            const newPlaylists = [];
            for (const playlist of playlists) {
                newPlaylists.push({
                        title: playlist.title, 
                        tracks: playlist.tracks.filter((track) => track.id !== targetId)
                });
            }
            setPlaylists(newPlaylists);
        } 
    }

    function handlePlaylistOnclick (event) {
        const targetId = parseInt(event.currentTarget.id);
        
        setSelectedPlaylist(targetId);
        setPlaylists((prev) => {
            const workingArray = [...prev];
            console.log(workingArray);
            for (var i = 0; i < workingArray.length; i++) {
                if(workingArray[i].id === targetId) {
                    workingArray[i].isSelected = true;
                } else {
                    workingArray[i].isSelected = false;
                }
            }
            return workingArray;
        });

        console.log("Clicked");
    }

    if(playlists) {
        return (
            <div className={styles.contentContainer}>
            {playlists.map((playlist) => (
                <div 
                    key={playlist.id}
                    id={playlist.id} 
                    onClick={handlePlaylistOnclick}  
                    className={playlist.isSelected ? styles.selectedPlaylist : styles.playlists}
                >
                <h3>{playlist.title}</h3>
                    <ul>
                        {playlist.tracks.map((track) => (
                            <li key={track.id} onClick={handleOnClick}>{track.name}</li>
                        ))}
                    </ul>
                </div>
            ))}
            </div>
        )
    } else {
        return (
            <>
            </>
        );
    }
}

export default Playlist;