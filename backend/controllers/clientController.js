import Client from "../models/Client.model.js";

//create 
export const createClient = async(req, res)=>{
    try {
        const client = await Client.create({
             ...req.body,
      createdBy: req.user._id,
        })
        res.status(201).json({
            message: "client created successfully",
            client: client
        })
    } catch (error) {
        console.error("error creating client:", error);
        res.status(500).json({
            message: "error creating client",
            error: error.message
        })
    }
}
//get all clients
export const getClients  =async(req, res)=>{
    try {
        const clients = await Client.find().populate("createdBy", "name email");
        res.status(200).json({
            message: "all clients retrieved successfully",
            clients: clients
        })
    } catch (error) {
        console.error("error getting all clients:", error);
        res.status(500).json({
            message: "error getting all clients",
            error: error.message
        })
    }
}

//single client
export const getClientById = async(req,res)=>{
    try {
        const client = await Client.findById(req.params.id).populate("createdBy", "name email");
        if (!client) {
            return res.status(404).json({
                message: "client not found"
            })
        }
        res.status(200).json({
            message: "client retrieved successfully",
            client: client
        })
    } catch (error) {
        console.error("error retrieving client:", error);
        res.status(500).json({
            message: "error retrieving client",
            error: error.message
        })
    }
}
export const updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
