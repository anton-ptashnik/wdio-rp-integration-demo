const fElem = require('./Utils').findElements

class _TestScreen {
    get logs() {
        return fElem('.log-grid .rp-table-row').map(e => new LogItem(e))
    }
}

class LogItem extends require('./WrappedUIElement') {
    get message() {
        return this.root.$('.log-message-view').getText()
    }
    get level() {
        return this.root.getAttribute('class').match(/level-(\w+)/)[1]
    }
}

const TestScreen = new _TestScreen()

module.exports = TestScreen