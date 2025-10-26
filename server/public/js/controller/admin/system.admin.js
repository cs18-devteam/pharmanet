// Sales Chart (Line)
const salesCtx = document.getElementById('salesChart').getContext('2d');
new Chart(salesCtx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales',
      data: [4000, 3500, 5000, 4500, 6000, 7000],
      borderColor: '#4fc3f7',
      backgroundColor: 'rgba(79, 195, 247, 0.2)',
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: '#ccc' } },
      y: { ticks: { color: '#ccc' } }
    }
  }
});

// Inventory Chart (Bar)
const inventoryCtx = document.getElementById('inventoryChart').getContext('2d');
new Chart(inventoryCtx, {
  type: 'bar',
  data: {
    labels: ['Antibiotics', 'Pain Relief', 'Vitamins', 'Cardiac', 'Diabetes', 'Other'],
    datasets: [{
      label: 'Stock',
      data: [330, 280, 460, 190, 230, 310],
      backgroundColor: '#66bb6a'
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        ticks: { color: '#ccc' }
      },
      y: {
        ticks: { color: '#ccc' }
      }
    }
  }
});
