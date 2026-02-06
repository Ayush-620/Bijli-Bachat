let currentInflation = 0.08; 
let chartInstance = null;

//save to browser local
function saveSettings() {
    const settings = {
        unitRate: document.getElementById('unitRate').value,
        marketPrice: document.getElementById('marketPrice').value,
        additionalCharges: document.getElementById('additionalCharges').value,
        inflation: currentInflation,
        customInflationVal: document.getElementById('customInflation').value,
        inf5: document.getElementById('inf5').checked,
        inf65: document.getElementById('inf65').checked,
        inf8: document.getElementById('inf8').checked
    };
    localStorage.setItem('solarAppConfig', JSON.stringify(settings));
}

function loadSettings() {
    const savedData = localStorage.getItem('solarAppConfig');
    
    let defaults = {
        unitRate: 7.5,
        marketPrice: 55000,
        additionalCharges: 0,
        inflation: 0.08
    };

    if (savedData) {
        const settings = JSON.parse(savedData);
        
        document.getElementById('unitRate').value = settings.unitRate || defaults.unitRate;
        document.getElementById('marketPrice').value = settings.marketPrice || defaults.marketPrice;
        document.getElementById('additionalCharges').value = settings.additionalCharges || defaults.additionalCharges;
        
        if(settings.customInflationVal) document.getElementById('customInflation').value = settings.customInflationVal;
        if(settings.inflation) currentInflation = parseFloat(settings.inflation);

        if(settings.inf5) document.getElementById('inf5').checked = true;
        if(settings.inf65) document.getElementById('inf65').checked = true;
        if(settings.inf8) document.getElementById('inf8').checked = true;

    } else {
        document.getElementById('unitRate').value = defaults.unitRate;
        document.getElementById('marketPrice').value = defaults.marketPrice;
        document.getElementById('additionalCharges').value = defaults.additionalCharges;
        document.getElementById('inf8').checked = true;
        currentInflation = defaults.inflation;
    }
}


function setInflation(val) {
    currentInflation = val;
    document.getElementById('customInflation').value = ""; 
    saveSettings(); 
}

function setCustomInflation() {
    const val = parseFloat(document.getElementById('customInflation').value);
    if (!isNaN(val) && val > 0) {
        currentInflation = val / 100;
        document.querySelectorAll('input[name="inf"]').forEach(el => el.checked = false);
        saveSettings(); 
    }
}


function goToResults() {
    const bill = document.getElementById('mainBillInput').value;
    if(!bill || bill <= 0) {
        alert("Please enter a valid bill amount!");
        return;
    }
    document.getElementById('inputSlide').classList.add('d-none');
    document.getElementById('resultSlide').classList.remove('d-none');
    calculateSolarLogic();
}

function goBack() {
    document.getElementById('resultSlide').classList.add('d-none');
    document.getElementById('inputSlide').classList.remove('d-none');
}


function calculateSolarLogic() {
    
    const monthlyBill = parseFloat(document.getElementById('mainBillInput').value);
    const unitRate = parseFloat(document.getElementById('unitRate').value) || 7.5;
    const marketPricePerKw = parseFloat(document.getElementById('marketPrice').value) || 55000;
    const additionalCharges = parseFloat(document.getElementById('additionalCharges').value) || 0;

    
    const monthlyUnits = monthlyBill / unitRate;
    
    
    let rawKw = monthlyUnits / 120;

   
    let recommendedKw = Math.ceil(rawKw);

    
    if (recommendedKw < 2) recommendedKw = 2;
    if (recommendedKw > 10) recommendedKw = 10;

    // panels
    const panelWattage = 580;
    const numberOfPanels = Math.ceil((recommendedKw * 1000) / panelWattage);

    
    const requiredArea = recommendedKw * 100;

    
    const monthlyGenUnits = recommendedKw * 120; 

    // investment
    const baseSystemCost = recommendedKw * marketPricePerKw;
    const grossTotal = baseSystemCost + additionalCharges;
    
    
    let centralSubsidy = 0;
    if (recommendedKw === 1) centralSubsidy = 30000;
    else if (recommendedKw === 2) centralSubsidy = 60000;
    else centralSubsidy = 78000;

    let stateSubsidy = 30000; 
    const totalSubsidy = centralSubsidy + stateSubsidy;
    
    const finalCost = Math.max(0, grossTotal - totalSubsidy);

    //freedom date
    let monthsToPayback = 0;
    let cumulativeSavings = 0;
    let tempBill = monthlyBill;
    
   
    if (finalCost > 0) {
        while(cumulativeSavings < finalCost) {
            cumulativeSavings += tempBill;
            if (monthsToPayback > 0 && monthsToPayback % 12 === 0) {
                tempBill *= (1 + currentInflation);
            }
            monthsToPayback++;
        }
    }

    const yearsToPayback = (monthsToPayback / 12).toFixed(1);
    
    const today = new Date();
    const freedomDate = new Date(today.setMonth(today.getMonth() + monthsToPayback));
    const freedomDateString = freedomDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

    // roi after 25yr
    let totalSavings25Y = 0;
    let billForecasting = monthlyBill * 12;
    for(let i=1; i<=25; i++) {
        totalSavings25Y += billForecasting;
        billForecasting *= (1 + currentInflation);
    }
    const netProfit = totalSavings25Y - finalCost;

    
    const potentialSavings = monthlyGenUnits * unitRate;
    
    let newBill = 0;
    if (monthlyGenUnits >= monthlyUnits) {
        newBill = 200; 
    } else {
        newBill = monthlyBill - potentialSavings + 200;
    }
    newBill = Math.min(newBill, monthlyBill);
    const monthlySaved = monthlyBill - newBill;

    //future bill after 3yr
    const futureMonthlyBillNoSolar = monthlyBill * Math.pow((1 + currentInflation), 3);
    
    let futureMonthlyBillSolar = newBill; 
    if (newBill > 0) {
        futureMonthlyBillSolar = newBill * Math.pow((1 + currentInflation), 3);
    }

 //ui
    const fmt = (num) => "₹" + num.toLocaleString('en-IN');

    document.getElementById('freedomDateDisplay').innerText = freedomDateString;
    document.getElementById('roiYearsDisplay').innerText = yearsToPayback;
    
    
    document.getElementById('systemSizeDisplay').innerHTML = `${recommendedKw} kW <br><span class="fs-6 text-muted">(${numberOfPanels} Panels of 580W)</span>`;
    
    document.getElementById('roofAreaDisplay').innerText = "~" + requiredArea + " sq.ft"; 
    
   
    document.getElementById('baseCostDisplay').innerText = fmt(baseSystemCost);
    document.getElementById('addChargeDisplay').innerText = "+ " + fmt(additionalCharges);
    document.getElementById('centralSubsidyDisplay').innerText = "- " + fmt(centralSubsidy);
    document.getElementById('stateSubsidyDisplay').innerText = "- " + fmt(stateSubsidy);
    document.getElementById('finalCostDisplay').innerText = fmt(finalCost);
    document.getElementById('totalProfitDisplay').innerText = fmt(Math.round(netProfit));

  
    document.getElementById('oldBillDisplay').innerText = fmt(monthlyBill);
    document.getElementById('newBillDisplay').innerText = fmt(Math.round(newBill)) + "*";
    document.getElementById('monthlySavingsDisplay').innerText = fmt(Math.round(monthlySaved));

   
    document.getElementById('futureBillNoSolar').innerText = fmt(Math.round(futureMonthlyBillNoSolar));
    document.getElementById('futureBillSolar').innerText = fmt(Math.round(futureMonthlyBillSolar));

  
    const reductionPercentage = (newBill / monthlyBill) * 100;
    const bar = document.getElementById('newBillBar');
    const displayWidth = Math.max(5, reductionPercentage); 
    
    bar.style.width = displayWidth + "%";
    bar.innerText = Math.round(reductionPercentage) + "% Cost";
    
    if(reductionPercentage < 15) {
        bar.className = "progress-bar bg-success"; 
    } else {
        bar.className = "progress-bar bg-warning text-dark"; 
    }

   
    renderComparisonChart(finalCost, monthlyBill * 12);
}

//chart
function renderComparisonChart(solarCost, annualBill) {
    const ctx = document.getElementById('inflationChart').getContext('2d');
    
    if (chartInstance) chartInstance.destroy();

    let labels = [];
    let billData = [];
    let solarData = [];
    let runningBill = 0;
    let currentAnnual = annualBill;

    for(let i=1; i<=15; i++) {
        labels.push(`Year ${i}`);
        runningBill += currentAnnual;
        billData.push(runningBill);
        solarData.push(solarCost); 
        currentAnnual *= (1 + currentInflation);
    }

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Cumulative Bill Paid (Loss)',
                    data: billData,
                    borderColor: '#dc3545',
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Final Solar Cost (All Inclusive)',
                    data: solarData,
                    borderColor: '#198754',
                    borderWidth: 3,
                    borderDash: [5, 5],
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: { label: (ctx) => '₹ ' + Math.round(ctx.raw).toLocaleString() }
                },
                legend: { position: 'bottom' }
            },
            scales: {
                y: { ticks: { callback: (val) => '₹' + val/1000 + 'k' } }
            }
        }
    });
}

//share 
async function shareReport() {
    const monthlyBill = document.getElementById('oldBillDisplay').innerText;
    const monthlySavings = document.getElementById('monthlySavingsDisplay').innerText;
    const freedomDate = document.getElementById('freedomDateDisplay').innerText;
    const finalCost = document.getElementById('finalCostDisplay').innerText;
    const profit = document.getElementById('totalProfitDisplay').innerText;
     
    const shareText = `☀️ *My Solar Freedom Plan* ☀️\n\n` +
        `📉 *Current Bill:* ${monthlyBill}\n` +
        `💰 *Monthly Savings:* ${monthlySavings}\n` +
        `🗓️ *Bill-Free Date:* ${freedomDate}\n\n` +
        `🚀 *Net Investment:* ${finalCost}\n` +
        `📈 *25-Year Profit:* ${profit}\n\n` +
        `Generated via SolarTrust Consultant.`;

    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Solar Investment Report',
                text: shareText,
            });
        } catch (err) {
            console.log('Share canceled:', err);
        }
    } else {
        navigator.clipboard.writeText(shareText).then(() => {
            alert("Report copied to clipboard! You can paste it in WhatsApp/Email.");
        });
    }
}

window.onload = loadSettings;