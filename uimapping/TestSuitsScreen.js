class _TestSuitsScreen {
    get list() {
        try {
            browser.waitUntil(() => $$('[data-js-launches-container] > .row').length > 0, 4000)
            const res = $$('[data-js-launches-container] > .row')
            return res.map(e => new TestSuitItem(e))
        } catch (e) {
            return []
        }
    }
}

class TestSuitItem extends require('./WrappedUIElement') {
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

const TestSuitsScreen = new _TestSuitsScreen()

module.exports = TestSuitsScreen