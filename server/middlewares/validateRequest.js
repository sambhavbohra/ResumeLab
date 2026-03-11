export const validateRequest = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
            headers: req.headers
        });
        return next();
    } catch (error) {
        if (error.name === 'ZodError') {
            const messages = error.errors.map(err => err.message).join(', ')
            return res.status(400).json({ message: messages });
        }
        return res.status(400).json({ message: error.message });
    }
};
