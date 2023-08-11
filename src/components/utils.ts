export const getPostsPerYear = (posts) => {
    return posts.reduce((posts, post) => {
        const year = post.data.pubDate.getFullYear() || 'Unknown'
    
        if (posts[year] === undefined) {
            posts[year] = [post];
        } else {
            posts[year].push(post);	
        }
        
        return posts
    }, {})
}
