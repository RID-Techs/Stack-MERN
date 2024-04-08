const Users = require('../Models/UsersInfos')

const PostUsers = async (req, res) => {
    try {
        const { Surname, Firstname, Age, Profession,
            Description,
            Country,
            City }  = req.body
            if (!Surname || !Firstname || !Age || !Profession || !Description || !Country || !City){
                res.status(400).json("All fields are mandatory !")
            }
        const Newuser = await Users.create({
            Surname, 
            Firstname, 
            Age, 
            Profession,
            Description,
            Country,
            City
        })
        res.status(201).json(Newuser)
    } catch (error) {
        res.status(500).json(error)
    }
}
const GetUsers = async (req, res) => {
    try {
        const AllUsers = await Users.find()
        if(!AllUsers) return res.status(404).json("No user found")
        res.status(200).json(AllUsers)
    } catch (error) {
        res.status(500).json(error)
    }
}
const GetSpecifiUser = async (req, res) => {
    try {
        const SpecificUser = await Users.findById(req.params.id)
        if(!SpecificUser) {
            res.status(404).json("No user found with this id")
        }
        res.status(200).json(SpecificUser)
    } catch (error) {
        res.status(500).json(error)
    }
}
const ModifyUser = async (req, res) => {
    try {
        const SpecificUser = await Users.findById(req.params.id)
        if(!SpecificUser) {
            res.status(404).json("No user found with this id")
        }
        const Usermodified = await Users.findByIdAndUpdate(req.params.id, 
            req.body,
            {new: true})
            
        res.status(200).json(Usermodified)
    } catch (error) {
        res.status(500).json(error)
    }
}
const DeleteUser = async (req, res) => {
    try {
        const SpecificUser = await Users.findById(req.params.id)
        if(!SpecificUser) {
            res.status(404).json("No user found with this id")
        }
        await Users.deleteOne({_id: req.params.id})
        res.status(200).json(SpecificUser)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {PostUsers, GetUsers, GetSpecifiUser, ModifyUser, DeleteUser}