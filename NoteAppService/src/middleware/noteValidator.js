function validateNoteCreation(req, res, next) {
    const { content, timeActive, maxAccessCount } = req.body;

    if (!content || typeof content !== 'string' || content.trim() === '') {
        return res.status(400).send('Invalid content');
    }
    
    if (!timeActive || isNaN(parseInt(timeActive)) || parseInt(timeActive) <= 0) {
        return res.status(400).send('Invalid timeActive');
    }
    
    if (maxAccessCount === undefined || isNaN(parseInt(maxAccessCount)) || parseInt(maxAccessCount) < 0) {
        return res.status(400).send('Invalid maxAccessCount');
    }

    next();
}

export default validateNoteCreation;
