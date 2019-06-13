function findElements(targetLocator, timeout) {
    timeout = timeout || 5000
    try {
        browser.waitUntil(() => $$(targetLocator).length > 0, timeout)
        const res = $$(targetLocator)
        return res
    } catch (e) {
        return []
    }
}

module.exports = {findElements}