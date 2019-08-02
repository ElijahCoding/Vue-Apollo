module.exports = {
    Query: {
        getUser: () => null
    },

    Mutation: {
        addPost: async (
            root,
            { title, imageUrl, categories, description, creatorId }
        ) => {
            const newPost = await new Post({
                title,
                imageUrl,
                categories,
                description,
                createdBy: creatorId
            }).save();

            return newPost;
        },

        signupUser: async (root, { username, email, password }, { User }) => {
            const user = await User.findOne({ username });

            if (user) {
                throw new Error("User already exists");
            }

            const newUser = await new User({
                username,
                email,
                password
            }).save();

            return newUser;
        }
    }
}
