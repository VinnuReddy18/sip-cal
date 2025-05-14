const express = require("express");
const app = express();
app.use(express.json());

function calculateSIP(goalAmount, years, annualReturn = 0.12) {
  const months = years * 12;
  const monthlyRate = annualReturn / 12;
  const sip = goalAmount * (monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(sip);
}

app.post("/sip-goal", (req, res) => {
  const { goal_amount, years } = req.body;
  if (!goal_amount || !years) return res.status(400).send("Missing input");
  const sip = calculateSIP(goal_amount, years);
  res.json({ monthly_sip: sip });
});

app.listen(3000, () => console.log("SIP API running"));