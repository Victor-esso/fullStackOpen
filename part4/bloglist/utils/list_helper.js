const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return sum = blogs.reduce(( startValue, blog , i) => {
        return startValue + blog.likes
    } , 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) return null
    return blogs.reduce(( max , blog) => (max.likes > blog.likes ? max : blog),blogs[0])
}

const mostLikes = blogs => {
    if (blogs.length === 0) return null

    const likesCount = blogs.reduce((obj , blog) => {
        obj[blog.author] = (obj[blog.author] || 0) + blog.likes
        return obj
    },{})

    const topAuthor = Object.keys(likesCount).reduce((max , author) => {
        return likesCount[author] > likesCount[max] ? author : max
    })

    return { author : topAuthor , likes : likesCount[topAuthor] }
}




module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostLikes
}