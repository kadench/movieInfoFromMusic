# What Movie is This Score From?
I'm a movie/OST buff, and sometimes, I want to know what movie a score (piece of music) is from. I ask Alexa, it tells me the score name; not the movie name; nor the director's name. It doesn't know *anything*. The same thing happens with Siri. I find it annoying because I catch myself asking for an unreachable answer all the time.
## How This Should Work

I don't expect that I'll get there fully, but This website's goal to fetch movie information from ANY music streaming app link provided. In the future, I hope to make it work with Alexa or Siri so I can get the correct answer to my question.

## How It Works Now
### app-specific share links accepted:
(some streaming services don't have specific songs on them)
- [Amazon Music](https://music.amazon.com)
- [Apple Music](https://music.apple.com)
- [Audius](https://audius.co)
- [Deezer](https://www.deezer.com)
- [Napster](https://www.napster.com)
- [Pandora](https://www.pandora.com)
- [SoundCloud](https://soundcloud.com)
- [Spotify](https://open.spotify.com)
- [TIDAL](https://tidal.com)
- [Yandex Music](https://music.yandex.com)
- [YouTube Music](https://music.youtube.com)
### Odesli Songlink
My current plan is to use [Odesli's Songlink™](www.notion.so/d0ebe08a5e304a55928405eb682f6741) to get `artistName` and `title` from its return. No movie information is fetched from this API (a snippet of a previous fetch I made is shown below; this should be enough to get the movie information):

```json
{
    "entityUniqueId": "SPOTIFY_SONG::76ndZjRPctiH0Gq9HQSouR",
    "userCountry": "US",
    "pageUrl": "https://song.link/s/76ndZjRPctiH0Gq9HQSouR",
    "entitiesByUniqueId": {
        "AMAZON_SONG::B001NSUXVE": {
            "id": "B001NSUXVE",
            "type": "song",
            "title": "The Beginning Of A Friendship (Soundtrack Reissue (2002))",
            "artistName": "John Williams",
            ...
```
### MusicBrainz
The above part works. However, my original plan to use [MusicBrainz](https://musicbrainz.org) does not. The API doesn't hold the information I need.

### No Auth/Secret Public-only Goal
I'm attempting to avoid any service that uses **OAuth** or client secrets. If I get to a point where I absolutely can't move forward, I'll change my approach. I'm doing this because I find it's a hassle to require people to sign in or if I have to pay for API usage, especially for a demo. Most of the music or movie APIs I've seen (except ITunes API, MusicBrainz™ API, and WikiData apparently (haven't looked into it, but I plan too)) require some sort of OAuth, payment or secret to use.  


## Sources
- [ChatGPT](https://chatgpt.com) - Last Accessed 10/4/25
- [Odesli's Songlink™ API Documentation](www.notion.so/d0ebe08a5e304a55928405eb682f6741) - Last Accessed 10/4/25
- [MusicBrainz API Documentation](https://musicbrainz.org/doc/MusicBrainz_API) - Last Accessed 10/4/25
- [MDN Fetch Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) - Last Accessed 10/3/25
- [iTunes Search API Docs](https://developer.apple.com/) - Last Accessed 9/28/25
