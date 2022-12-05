import { useState } from "react";
import ApexChart from "react-apexcharts";
import "./styles.css";

const colorPrimary = "#5f7dff";
const colorDefault = "#e1e4f2";

const colorLabel = getComputedStyle(document.documentElement)
  .getPropertyValue("--color-label")
  .trim();

const fontFamily = getComputedStyle(document.documentElement)
  .getPropertyValue("--font-family")
  .trim();

const defaultOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    animations: {
      enabled: true,
      easing: "linear",
      speed: 500,
      animateGradually: {
        enabled: false,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 500,
      },
    },
  },
  stroke: {
    lineCap: "round",
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.2,
    },
  },
};

// Bar Chart

var options = {
  ...defaultOptions,
  chart: {
    ...defaultOptions.chart,
    type: "bar",
  },
  colors: [colorPrimary, colorDefault],
  stroke: { show: false },
  grid: {
    borderColor: "rgba(0, 0, 0, 0.035)",
    padding: { left: 0, right: 0, top: -16, bottom: -8 },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "50%",
      borderRadius: 6,
    },
  },
  yaxis: {
    labels: {
      style: {
        fontFamily: fontFamily,
        colors: colorLabel,
      },
      minWidth: 20,
      offsetX: -12,
      formatter: (value) => {
        return `${value}K`;
      },
    },
  },
  xaxis: {
    labels: {
      floating: true,
      style: {
        fontFamily: fontFamily,
        colors: colorLabel,
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      show: false,
    },
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
};

const follows = [
  {
    name: "This Year",
    data: [34, 55, 41, 61, 22, 58],
  },
  {
    name: "Last Year",
    data: [23, 32, 23, 41, 13, 39],
  },
];

const unfollows = [
  {
    name: "This Year",
    data: [21, 32, 61, 37, 28, 42],
  },
  {
    name: "Last Year",
    data: [32, 45, 29, 51, 32, 37],
  },
];

const buttons = ["Follows", "Unfollows"];

const ToggleButtons = ({ setSeries, setActiveButton, activeButton }) => {
  const handleClick = (stat) => {
    if (stat === "Follows") {
      setSeries(follows);
    } else {
      setSeries(unfollows);
    }
    setActiveButton(stat);
  };

  return (
    <nav>
      {buttons.map((button) => (
        <button
          className={button === activeButton ? "active" : ""}
          onClick={() => handleClick(button)}
        >
          {button}
        </button>
      ))}
    </nav>
  );
};

export const Chart = () => {
  const [series, setSeries] = useState(follows);
  const [activeButton, setActiveButton] = useState("Follows");

  return (
    <div className="card">
      <header>
        <h2>Insights</h2>
        <ToggleButtons
          setSeries={setSeries}
          setActiveButton={setActiveButton}
          activeButton={activeButton}
        />
      </header>
      <div className="chart">
        <ApexChart
          options={options}
          series={series}
          type="bar"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};
