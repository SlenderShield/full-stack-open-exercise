const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    // Create a root user
    await User.deleteMany({})

    // Create blogs without user
    await Blog.deleteMany({})
    // const noteObjects = helper.initialBlogs
    //     .map(blog => new Blog(blog))
    // const promiseArray = noteObjects.map(blog => blog.save())
    // await Promise.all(promiseArray)
})

describe('Get blog information', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });

    test('blog post unique identifiers are by id', async () => {
        const blogs = await Blog.find({})
        expect(blogs[0].id).toBeDefined();
    });
})

after(async () => {
    await mongoose.connection.close()
})

