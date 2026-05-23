import Contact from "../models/ContactModel.js";

export const addContact = async (req,res) => {
  try {
    const contact = await Contact.create({...req.body,userId: req.userId})

    res.status(201).json(contact)
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Server Error"})
  }
};

export const getContacts = async (req,res) => {
  try {
    const contacts = await Contact.find({userId: req.userId})

    res.status(200).json(contacts)
  } catch (error) {
    console.log(error);

    res.status(500).json({message: "Server Error"})
  }
};

export const updateContact = async (req,res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new: true,})
    res.status(200).json(updatedContact);
  } catch (error) {
    console.log(error);

    res.status(500).json({message: "Server Error"});
  }
};

export const deleteContact = async (req,res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id)

    res.status(200).json({message:"Contact Deleted Successfully"})
  } catch (error) {
    console.log(error)

    res.status(500).json({message: "Server Error"})
  }
};
