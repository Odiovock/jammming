import React from "react";

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
        <div>
            <h2>Playlist</h2>
            {playlists.map((playlist) => (
                <div>
                <h3>{playlist.title}</h3>
                    <ul>
                        {playlist.tracks.map((track) => (
                            <li id={track.id} onClick={handleOnClick}>{track.name}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default Playlist;