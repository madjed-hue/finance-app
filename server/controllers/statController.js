import Stat from "../model/Stat.js";
import ApiFeatures from "../utils/apiFeatures.js";

export const getAllStats = async (req, res) => {
  try {
    const apiFeature = new ApiFeatures(Stat.find(), req.query)
      .searchByName()
      .filter();
    let stats = await apiFeature.query;
    res.status(200).json(stats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
