document.addEventListener('DOMContentLoaded', async() => {
  const canvas = document.getElementById('inventoryChart');
  if (!canvas) {
    console.error('Canvas #inventoryChart not found');
    return;
  }

  const pathParts = window.location.pathname.split('/');
  const adminId = pathParts[pathParts.indexOf('admin')+1];

  let categories = ['Antibiotics', 'Pain Relief', 'Vitamins', 'Cardiac', 'Diabetes', 'Other'];
  let values = [0, 0, 0, 0, 0, 0];

  try{
    const res = await fetch(`/api/v1/admin/${adminId}/dashboard`);
    const data = await  res.json();
    const stats = data.data || data;

    if(stats.medicinesByCategory){
      const categoryMap = {
        'Antibiotics' : 'Antibiotics',
        'Pain Relief' : 'Pain Relief',
        'Vitamins' : 'Vitamins',
        'Cardiac' : 'Cardiac',
        'Diabetics' : 'Diabetics',
      };

      categories = [];
      values = [];

      for (const [cat, count] of Object.entries(stats.medicinesByCategory)) {
        categories.push(cat);
        values.push(count);
      }

      //If no data, use defaults
      if (categories.length === 0) {
        categories = ['No Data'];
        values = [0];
      }
    }
  }catch (e) {
      console.error('Failed to fetch category data: ', e);
    }
  

  const ctx = canvas.getContext('2d');
  const barColor = '#66bb6a';

  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || canvas.width || 520;
  const height = canvas.clientHeight || 260;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(dpr, dpr);

  const padding = { top: 16, right: 16, bottom: 48, left: 44 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const maxVal = Math.max(...values) || 1;
  const barSpace = chartW / categories.length;
  const barWidth = barSpace * 0.6;

  ctx.strokeStyle = '#d8e3e7';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding.left, padding.top);
  ctx.lineTo(padding.left, padding.top + chartH);
  ctx.lineTo(padding.left + chartW, padding.top + chartH);
  ctx.stroke();

  ctx.font = '12px "Segoe UI", Arial, sans-serif';
  ctx.textAlign = 'center';

  categories.forEach((label, i) => {
    const x = padding.left + barSpace * i + barSpace / 2;
    const barHeight = (values[i] / maxVal) * chartH;
    const y = padding.top + chartH - barHeight;

    ctx.fillStyle = barColor;
    ctx.fillRect(x - barWidth / 2, y, barWidth, barHeight);

    ctx.fillStyle = '#1f2933';
    ctx.fillText(values[i], x, y - 6);
    ctx.fillStyle = '#5a6b7b';
    ctx.fillText(label, x, padding.top + chartH + 18);
  });

  console.log('Chart rendered with categories:', categories, 'values:', values);
});