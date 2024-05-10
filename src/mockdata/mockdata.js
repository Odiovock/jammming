export const Tracks = [
    {
        id: "1",
        name: "Song of test",
        artist: "Zelda",
        album: "Ocarina fire"
    },
    {
        id: "2",
        name: "Song of time",
        artist: "Zelda",
        album: "Ocarina oldies"
    },
    {
        id: "3",
        name: "Gerudo Valey",
        artist: "Ganonchadorf",
        album: "Ocarina fire"
    },
    {
        id: "4",
        name: "Store funk",
        artist: "Merchant A",
        album: "Ocarina oldies"
    }
]

export const Playlists = [
    {
        title: "My sherona",
        tracks: [
          Tracks[0],
          Tracks[1]
        ]
      },
      {
        title: "Guilty pleasures",
        tracks: [
            Tracks[2],
            Tracks[3]
        ]
      }
]