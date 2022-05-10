const handler = require('../handlers')

test('homePage renders', ()=>{
   const req = {}
    const res = {render: jest.fn()}
    handler.home(req, res)
    console.log(res.render.mock.calls)
    expect(res.render.mock.calls[0][0]).toBe("home")
})

test('aboutPage renders', ()=>{
    const req = {}
    const res = {render: jest.fn()}
    handler.about(req, res)
    expect(res.render.mock.calls[0][0]).toBe('about')
    expect(res.render.mock.calls[0][1]).toEqual(expect.objectContaining({fortune: expect.stringMatching(/\W/),
}))

  
})

test('catchAll page', ()=>{
    const req = {}
    const  res = {render: jest.fn()}
    handler.catchAll(req, res)
    expect(res.render.mock.calls[0][0]).toBe('404')
})

test('500 handlers', ()=>{
    const err = new Error('some error')
    const req = {}
    const res = {render: jest.fn()}
    const next = jest.fn()
    handler.serverError(err, req, res, next)
   expect(res.render.mock.calls[0][0]).toBe('505')
})