import React from "react";
import styles from "../styles/playlist.module.css";

function Playlist (props) {
    const {
        playlists, 
        setPlaylists,
    } = props;


    function handleOnClick (event) {
        const targetId = event.currentTarget.id;
        console.log(targetId);
        if(window.confirm("Are you sure you want to delete this track from your playlist?") === true) {
            const newPlaylists = [];
            for (const playlist of playlists) {
                newPlaylists.push({
                        title: playlist.title, 
                        tracks: playlist.tracks.filter((track) => track.id !== targetId)
                });
            }
            setPlaylists((prev) => [...prev, newPlaylists]);
        } 
    }

    function handlePlaylistOnclick (event) {
        const targetId = parseInt(event.currentTarget.id);

        setPlaylists((prev) => {
            const workingArray = [...prev];
            for (var i = 0; i < workingArray.length; i++) {
                if(workingArray[i].id === targetId) {
                    workingArray[i].isSelected = true;
                } else {
                    workingArray[i].isSelected = false;
                }
            }
            return workingArray;
        });
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
                <div className={styles.tracksContainer}>
                    {playlist.tracks.map((track) => (
                        <div key={track.id} id={track.id} onClick={handleOnClick} className={styles.playlistsTracks}>
                            <img src={track.img} alt="Album cover"className={styles.trackImg}/>
                            <ul>
                                <li><a href={track.uri}>{track.name}</a></li>
                                <li>Artist: {track.artist}</li>
                                <li>Album: {track.album}</li>
                            </ul>
                        </div>
                    ))}
                </div>
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