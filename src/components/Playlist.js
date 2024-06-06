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
            setPlaylists((prev) => {
                const newPlaylists = [];
                for (const playlist of prev) {
                    const filteredPlaylist = playlist.tracks.filter((track) => track.id !== targetId);
                    const newPlaylist = playlist;
                    newPlaylist.tracks = [...filteredPlaylist];
                    newPlaylists.push(newPlaylist);
                }
                return newPlaylists;
            });
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

    console.log(playlists);
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
                    <div className={styles.stickyContent}>
                        <h3 >{playlist.title}</h3>
                        <hr/>
                    </div>
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