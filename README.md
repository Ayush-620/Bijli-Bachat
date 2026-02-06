# ☀️ Solar Panel Cost & ROI Calculator (Sales Enablement Tool)

A rapid prototype web application designed to visualize solar panel costs, savings, and return on investment (ROI).  
This project focuses on comparing the long-term cost of grid electricity with the one-time investment in solar, using realistic Indian market assumptions.

This tool was built **for practice purposes**, and it greatly enhanced my knowledge in front-end development, business logic implementation, and hands-on real-world problem solving.

---

## 🚀 Key Features

- **Minimal Input Flow**  
  A clean, distraction-free interface to capture the user’s current monthly electricity bill.

- **The “Freedom Date”**  
  Calculates the exact **month and year** when the solar investment breaks even, instead of using abstract ROI percentages.

- **Inflation Reality Check**  
  Interactive graph comparing:
  - Flat cost of solar installation  
  - Rising cost of grid electricity over 15 years using compound inflation

- **Smart System Sizing**  
  Automatically recommends:
  - **3kW system** for lower consumption  
  - **5kW system** for higher consumption  
  (Based on standard Indian residential usage)

- **Subsidy Calculator**  
  Built-in logic for **PM Surya Ghar (Central)** and State-level subsidies to show the **actual final payable cost**.

- **Viral Share Feature**  
  Generates a WhatsApp-ready savings summary that users can easily share with family or decision-makers.

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3 (Bootstrap 5)**
- **JavaScript (Vanilla)**
- **Chart.js** – Data visualization
- **Local Storage** – Persist configuration and sales settings

---

## 🧮 Logic & Calculations

### System Sizing
- Usage **< 450 units/month** → **3kW System**
- Usage **> 450 units/month** → **5kW System**

### Financial Projection
- Uses compound interest formula:
- Projects the “Cost of Doing Nothing” (grid electricity bill)
- Default inflation rate: **8%** (configurable)

### Bill Reduction
- Estimated generation: **120 units/kW/month**
- New bill calculation:

---

## ⚙️ How to Run Locally

```bash
git clone https://github.com/Ayush-620/Solar-Panel-Cost-ROI-Calculator.git
 ```` 

1. Navigate to the project folder  
2. Open `index.html` in any modern browser  

✅ **No installation required** — the app runs completely client-side.

---

## 🔮 Future Improvements

- PDF export functionality for official quotations  
- Backend integration to store customer leads  
- Dynamic state selection to automatically adjust subsidy rules  
- Enhanced mobile-first UI optimizations  

---

## 👨‍💻 Created By

**Ayush**

Built as a practice project to strengthen front-end development skills, understand financial modeling in JavaScript, and gain hands-on experience with real-world application design.
