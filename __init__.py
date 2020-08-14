from aqt import mw
from aqt.utils import showInfo
from aqt.qt import *

def initAddon():
    cardCount = mw.col.cardCount()
    showInfo("Card count: %d" % cardCount)

action = QAction("test", mw)

action.triggered.connect(initAddon)

mw.form.menuTools.addAction(action)
