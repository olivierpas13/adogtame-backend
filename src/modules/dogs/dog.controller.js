const dogService = require('./dog.service.js');

class DogController {
    async getAllDogs(req, res) {
        try {
            const dogs = await dogService.getAllDogs();
            res.status(200).json(dogs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getDogsByOwnerId(req, res) {
        try {
            const dogs = await dogService.getDogsByOwnerId(req.params.ownerId);
            if (!dogs || dogs.length === 0) {
                return res.status(404).json({ message: 'No dogs found for this owner' });
            }
            res.status(200).json(dogs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getDogById(req, res) {
        try {
            const dog = await dogService.getDogById(req.params.id);
            if (!dog) {
                return res.status(404).json({ message: 'Dog not found' });
            }
            res.status(200).json(dog);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createDog(req, res) {
        try {
            console.log(req.body);
            const newDog = await dogService.addDog(req.body);
            res.status(201).json(newDog);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateDog(req, res) {
        try {
            const updatedDog = await dogService.updateDog(req.params.id, req.body);
            if (!updatedDog) {
                return res.status(404).json({ message: 'Dog not found' });
            }
            res.status(200).json(updatedDog);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteDog(req, res) {
        try {
            const deletedDog = await dogService.deleteDog(req.params.id);
            if (!deletedDog) {
                return res.status(404).json({ message: 'Dog not found' });
            }
            res.status(200).json({ message: 'Dog deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new DogController();