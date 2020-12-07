const form = document.getElementById('js-symbol-form');
const profile = document.getElementById('js-company-profile');
const errorMessage = document.getElementById('js-error-message');
let symbol;
let profileData;

async function fetchData() {
  const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=4b1383acce65f27975d400595af5a6d9`);
  return response.json();
}

function generateDisplayHTML() {
  let output = '';
  for(const key in profileData) {
    if(key === 'changes') {
      let sign = '';
      if(profileData[key] > 0) {
        sign = 'positive';
      }
      if(profileData[key] < 0) {
        sign = 'negative';
      }
      output += `
        <div class="field flex">
          <div class="key">${key}:</div>
          <div class="value ${sign}">${profileData[key]}</div>
        </div>
      `;
    }

    else if(key === 'price' && profileData[key]) {
      output += `
        <div class="field flex">
          <div class="key">${key}:</div>
          <div class="value">$${profileData[key]}</div>
        </div>
      `;
    }

    else if(key === 'website') {
      output += `
        <div class="field flex">
          <div class="key">${key}:</div>
          <div class="value"><a href="${profileData[key]}">${profileData[key]}</a></div>
        </div>
      `;
    }

    else {
      output += `
        <div class="field flex">
          <div class="key">${key}:</div>
          <div class="value">${profileData[key]}</div>
        </div>
      `;
    };
  };

  return output;
}

const handleSubmit = e => {
  e.preventDefault();
  symbol = document.getElementById('js-symbol-input').value;
  fetchData().then(data => {
    profileData = data[0];
    if(profileData) {
      profile.style.display = 'block';
      errorMessage.style.display = 'none';
      document.getElementById('js-container').innerHTML = generateDisplayHTML();
    }
    else {
      profile.style.display = 'none';
      errorMessage.style.display = 'block';
      document.getElementById('js-error-message').innerHTML = 'There appears to be an error. Try entering a different symbol.';
      
    }
  });
}

form.addEventListener('submit', handleSubmit);