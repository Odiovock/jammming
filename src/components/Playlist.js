import React from "react";
import styles from "../styles/playlist.module.css";

function Playlist (props) {
    const {playlists, setPlaylists} = props;


    function handleOnClick (event) {
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

    return (
        <div className={styles.contentContainer}>
        {playlists.map((playlist) => (
            <div key={playlist.id} className={styles.playlists}>
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
}

export default Playlist;