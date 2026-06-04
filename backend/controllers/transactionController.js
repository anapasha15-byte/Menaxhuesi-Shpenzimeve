const Transaction = require("../models/Transaction");

const getTransactions = async (req, res) => {
  try {
    const { userId } = req.query;

    const transactions =
      await Transaction.find({
        user: userId,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json(
      transactions
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const createTransaction = async (
  req,
  res
) => {
  try {
    const {
      userId,
      title,
      amount,
      type,
      category,
    } = req.body;

    const transaction =
      await Transaction.create({
        user: userId,
        title,
        amount,
        type,
        category,
      });

    res.status(201).json(
      transaction
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transaction =
      await Transaction.findByIdAndDelete(
        req.params.id
      );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaksioni nuk u gjet",
      });
    }

    res.status(200).json({
      message: "Transaksioni u fshi",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getTransactions,
  createTransaction,
  deleteTransaction,
};