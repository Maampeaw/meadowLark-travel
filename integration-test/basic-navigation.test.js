const ppt = require('puppeteer')
const findPort = require('portfinder')

const app = require('../app')

// eslint-disable-next-line no-unused-vars
let sever = null
let port = null

beforeEach(async()=>{
    port = await findPort.getPortPromise()
    // eslint-disable-next-line no-undef
    server = app.listen(port)
})

afterEach(()=>{
    // eslint-disable-next-line no-undef
    server.close()
})

test("home page links to about page", async ()=>{
    const browser = await ppt.launch()
    const page = await browser.newPage()
    await page.goto(`http://localhost:${port}`)
    await Promise.all([
        page.waitForNavigation(),
        page.click('[data-test-id="about"]')
    ])
    expect(page.url()).toBe(`http://localhost:${port}/about`)
    await browser.close()
})

