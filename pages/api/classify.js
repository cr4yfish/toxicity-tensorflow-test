require('@tensorflow/tfjs');
const toxicity = require('@tensorflow-models/toxicity');

export default async function handler(req, res) {
    const sentence = req.body.sentence;
    console.log("New classify request:", sentence);
    const threshold = 0.9;

    try {
        toxicity.load(threshold).then(model => {
            const sentences = [sentence];

            model.classify(sentences).then(predictions => {
                console.log(predictions);
                res.status(200).json(predictions);
            })
        })
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }

  }
  