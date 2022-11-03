const models = require('../models')

const getReviews = async (request, response) => {
    try {

    } catch (e) {return response.status(400).json({error: e.toString()})}
}

const createReview = async (request, response) => {
    const buyer = request.user

    try {
        const {title, contents, rating, productid} = request.body

        const newReview = new models.Review({
            title: title,
            contents: contents,
            rating: rating,
            productid: productid,
            reviewerid: buyer
        })

        const savedReview = await newReview.save()
        
        if(savedReview) {
            return response.status(200).json({status: "success", review: newReview})
        }

    } catch (e) {return response.status(400).json({error: e.toString()})}
}

module.exports = {
    getReviews,
    createReview
}