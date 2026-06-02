const Transaction = require("../models/Transaction");

// Merr te gjitha transaksionet
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({
      createdAt: -1,
    });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Krijo nje transaksion te ri
const createTransaction = async (req, res) => {
  try {
    const { title, amount, type } = req.body;

    const transaction = await Transaction.create({
      title,
      amount,
      type,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Fshi transaksion
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(
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