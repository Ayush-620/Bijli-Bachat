# Bijli-Bachat
☀️ Solar Panel Cost & ROI Calculator (Sales Enablement Tool)

A rapid prototype web application designed to help visualize solar panel cost savings and return on investment (ROI). This tool demonstrates how long-term solar adoption compares against rising electricity costs, with a focus on real-world Indian market assumptions.

This project was built for practice purposes and significantly enhanced my understanding of front-end development, business logic implementation, and hands-on problem solving through a real-world use case.

🚀 Key Features

Minimal Input Flow
Clean and distraction-free interface to capture the customer's current monthly electricity bill.

The "Freedom Date"
Calculates the exact month and year when the solar investment breaks even, instead of showing generic ROI percentages.

Inflation Reality Check
Visual comparison between:

Flat solar system cost

Rising grid electricity bills over 15 years (compound inflation)

Smart System Sizing
Automatically recommends:

3kW system for lower consumption

5kW system for higher consumption
(Based on standard Indian residential usage patterns)

Subsidy Calculator
Built-in logic for PM Surya Ghar (Central) and State-level subsidies to display the actual payable amount.

Viral Share Feature
Generates a WhatsApp-ready savings summary that users can share with family or decision-makers.

🛠️ Tech Stack & Methodology
Technologies Used

HTML5

CSS3 (Bootstrap 5)

JavaScript (Vanilla)

Chart.js (Data visualization)

Local Storage (Persist configuration and settings)

Development Approach (Rapid Prototyping)

Logic & Architecture
Designed mathematical models for ROI, inflation projection, unit generation, and bill reduction to closely match real-world scenarios.

Hands-on Learning Focus
This project prioritized:

Practical problem solving

Understanding financial calculations in JavaScript

Translating business requirements into functional UI

AI-Assisted UI Development
AI tools were used to accelerate UI generation and styling, allowing faster iteration and focus on logic and usability.

🧮 Logic Under the Hood
System Sizing Rules

< 450 units/month → 3kW System

> 450 units/month → 5kW System

Financial Projection

Uses compound interest formula:
P(1 + r)ⁿ
to calculate the rising cost of grid electricity

Default inflation rate: 8% (configurable)

Bill Reduction Logic

Estimated generation: 120 units/kW/month

New bill = Consumption − Solar generation + Fixed meter charges (~₹200)

⚙️ How to Run Locally
git clone https://github.com/Ayush-620/Solar-Panel-Cost-ROI-Calculator.git


Navigate to the project folder

Open index.html in any modern browser

✅ No installation required — runs entirely client-side.

🔮 Future Improvements

PDF export for official quotations

Backend integration to store customer leads

Dynamic state selection for automatic subsidy calculation

Improved mobile-first UI optimizations

👨‍💻 Created By

Ayush
Built as a practice project to strengthen front-end development skills, financial logic implementation, and hands-on experience with real-world application design.
