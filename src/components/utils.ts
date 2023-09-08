export const getPostsPerYear = (posts) => {
    return posts.reduce((posts, post) => {

        if (post.data.draft === true) return posts;

        const year = post.data.pubDate.getFullYear() || 'Unknown'
    
        if (posts[year] === undefined) {
            posts[year] = [post];
        } else {
            posts[year].push(post);	
        }
        
        return posts
    }, {})
}

export const rand = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

export const map = (value: number, fromLow: number, fromHigh: number, toLow:number, toHigh:number) => {
    const fromRange = fromHigh - fromLow;
    const toRange = toHigh - toLow;
    const scale = toRange / fromRange;
    const mappedValue = (value - fromLow) * scale + toLow;
    return mappedValue;
};
