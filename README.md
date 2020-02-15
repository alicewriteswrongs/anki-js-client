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

the app is built using
[create-react-app](https://github.com/facebook/create-react-app) because
things are just mad easy that way.

accordingly you

```js
yarn install
npm start
```

and that's about it.

note that you have to have anki open, and you have to have the AnkiConnect
add-on already installed.
