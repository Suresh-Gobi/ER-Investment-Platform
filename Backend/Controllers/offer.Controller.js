const Offer = require('../Models/offer.Model');

const createOffer = async (req, res) => {
  try {
    const { InvestmentRange, InitialInvestment, EstimatedTotal, ExpectedRevenue } = req.body;
    const userId = req.user._id;

    const newOffer = new Offer({
      InvestmentRange,
      InitialInvestment,
      EstimatedTotal,
      ExpectedRevenue,
      user: userId,
    });

    await newOffer.save();

    res.status(201).json({ message: 'Offer created successfully', offer: newOffer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createOffer };
