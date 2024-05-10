import React from "react";

function Tracklist (props) {
    const tracks = props.tracks;

    return(
        <div>
            <h1>Track list</h1>
            {tracks.map((track) => (
                <div>
                    <ul>
                        <li>{track.title}</li>
                        <li>{track.artist}</li>
                        <li>{track.album}</li>
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Tracklist;