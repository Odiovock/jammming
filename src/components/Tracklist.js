import React from "react";

function Tracklist (props) {
    const tracks = props.tracklist;

    return(
        <div>
            <h2>Track list</h2>
            {tracks.map((track) => (
                <div key={track.id}>
                    <ul>
                        <li>{track.name}</li>
                        <li>{track.artist}</li>
                        <li>{track.album}</li>
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Tracklist;