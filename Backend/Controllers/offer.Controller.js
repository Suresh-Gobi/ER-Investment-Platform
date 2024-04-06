const Offer = require("../Models/offer.Model");

const createOffer = async (req, res) => {
  try {
    const {
      InvestmentRange,
      InitialInvestment,
      EstimatedTotal,
      ExpectedRevenue,
      userId,
    } = req.body;

    const newOffer = new Offer({
      InvestmentRange,
      InitialInvestment,
      EstimatedTotal,
      ExpectedRevenue,
      userId,
    });

    const savedOffer = await newOffer.save();

    res.status(201).json(savedOffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createOffer };
