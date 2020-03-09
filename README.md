# anki client

a custom web frontend for Anki that I built using react and the very nice
anki plugin [AnkiConnect](https://foosoft.net/projects/anki-connect/).

AnkiConnect basically gives you a REST api that you can access locally to
get information about your anki decks, cards, notes, and so on.

I'm using anki to study Japanese, and this client is basically a way to
view my progress and review what I've learned as I make my way through
a custom Heisig / WaniKani-like set of decks that I made.

If anyone at all is interested in this contact me and I can share it with
you, but for now the deck is private :)

## running it

the app is available at <https://aliceriot.github.io/anki-js-client/>.
note that it makes request to your localhost, so you must have anki open
and running on your computer with AnkiConnect installed.

to run it locally for development and so on just

```
yarn install
yarn start
```

the app is built using
[create-react-app](https://github.com/facebook/create-react-app) because
things are just mad easy that way.

to deploy do

```
yarn deploy
```
