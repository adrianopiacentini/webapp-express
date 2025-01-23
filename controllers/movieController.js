const index = (req, res) => {
    res.json({
        message:'Movies index'
    })
};

const show = (req, res) => {
    res.json({
        message: 'Movies show'
    })
};

module.exports = {
    index,
    show,
};