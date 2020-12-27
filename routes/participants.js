const express = require('express');
const router = express.Router();
const participant = require('../models/participant');

router.get('/', async (req, res) => {
    try {
        const participants = await participant.find();
        res.json(participants);
    } catch (error) {
        res.send('Error' + error);
    }
});

// router.get('/:score', async(req, res) => {
//     try {
//         const Participant = await participant.findById(req.params.score);
//         res.json(Participant);
//     } catch (error) {
//         res.send('Error' + error);
//     }
// });

router.get('/:team', async (req, res) => {
    if (req.params.team === "0") {
        try {
            const Participant = await participant.find({ score: parseInt(req.params.team) });
            console.log(parseInt(req.params.team));
            res.json(Participant);
        } catch (error) {
            res.send('Error' + error);
        }
    }
    else if (Number(req.params.team)) {
        try {
            const Participant = await participant.find({ score: Number(req.params.team) });
            console.log(Number(req.params.team));
            res.json(Participant);
        } catch (error) {
            res.send('Error' + error);
        }
    }
    else if (req.params.team !== "0") {
        try {
            const Participant = await participant.find({ team_name: req.params.team });
            res.json(Participant);
        } catch (error) {
            res.send('Error' + error);
        }
    }
});


router.post('/', async (req, res) => {
    const Participant = new participant({
        team_name: req.body.team_name,
        wins: req.body.wins,
        losses: req.body.losses,
        ties: req.body.ties,
        score: req.body.score
    });

    try {
        const team1 = await Participant.save();
        res.json(team1);
    } catch (error) {
        res.send('Error' + error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const Participant = await participant.findById(req.params.id);
        Participant.team_name = req.body.team_name;
        Participant.wins = req.body.wins;
        Participant.losses = req.body.losses;
        Participant.ties = req.body.ties;
        Participant.score = req.body.score;
        const team1 = await Participant.save();
        res.json(team1);
    } catch (error) {
        res.send('Error' + error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const Participant = await participant.findById(req.params.id);
        const team1 = await Participant.remove();
        res.json(team1);
    } catch (error) {
        res.send('Error' + error);
    }
});

module.exports = router;