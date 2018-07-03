var newJokes = []

var counter = 0

module.exports = {
    read:(req, res) => {
        res.status(200).send(newJokes)
    },

    create:(req, res) => {
        const { value } = req.body;
        counter++;
        newJokes.push({joke: value, id: counter});
        res.status(200).json(newJokes)
    },

    update:(req, res) => {
        const {joke, id} = req.body
        for (i=0; i<newJokes.length; i++) {
            if ((i+1) === Number(id)) {
                newJokes[i].joke = joke
            }
        }
        res.status(200).json(newJokes)
    },

    delete:(req, res) => {
        for (i=0; i<newJokes.length; i++) {
            if (i+1 === Number(req.query.id)) {
                newJokes.splice(i,1)
            }
        }
    res.status(200).json(newJokes)
    }
}