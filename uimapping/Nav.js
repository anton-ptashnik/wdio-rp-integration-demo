class _Nav {
    set project(value) {
        $('#projectSelector').click()
        $(`.user-projects [data-href='${value}']`).click()

    }
    get project() {
        $('#projectSelector .selected-project').getText()
    }
    openScreen(value) {
        $(`.sidebar-content ${_ScreenLocators[value]}`).click()
    }
}

const Screens = {
    LAUNCHES: 0,
    DEBUG: 1
}

const _ScreenLocators = {
    [Screens.LAUNCHES]: '#launches',
    [Screens.DEBUG]: '#userdebug'
}

const Nav = new _Nav()

module.exports = {Nav, Screens}