import React from "react";
import styles from "../styles/playlist.module.css";

function Playlist (props) {
    const {
        playlists, 
        setPlaylists,
    } = props;


    function handleDeleteTrackOnClick (event) {
        const targetId = event.currentTarget.id;
        const targetPlaylist = event.currentTarget.getAttribute("playlist");
        
        if(window.confirm("Are you sure you want to delete this track from your playlist?") === true) {
            setPlaylists((prev) => {
                const newPlaylists = [];
                for (const playlist of prev) {
                    if(playlist.id.toString() === targetPlaylist.toString()) {
                        const filteredPlaylist = playlist.tracks.filter((track) => track.id !== targetId);
                        const newPlaylist = playlist;
                        newPlaylist.tracks = [...filteredPlaylist];
                        newPlaylists.push(newPlaylist);
                    } else {
                        newPlaylists.push(playlist);
                        console.log(playlist.id);
                        console.log(targetPlaylist);
                    }
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

    function handleDeletePlaylistOnClick (parent, event) {
        if(window.confirm("Are you sure you want to delete this playlist?")) {
            setPlaylists((prev) => {
                const filteredPlaylistArray = prev.filter((playlist) => playlist.id !== parent);
                return filteredPlaylistArray;
            });
        }
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
                    <div className={styles.stickyContent}>
                    <button
                            style={{float: "right", top: "0px"}}
                            onClick={() => handleDeletePlaylistOnClick(playlist.id)}
                    >X</button>   
                        <h3 >{playlist.title}</h3>
                        <hr/>
                    </div>
                    <div className={styles.tracksContainer}>
                        {playlist.tracks.map((track) => (
                            <div key={track.id} className={styles.playlistsTracks}>
                                <button 
                                    style={{float: "right", margin: "10px"}} 
                                    id={track.id} 
                                    playlist={track.playlist} 
                                    onClick={handleDeleteTrackOnClick}
                                >X</button>
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