const { test , describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const data = require('../data/data')
const { blob } = require('node:stream/consumers')

describe('Blog Server Test', () => {
    test('dummy returns one' , () => {
        const blogs = []
        const result = listHelper.dummy(blogs)
        assert.strictEqual(result , 1)
    })
    describe('returns total likes', () => {        
          test('when list has only one blog, equals the likes of that', () => {
            const result = listHelper.totalLikes(data.blogs)
            assert.strictEqual(result, 36)
          })
    })

    describe('favorite blog', () => {
        test('returns the favorite blog from a list of blogs', () => {
            assert.deepStrictEqual(
                listHelper.favoriteBlog(data.blogs),
                {
                    _id: "5a422b3a1b54a676234d17f9",
                    title: "Canonical string reduction",
                    author: "Edsger W. Dijkstra",
                    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                    likes: 12,
                    __v: 0
                }
            )
        })
    })

    describe('Most Likes', () => { 
        test('returns the most liked author',() => {
            assert.deepStrictEqual(
                listHelper.mostLikes(data.blogs),
                {
                    author: "Edsger W. Dijkstra",
                    likes : 17
                }
            )
        })
    })
})