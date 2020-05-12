const commentCtrl = {}

const Comment = require('../models/Comment');

commentCtrl.create = async (req, res) => {
    const {content, user_id, photo_id} = req.body;
    
    const commentNew = new Comment({
        content, user_id, photo_id
    });

    try {
        await commentNew.save() 
    } catch (error) {
        return res.status(400).json({error})
    }

    res.status(400).json({message: "Comment saved"})
}

commentCtrl.update = async (req ,res) => {
    const {content} = req.body;
    console.log(req.body)
    
    try {
        await Comment.findOneAndUpdate({_id: req.params.id }, {
            content
        });
    
    }catch (error) {
        return res.status(400).json({error})
    }

    res.status(200).json({message: "comment updated"})
}

commentCtrl.deleteComment = async(req, res) => {
    
    try {
        await Comment.findByIdAndDelete(req.params.id)
    } catch (error) {
       return res.status(400).json({error})
    }

    res.status(400).json({message: "Comment deleted"})
}

commentCtrl.getOne = async(req,res) => {
    const comment =  await Comment.findById(req.params.id)

    res.status(200).json({comment})
}

commentCtrl.getAll = async(req,res) => {
    const comments = await Comment.find();
    
    res.status(200).json({comments})
}

module.exports = commentCtrl;