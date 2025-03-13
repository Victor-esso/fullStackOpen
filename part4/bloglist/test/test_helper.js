const { Blog } = require('../model/blog')
const data = require('../data/data')

const nonExistingId = async () => {
    const blog = new Blog({
        author : "Victor Esso",
        title : "This is a random title",
        likes : 1,
        url : "https://romanrians.com/random-title-search.html"
    })

    await blog.save()
    await blog.deleteOne()

    return note._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON());
}

module.exports = {
    nonExistingId,
    blogsInDb
}