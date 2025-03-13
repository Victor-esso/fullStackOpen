const { test , after , describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
describe('Blog Api Test', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are 7 blog posts', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, 7)
    })

    test('a title about react exits', async () => {
        const response = await api.get('/api/blogs')
        const titles = response.body.map(e => e.title)
        assert.strictEqual(titles.includes('React patterns'), true)
    })
    
    after( async () => {
        await mongoose.connection.close()
    })
})