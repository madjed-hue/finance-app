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

export const groupByCountry = async (req, res) => {
  try {
    const stats = await Stat.find();

    const groupedCountry = stats.reduce((group, statistic) => {
      const { country } = statistic;

      if (country !== "") {
        group[country] = group[country] ?? [];
        group[country].push(statistic);
      }
      return group;
    }, {});

    res.status(200).json(groupedCountry);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const groupByTopic = async (req, res) => {
  try {
    const stats = await Stat.find();

    const groupedTopic = stats.reduce((group, statistic) => {
      const { topic } = statistic;
      group[topic] = group[topic] ?? [];
      group[topic].push(statistic);
      return group;
    }, {});
    res.status(200).json(groupedTopic);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const groupByRegion = async (req, res) => {
  try {
    const stats = await Stat.find();

    const groupedRegion = stats.reduce((group, statistic) => {
      const { region } = statistic;
      if (region) {
        group[region] = group[region] ?? [];
        group[region].push(statistic);
      }
      return group;
    }, {});
    res.status(200).json(groupedRegion);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
