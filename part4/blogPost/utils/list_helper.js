const { maxBy, groupBy } = require('lodash');
var _ = require('lodash/core');
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    // let likes = 0;
    // for (const blog of blogs) {
    //     likes += blog.likes
    // }
    const likes = blogs.reduce((value, blog) => {
        return value + blog.likes
    }, 0)
    return likes
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null;

    let blogValue = blogs[0]
    for (const blog of blogs) {
        if (blog.likes > blogValue.likes) {
            blogValue = blog
        }
    }
    // Use reduce to find the blog with the most likes
    // const blogValue = blogs.reduce((prevBlog, currentBlog) => {
    //     return currentBlog.likes > prevBlog.likes ? currentBlog : prevBlog;
    // },0);
    const { title, author, likes } = blogValue
    return { title, author, likes }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null;
    const authorGroup = groupBy(blogs, 'author')
    const authorName = maxBy(Object.keys(authorGroup), (author) => authorGroup[author].length)
    return {
        author: authorName,
        blogs: authorGroup[authorName].length
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null;
    const authorsByGroup = groupBy(blogs, 'author')
    const authorMostLikes = maxBy(Object.keys(authorsByGroup), (author) => {
        return authorsByGroup[author].reduce((totalLikes, blog) => totalLikes += blog.likes, 0)
    })
    const mostLikes = authorsByGroup[authorMostLikes].reduce((total, blog) => total += blog.likes, 0)
    return {
        author: authorMostLikes,
        likes: mostLikes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}