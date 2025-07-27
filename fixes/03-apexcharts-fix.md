# Fix for ApexCharts Integration and "exports is not defined" Error

## Issue
The application is loading ApexCharts via CDN scripts in `index.html`, which is causing conflicts with React's module system, resulting in the "exports is not defined" error. ApexCharts is already installed as a dependency in `package.json`.

## Fix Implementation

### Step 1: Remove CDN script tags from index.html

Remove the following lines from `frontend/public/index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
<script src="https://unpkg.com/react-apexcharts@1.4.0/dist/react-apexcharts.min.js"></script>
```

The updated `<head>` section should look like this:

```html
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Web site created with React and Tailwind CSS" />

  <link rel="icon" href="logo.png" />
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

  <script src="https://cdn.tailwindcss.com"></script>
  
  <title>Skyran</title>
</head>
```

### Step 2: Import ApexCharts properly in components that need it

For any component that needs to use ApexCharts, import it properly at the top of the file:

```javascript
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
```

For example, if you have a component that uses ApexCharts for data visualization, update it like this:

```javascript
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartComponent = () => {
  const [chartOptions, setChartOptions] = useState({
    // chart options here
  });
  
  const [chartSeries, setChartSeries] = useState([
    // chart series data here
  ]);
  
  return (
    <div>
      <ReactApexChart 
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={350}
      />
    </div>
  );
};

export default ChartComponent;
```

### Step 3: Ensure the correct versions are being used

Check that the versions in `package.json` are compatible:

```json
"apexcharts": "^4.7.0",
"react-apexcharts": "^1.7.0",
```

If you encounter version compatibility issues, you may need to update these dependencies to versions that work well together.

## Testing
After making these changes:
1. The "exports is not defined" error should be resolved
2. Any charts or visualizations using ApexCharts should continue to work correctly
3. The console should be free of related errors