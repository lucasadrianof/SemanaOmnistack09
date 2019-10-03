const Spot = require("../models/Spot");
const User = require("../models/User");

class SpotController {
  async store(req, res) {
    const { filename } = req.file;
    const { company, techs, price } = req.body;
    const { user_id } = req.headers;

    if (!(await User.findById(user_id))) {
      return res.status(404).json({ error: "User not found!" });
    }

    const spot = await Spot.create({
      user: user_id,
      company,
      price,
      thumbnail: filename,
      techs: techs.split(",").map(tech => tech.trim())
    });

    return res.status(201).json(spot);
  }
}

module.exports = new SpotController();
