const { test , after , describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { title } = require('node:process')

const { Blog } = require('../model/blog')
const data = require('../data/data')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach( async () => {
    await Blog.deleteMany({})

    // Use for...of to handle async/await correctly
    for (const blog of data.blogs) {
        let newBlog = new Blog(blog);
        await newBlog.save();
    }
})

describe('Blog Api Test', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test(`there are ${data.blogs.length} blog posts`, async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, data.blogs.length)
    })

    test('a title about react exits', async () => {
        const response = await api.get('/api/blogs')
        const titles = response.body.map(e => e.title)
        assert.strictEqual(titles.includes('React patterns'), true)
    })

    test('a valid Blog can be added' , async () => {
        const newBlog = {
            title: "Validating a mans love",
            author : "Victor Esso",
            url :"https://chatgpt.com/c/67d16604-8e40-8010-add0-fac6c01ab579",
            likes : 17
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const titles = response.body.map( r => r.title )

        assert.strictEqual(response.body.length, data.blogs.length + 1)

        assert(titles.includes(newBlog.title))
    })

    test('an invalid blog would not be added', async () => {
        const newBlog = {
            likes : 20
        }

        await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, data.blogs.length)
    })

    test('a specific not can be viewed', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToView = blogsAtStart[0]

        const resultBlog = await api.get(`/api/blogs/${blogToView.id}`)
                                    .expect(200)
                                    .expect('Content-Type', /application\/json/)
        
        assert.deepStrictEqual(resultBlog.body, blogToView)
    })

    test('a blog an be deleted ', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogAtEnd = await helper.blogsInDb()
        const titles = blogAtEnd.map(r => r.title)
        assert(!titles.includes(blogToDelete.title))
        assert.strictEqual(blogAtEnd.length , data.blogs.length - 1)

    })
    
    after( async () => {
        await mongoose.connection.close()
    })

    

})