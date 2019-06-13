const fElem = require('./Utils').findElements

class _TestsScreen {
    get list() {
        return fElem('[data-js-launches-container] > .row').map(e => new TestItem(e))
    }
}

class TestItem extends require('./WrappedUIElement') {
    get name() {
        return this.root.$('.rp-grid-name [data-js-name]').getText()
    }
    get tags() {
        return this.root.$$('.rp-launch-tags [data-js-tag]').map(e => e.getText())
    }
    open() {
        this.root.$('[data-js-name-link]').click()
    }

    isInProgress() {
        return this.root.$('.rp-item-duration .duration-time > [data-js-approximate-time]').isExisting()
    }
}

const TestsScreen = new _TestsScreen()

module.exports = TestsScreen