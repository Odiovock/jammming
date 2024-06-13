import React from "react";
import styles from "../styles/playlist.module.css";

function Playlist (props) {
    const {
        playlists, 
        setPlaylists,
        newPlaylistName,
        setNewPlaylistName
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
                        newPlaylist.isAddingTracks = true;
                        newPlaylist.isChanged = true;
                        newPlaylists.push(newPlaylist);
                    } else {
                        newPlaylists.push(playlist);
                    }
                }
                return newPlaylists;
            });
        } 
    }

    function handlePlaylistOnclick (event) {
        const targetId = parseInt(event.currentTarget.id);

        setPlaylists((prev) => {
            for (const playlist of prev) {
                if(playlist.id === targetId) {
                    playlist.isSelected = true;
                } else {
                    playlist.isSelected = false;
                }
            }
            return [...prev];
        });
    }

    function handleRenamePlaylistOnClick (event) {
        const targetPlaylist = playlists.filter((playlist) => parseInt(playlist.id) === parseInt(event.currentTarget.getAttribute("playlistid")));
        const targetName = targetPlaylist[0].title;
        
        setNewPlaylistName(targetName);
        setPlaylists((prev) => {
            for (const playlist of prev) {
                if (playlist.id === targetPlaylist[0].id) {
                    playlist.isRenaming = true;
                } else {
                    playlist.isRenaming = false;
                }
            }

            return [...prev];
        });
    }

    function handleRenameFieldOnChange (event) {
        setNewPlaylistName(event.target.value);
    }

    function handleRenameOnKeyDown (event) {
        if(event.key === "Enter") {
            setPlaylists((prev) => {
                for (const playlist of prev) {
                    if (playlist.isRenaming && playlist.title !== newPlaylistName) {
                        playlist.title = newPlaylistName;
                        playlist.isRenaming = false;
                        playlist.isRenamed = true;
                        playlist.isChanged = true;
                    } else {
                        playlist.isRenaming = false;
                    }
                }

                return [...prev];
            })
        }
    }

    function handleRenameOnBlur () {
        setPlaylists((prev) => {
            for (const playlist of prev) {
                playlist.isRenaming = false;
            }

            return [...prev];
        })
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
                                onClick={() => handleDeletePlaylistOnClick(playlist.id)}
                        >X</button>
                        {!playlist.isChanged ? <p>Saved</p> : ""}   
                        {
                            playlist.isRenaming ? 
                            <input 
                                type="text" 
                                autoFocus 
                                value={newPlaylistName} 
                                onChange={handleRenameFieldOnChange} 
                                onKeyDown={handleRenameOnKeyDown}
                                onBlur={handleRenameOnBlur}
                            /> : 
                            <h3 playlistid={playlist.id} onClick={handleRenamePlaylistOnClick}>{playlist.title}</h3>
                        }
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