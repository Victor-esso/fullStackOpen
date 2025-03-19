const { describe , test , after , beforeEach } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')

const { User } = require('../model/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially one user in the database', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = bcrypt.hash('sekret' , 10)
        const user = new User({ username : 'root' , passwordHash})

        await user.save()
    })

    test('creation succeeds with a fresh user', async () => {
        const usersAtStart =  await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
                .post('/api/users')
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()

        assert.strictEqual( usersAtEnd.length , usersAtStart.length + 1 )

        const usernames = usersAtEnd.map( u => u.username)
        assert(usernames.includes(newUser.username))
    })
})