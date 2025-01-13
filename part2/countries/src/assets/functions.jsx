

import tippy, {animateFill} from 'tippy.js';




export function getStringWidthInCh(str, font = '16px Arial') {
    // Create a temporary element to measure the text width
    const tempElement = document.createElement('span');
    tempElement.style.font = font;
    tempElement.style.visibility = 'hidden';
    tempElement.textContent = str;
    document.body.appendChild(tempElement);

    const widthInPixels = tempElement.offsetWidth;
    document.body.removeChild(tempElement);

    // Get the width of the character "0" in the given font
    const zeroWidth = document.createElement('span');
    zeroWidth.style.font = font;
    zeroWidth.textContent = '0';
    document.body.appendChild(zeroWidth);
    const zeroWidthInPixels = zeroWidth.offsetWidth;
    document.body.removeChild(zeroWidth);

    // Calculate the width in 'ch' units (width of "0")
    return widthInPixels / zeroWidthInPixels;
}

export function plus(obj, add = 0) {
    obj.value += add;
    return obj.value;
}

export const getCountryByCode = (countries,code) => {
    return countries.find(country => country.cca3 === code);
};

export const getCurrentTimeByCode = (countries, countryCode) => {
    const country = countries.find(c => c.cca3 === countryCode);

  if (!country) {
    return `Country with code ${countryCode} not found.`;
  }

  const timezoneOffset = country.timezones[0]; // Use the first timezone listed
  
  if (timezoneOffset === 'UTC') {
    // If timezone is just UTC, no offset adjustment is needed
    const currentUTC = new Date();
    const currentTime = currentUTC.toLocaleString('en-US', {
      timeStyle: 'medium', // Includes hours, minutes, and seconds
      dateStyle: 'medium',
      timeZone: 'UTC'
    });
    return currentTime;
  }

  const offsetMatch = timezoneOffset.match(/UTC([+-]\d{2}):(\d{2})/);
  
  if (!offsetMatch) {
    return `Invalid timezone format for ${timezoneOffset}`;
  }

  const offsetHours = parseInt(offsetMatch[1], 10); // +02 or -03
  const offsetMinutes = parseInt(offsetMatch[2], 10); // 00, 30, etc.
  
  const currentUTC = new Date();
  currentUTC.setUTCHours(currentUTC.getUTCHours() + offsetHours);
  currentUTC.setUTCMinutes(currentUTC.getUTCMinutes() + (offsetHours < 0 ? -offsetMinutes : offsetMinutes));

  const currentTime = currentUTC.toLocaleString('en-US', {
    timeStyle: 'medium', // Includes hours, minutes, and seconds
    dateStyle: 'medium',
    timeZone: 'UTC' // Display in the adjusted time as if it were UTC
  });

  
    return currentTime;
  };


export  const kelvinToCelsius = (k) => (k - 273.15).toFixed(2);
  

export const runTippy = () => {
    const popup = tippy('[data-tippy-content]:not(.tippy-init)',{
      arrow: false,
      animateFill: true,
      hideOnClick: false,
      inertia: true,
      theme: 'light-border',
      plugins: [animateFill],
      allowHTML: true,
      onCreate(instance){
        instance.reference.classList.add('tippy-init');
      },
    });
    
  return popup
}

export function ucWords(str) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

    