const fElem = require('./Utils').findElements

class _LaunchesScreen {
    get list() {
        return fElem('[data-js-launches-container] > .row').map(e => new LaunchItem(e))
    }
}

class LaunchItem extends require('./WrappedUIElement') {
    get name() {
        return this.root.$('.rp-grid-name [title]').getText()
    }
    get number() {
        return this.root.$('.rp-grid-name [data-js-launch-number]').getText()
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

const LaunchesScreen = new _LaunchesScreen()

module.exports = LaunchesScreen