const { ObjectId } = require("mongodb");
const Request = require("./request.model");

class RequestController {
  // GET /adoptions/:id - Get adoption requests for a specific dog
  async getAdoptionsByDogId(req, res) {
    try {
      const { id } = req.params;
      const adoptions = await Request.find({ dog: id, type: "adoption" });
      return res.status(200).json(adoptions);
    } catch (error) {
      console.error("Error fetching adoptions:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  // GET /sponsors/:id - Get sponsorship requests for a specific dog
  async getSponsorsByDogId(req, res) {
    try {
      const { id } = req.params;
      const sponsors = await Request.find({ dog: id, type: "sponsor" });
      return res.status(200).json(sponsors);
    } catch (error) {
      console.error("Error fetching sponsors:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  // POST / - Create a new request
  async createRequest(req, res) {
    try {
      const { user, dog, owner, type, status, user_name } = req.body;

      if (!user || !dog || !type) {
        return res.status(400).json({ message: "Faltan campos requeridos." });
      }

      const newRequest = new Request({
        user,
        dog,
        owner,
        type,
        status,
        user_name,
      });
      const savedRequest = await newRequest.save();
      return res.status(201).json(savedRequest);
    } catch (error) {
      console.error("Error creating request:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  // PUT /:id - Update an existing request
  async updateRequest(req, res) {
    try {
      const { id } = req.params;
      const updatedRequest = await Request.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedRequest) {
        return res.status(404).json({ message: "Request not found" });
      }
      return res.status(200).json(updatedRequest);
    } catch (error) {
      console.error("Error updating request:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE /:id - Delete a request
  async deleteRequest(req, res) {
    try {
      const { id } = req.params;
      const deletedRequest = await Request.findByIdAndDelete(id);
      if (!deletedRequest) {
        return res.status(404).json({ message: "Request not found" });
      }
      return res.status(200).json({ message: "Request deleted successfully" });
    } catch (error) {
      console.error("Error deleting request:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  async getRequestByUser(req, res) {
    try {
      const { user } = req.params;
      const requests = await Request.find({ user })
        .populate("dog") // Populates the dog field
        .populate("user"); // Populates the requester user info
      return res.status(200).json(requests);
    } catch (error) {
      console.error("Error fetching requests:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  async getRequestByOwner(req, res) {
    try {
      const { owner } = req.params;
      const requests = await Request.find({ owner: new ObjectId(owner) })
        .populate("dog") // Populates the dog field so frontend can show dog card
        .populate("user"); // Populates the requester user info
      return res.status(200).json(requests);
    } catch (error) {
      console.error("Error fetching requests:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new RequestController();
