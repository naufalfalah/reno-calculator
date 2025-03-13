let currentStep = 1;

function showStep(step) {
  const steps = document.querySelectorAll('.form-step');
  
  steps.forEach((stepElement) => {
    const stepNum = parseInt(stepElement.getAttribute('data-step'), 10);
    
    if (stepNum === step) {
      stepElement.classList.remove('hidden');
      stepElement.classList.add('active');
    } else {
      stepElement.classList.add('hidden');
      stepElement.classList.remove('active');
    }
  });
}

function nextStep() {
  const totalSteps = document.querySelectorAll('.form-step').length;

  if (currentStep < totalSteps) {
    currentStep++;
    showStep(currentStep);
  } else {
    alert("You've reached the final step!");
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
}

function generateReport() {
    console.log('Generating report...');
  
    setTimeout(() => {
      console.log('Report generated successfully.');
  
      nextStep(9);
    }, 1000);
}

function restart() {
    location.reload();
}

const prevButtons = document.querySelectorAll('.prev-btn');
prevButtons.forEach(button => {
  button.addEventListener('click', () => {
    prevStep();
  });
});

const nextButtons = document.querySelectorAll('.next-btn');
nextButtons.forEach(button => {
  button.addEventListener('click', () => {
    nextStep();
  });
});

document.getElementById('generateReportBtn').addEventListener('click', generateReport);
document.getElementById('restartBtn').addEventListener('click', restart);

let userData = {
  propertyType: '',
  propertyStatus: '',
  propertySize: '',
  bedrooms: '',
  bathrooms: '',
  areas: [],
  design: ''
};

// STEP 1 handler
function handleStep1() {
  const propertyType = document.querySelector('input[name="propertyType"]:checked');
  const propertyStatus = document.querySelector('input[name="propertyStatus"]:checked');
  const propertySize = document.getElementById('propertySize').value.trim();
  const bedrooms = document.getElementById('bedrooms').value;
  const bathrooms = document.getElementById('bathrooms').value;

  if (!propertyType || !propertyStatus || !propertySize || !bedrooms || !bathrooms) {
    alert('Please fill in all fields before proceeding.');
    return;
  }

  userData.propertyType = propertyType.value;
  userData.propertyStatus = propertyStatus.value;
  userData.propertySize = parseInt(propertySize);
  userData.bedrooms = bedrooms;
  userData.bathrooms = bathrooms;

  goToNextStep();
}

// Reuse this function for Step 2 and onward
function goToNextStep() {
  if (currentStep === 2) {
    const checked = document.querySelectorAll('#step2 input[type="checkbox"]:checked');
    if (checked.length === 0) {
      alert('Please select at least one area.');
      return;
    }
    userData.areas = Array.from(checked).map(cb => cb.value);
  }

  document.getElementById(`step${currentStep}`).classList.remove('active');
  currentStep++;

  if (currentStep <= 4) {
    document.getElementById(`step${currentStep}`).classList.add('active');
  }

  if (currentStep === 4) {
    showResult();
  }
}

function selectOption(field, value) {
  userData[field] = value;
  goToNextStep();
}

function showResult() {
  let basePrice = 10000;

  // Property type adds cost
  if (userData.propertyType === 'Condo') basePrice += 5000;
  if (userData.propertyType === 'Landed') basePrice += 15000;

  // Property status adjustment
  if (userData.propertyStatus === 'Resale') basePrice += 8000;

  // Property size factor
  if (userData.propertySize > 1000) basePrice += (userData.propertySize - 1000) * 10;

  // Bedrooms and bathrooms
  basePrice += parseInt(userData.bedrooms) * 5000;
  basePrice += parseInt(userData.bathrooms) * 4000;

  // Areas to renovate
  userData.areas.forEach(area => {
    if (area === 'Living Room') basePrice += 8000;
    if (area === 'Kitchen') basePrice += 10000;
    if (area === 'Bathroom') basePrice += 6000;
    if (area === 'Bedroom') basePrice += 7000;
  });

  // Design multiplier
  if (userData.design === 'Luxury') basePrice *= 1.5;
  if (userData.design === 'Industrial') basePrice *= 1.2;

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
    <h3>Property Details</h3>
    <p><strong>Type:</strong> ${userData.propertyType}</p>
    <p><strong>Status:</strong> ${userData.propertyStatus}</p>
    <p><strong>Size:</strong> ${userData.propertySize} sqft</p>
    <p><strong>Bedrooms:</strong> ${userData.bedrooms}</p>
    <p><strong>Bathrooms:</strong> ${userData.bathrooms}</p>

    <h3>Renovation Scope</h3>
    <p><strong>Areas:</strong> ${userData.areas.join(', ')}</p>
    <p><strong>Design:</strong> ${userData.design}</p>

    <h3>Total Estimated Cost: SGD ${basePrice.toLocaleString()}</h3>
  `;
}

function restartCalculator() {
  currentStep = 1;
  userData = {
    propertyType: '',
    propertyStatus: '',
    propertySize: '',
    bedrooms: '',
    bathrooms: '',
    areas: [],
    design: ''
  };

  document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
  document.getElementById('step1').classList.add('active');

  // Clear selections
  document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
  document.getElementById('propertySize').value = '';
  document.getElementById('bedrooms').value = '';
  document.getElementById('bathrooms').value = '';
  document.querySelectorAll('#step2 input[type="checkbox"]').forEach(cb => cb.checked = false);
}
