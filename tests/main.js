const rpConf = JSON.parse(require('fs').readFileSync('ReportPortal.config.json')).reportPortalClientConfig
const rp = require('wdio-reportportal-reporter')
const { Nav, Screens } = require('../uimapping/Nav')
const LoginScreen = require('../uimapping/LoginScreen')
const LaunchesScreen = require('../uimapping/LaunchesScreen')
const TestSuitsScreen = require('../uimapping/TestSuitsScreen')
const TestsScreen = require('../uimapping/TestsScreen')
const TestScreen = require('../uimapping/TestScreen')

const suiteName = 'Demo test project'
const testTags = ['@demotest', '@tag2']
const testName = `Report Portal WDIO integration brief test ${testTags.join(' ')}`
const logLevel = 'info'
const logMsg = 'Hiiiiiiiiiiiiiii'

describe(suiteName, () => {
    it(testName, () => {
        rp.sendLog(logLevel, logMsg)

        LoginScreen.open()
        LoginScreen.username = process.env.RP_USERNAME
        LoginScreen.password = process.env.RP_PASSWORD
        LoginScreen.submit()

        Nav.project = rpConf.project
        Nav.openScreen(Screens.LAUNCHES)

        const currentLaunchItem = LaunchesScreen.list.find(launch => launch.isInProgress())
        expect(currentLaunchItem).toBeDefined()
        expect(currentLaunchItem.name).toBe(rpConf.launch)
        rpConf.tags.forEach(expectedTag =>
            expect(currentLaunchItem.tags).toContain(expectedTag)
        )

        currentLaunchItem.open()
        const testSuiteItem = TestSuitsScreen.list[0]
        expect(testSuiteItem.name).toBe(suiteName)

        testSuiteItem.open()
        const testItem = TestsScreen.list.find(test => test.name === testName)
        expect(testItem).toBeDefined('Tests screen has current test entry')
        testTags.forEach(expectedTag =>
            expect(testItem.tags).toContain(expectedTag)
        )

        testItem.open()
        const logItem = TestScreen.logs[0]
        expect(logItem.message).toBe(logMsg)
        expect(logItem.level.toLowerCase()).toBe(logLevel.toLowerCase())
    })
})
