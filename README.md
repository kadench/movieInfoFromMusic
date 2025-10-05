# What Movie is This Score From?
I'm a movie/OST buff, and sometimes, I want to know what movie a score (piece of music) is from. I ask Alexa, it tells me the score name; not the movie name; nor the director's name. It doesn't know *anything*. The same thing happens with Siri. I find it annoying because I catch myself asking for an unreachable answer all the time.

## How This Should Work
I'm currently constructing a website to fetch movie information from ANY music streaming app link provided. In the future, I hope to make it work with Alexa or Siri so I can get the correct answer to my question.
### The Website's Design
The website is designed to be simple. Simply paste in a share link and press `enter` or **GO**. The website will do the rest.

The search bar looks like this:

<p align="center">
    <img alt="music to movie search bar" src="https://i.imgur.com/wltXuoC.png" />
</p>

Movie information will be displayed like this:

<p align="center">
    <img alt="movie info display example" src="https://i.imgur.com/01cZCeh.png" />
</p>

Errors will be displayed to the user here:

<p align="center">
    <img alt="error bubble display example" src="https://i.imgur.com/G1WvWNH.png" />
</p>

## What Does This Website Use?
### Odesli's Songlink
Songlink is a service that allows you to share music with people who don't have the same service as you. It's designed to return all of the general song information (`artistName`, `title`, `ThumbnailUrl`, etc.) from any of the services below. This is public, no-key API with a max **10** fetches/min.
<table align="center">
    <tr><th>App Share Links Songlink Accepts:</th></tr>
    <tr><td><a href="https://music.amazon.com">Amazon Music</a></td></tr>
    <tr><td><a href="https://music.apple.com">Apple Music</a></td></tr>
    <tr><td><a href="https://audius.co">Audius</a></td></tr>
    <tr><td><a href="https://www.deezer.com">Deezer</a></td></tr>
    <tr><td><a href="https://www.napster.com">Napster</a></td></tr>
    <tr><td><a href="https://www.pandora.com">Pandora</a></td></tr>
    <tr><td><a href="https://soundcloud.com">SoundCloud</a></td></tr>
    <tr><td><a href="https://open.spotify.com">Spotify</a></td></tr>
    <tr><td><a href="https://tidal.com">TIDAL</a></td></tr>
    <tr><td><a href="https://music.yandex.com">Yandex Music</a></td></tr>
    <tr><td><a href="https://music.youtube.com">YouTube Music</a></td></tr>
</table>

<p align="center"><em>*Not all songs are on each of these services.*</em></p>

### How Does it Work?
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

### No Auth/Secret, Public-only Goal
I'm attempting to avoid any service that uses **OAuth** or client secrets. If I get to a point where I absolutely can't move forward, I'll change my approach. I'm doing this because I find it's a hassle to require people to sign in or if I have to pay for API usage, especially for a demo. Most of the music or movie APIs I've seen (except ITunes API, MusicBrainz™ API, and WikiData apparently (haven't looked into it, but I plan too)) require some sort of OAuth, payment or secret to use.  


## Sources
- [ChatGPT](https://chatgpt.com) - Last Accessed 10/4/25
- [Odesli's Songlink™ API Documentation](https://notion.so/d0ebe08a5e304a55928405eb682f6741) - Last Accessed 10/4/25
- [MusicBrainz API Documentation](https://musicbrainz.org/doc/MusicBrainz_API) - Last Accessed 10/4/25
- [MDN Fetch Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) - Last Accessed 10/3/25
- [iTunes Search API Docs](https://developer.apple.com/) - Last Accessed 9/28/25
