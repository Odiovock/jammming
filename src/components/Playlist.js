import React from "react";

function Playlist (props) {
    const playlists = props.playlists;

    return (
        <div>
            <h2>Playlist</h2>
            {playlists.map((playlist) => (
                <div>
                <h3>{playlist.title}</h3>
                    <ul>
                        {playlist.tracks.map((track) => (
                            <li>{track}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default Playlist;