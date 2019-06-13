const rpConf = JSON.parse(require('fs').readFileSync('ReportPortal.config.json'));
const rpAddress = new URL(rpConf.reportPortalClientConfig.endpoint).host

class _LoginScreen {
    open() {
        browser.url(rpAddress);
    }
    get username() {
        $('[placeholder="Login"]').getValue()

    }
    set username(value) {
        $('[placeholder="Login"]').setValue(value)
    }
    get password() {

        $('[placeholder="Password"]').getValue()
    }
    set password(value) {
        $('[placeholder="Password"]').setValue(value)
    }

    submit() {
        $('button[type="submit"]').click()
    }
}

const LoginScreen = new _LoginScreen()

module.exports = LoginScreen