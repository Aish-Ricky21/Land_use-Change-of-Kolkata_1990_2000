// Data
const data = [
  { "Class Name": "Vegetation", "Loss": 9.3474, "Gain": 4.1067, "Unchanged": 1.7604, "Changed": -2.976993865 },
  { "Class Name": "Bare Land", "Loss": 5.0355, "Gain": 8.6562, "Unchanged": 1.6317, "Changed": 2.218974076 },
  { "Class Name": "Agriculture", "Loss": 23.922, "Gain": 9.369, "Unchanged": 5.1849, "Changed": -2.806804374 },
  { "Class Name": "Fellow Land", "Loss": 11.0709, "Gain": 1.6902, "Unchanged": 2.2752, "Changed": -4.123022152 },
  { "Class Name": "HSP", "Loss": 10.6389, "Gain": 34.893, "Unchanged": 36.2511, "Changed": 0.669058318 },
  { "Class Name": "Settlement", "Loss": 10.4391, "Gain": 14.2209, "Unchanged": 57.8628, "Changed": 0.065358054 },
  { "Class Name": "Water Body", "Loss": 4.5711, "Gain": 2.0889, "Unchanged": 8.3097, "Changed": -0.298711145 }
];

// Create Table Header
const headerRow = Object.keys(data[0]);
const thead = document.getElementById('table-head');
thead.innerHTML = `<tr>${headerRow.map(col => `<th>${col}</th>`).join('')}</tr>`;

// Create Table Rows
const tableBody = document.getElementById('data-table');
data.forEach(item => {
  const row = `<tr>${headerRow.map(col => `<td>${item[col]}</td>`).join('')}</tr>`;
  tableBody.innerHTML += row;
});

// Bar Chart (Gain vs Loss)
Plotly.newPlot('barChart', [
  {
    x: data.map(d => d["Class Name"]),
    y: data.map(d => d.Gain),
    name: 'Gain',
    type: 'bar',
    marker: { color: '#17BECF' }
  },
  {
    x: data.map(d => d["Class Name"]),
    y: data.map(d => d.Loss),
    name: 'Loss',
    type: 'bar',
    marker: { color: '#FF7F0E' }
  }
], );

// Draw Pie Chart initially
function drawPieChart(valueType) {
  const values = valueType === 'Changed'
    ? data.map(d => Math.abs(d.Changed))
    : data.map(d => d.Unchanged);

  const labels = data.map(d => d["Class Name"]);

  Plotly.newPlot('pieChart', [{
    values: values,
    labels: labels,
    type: 'pie',
    hole: 0.4,
    marker: {
      colors: ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0']
    },
    textinfo: 'label+percent',
    pull: 0.05
  }], );
}

// Update Pie Chart
function updatePieChart(valueType) {
  const values = valueType === 'Changed'
    ? data.map(d => Math.abs(d.Changed))
    : data.map(d => d.Unchanged);

  Plotly.animate('pieChart', {
    data: [{ values: values }],
    
  }, {
    transition: {
      duration: 700,
      easing: 'cubic-in-out'
    },
    frame: { duration: 500 }
  });
}

// On page load
drawPieChart('Changed');

// Dropdown change event
document.getElementById('valueTypeSelect').addEventListener('change', (e) => {
  updatePieChart(e.target.value);
});

// Dark Mode toggle
document.getElementById('toggleDarkMode').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});




  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  