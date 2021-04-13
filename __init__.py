from aqt import mw
from aqt.utils import showInfo
from aqt.qt import *

from anki import hooks

def initAddon():
    deckId = mw.col.decks.id("español")
    deck = mw.col.decks.select(deckId)

    ids = mw.col.findCards("deck:español")
    showInfo("cards in español: %d" % len(ids))

action = QAction("test", mw)

action.triggered.connect(initAddon)

mw.form.menuTools.addAction(action)


