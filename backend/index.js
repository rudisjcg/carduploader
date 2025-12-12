import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import { v4 as uuid } from "uuid";
import multer from "multer";
import { Card } from "./models/Card.js";
import { mongooseConnect } from "./libs/mongoose.js";

const upload = multer();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(json());
app.use(morgan("dev"));


app.get("/cards", async (req, res, next) => {
  try {
    await mongooseConnect();
    const cards = await Card.find();
    res.status(200).json({ success: true, data: cards });
  } catch (err) {
    next(err);
  }
});

app.delete("/cards/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await mongooseConnect();
    const deletedCard = await Card.findOneAndDelete({ id: id });
    if (!deletedCard) {
      return res.status(404).json({
        success: false,
        message: "Card not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Card deleted successfully.",
      data: deletedCard,
    });
  } catch (err) {
    next(err);
  }
});

app.put("/cards/:id", upload.none(), async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id)
    const { cardNumber, cardName, monthly, year, cvv } = req.body;  
    if (!cardNumber || !cardName || !monthly || !year || !cvv) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    await mongooseConnect();

    const updatedCard = await Card.findOneAndUpdate(
      { id: id },
      {
        cardName,
        cardNumber,
        expMonth: monthly,
        expYear: year,
        last4: cardNumber.slice(-4),
        cvv,
      },
      { new: true }
    );
    if (!updatedCard) {
      return res.status(404).json({
        success: false,
        message: "Card not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Card updated successfully.",
      data: {
        id: updatedCard.id,
        cardNumber: updatedCard.cardNumber,
        cardName: updatedCard.cardName,
        expiry: `${updatedCard.expMonth}/${updatedCard.expYear}`,
      },
    });
  } catch (err) {
    next(err);
  }
});

app.post("/cards", upload.none(), async (req, res, next) => {
  try {
    const { cardNumber, cardName, monthly, year, cvv } = req.body;

    if (!cardNumber || !cardName || !monthly || !year || !cvv) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    

    await mongooseConnect();

    const id = uuid();

    const newCard = new Card({
      cardName,
      cardNumber,
      expMonth: monthly,
      expYear: year,
      last4: cardNumber.slice(-4),
      cvv,
      id,
    });

    await newCard.save();

    res.status(201).json({
      success: true,
      message: "Card saved successfully.",
      data: { id, cardNumber, cardName, expiry: `${monthly}/${year}` },
    });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
