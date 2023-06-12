import React, { useEffect, useRef  } from 'react';
import Chart from 'chart.js/auto';
import moment from 'moment';
import 'chartjs-adapter-moment';

moment.suppressDeprecationWarnings = true;

const ProfileGraph = ({ soloGames, teamGames }) => {

  const canvasRef = useRef(null);
  const formatTimestamp = (timestamp) => {
    const dateStartIndex = timestamp.indexOf('"') + 1;
    const dateEndIndex = timestamp.lastIndexOf('"');
    const dateString = timestamp.substring(dateStartIndex, dateEndIndex);
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return moment(date).format('YYYY-MM-DD'); // Adjust the format to match your data
    }
    return 'Invalid Date';
  };

  useEffect(() => {
    const getXAxisLabels = () => {
      const allDates = [
        ...soloGames.map((game) => game.date),
        ...teamGames.map((game) => game.date),
      ];
    
      const uniqueDates = [...new Set(allDates)].sort();
    
      return uniqueDates.map((date) => formatTimestamp(date));
    };  

    const ctx = canvasRef.current.getContext('2d');

    const lineData = {
      labels: getXAxisLabels(),
      datasets: [
        {
          label: `Solo`,
          borderColor: 'rgb(17, 29, 94)',
          backgroundColor: 'rgba(17, 29, 94)',
          borderWidth: 1,
          hoverBackgroundColor: '#0069b447',
          hoverBorderColor: '#0069b4',
          data: soloGames.map((el) => ({ x: formatTimestamp(el.date), y: Number(el.total) })),
        },
        {
          label: `Team`,
          borderColor: 'rgb(243, 113, 33)',
          backgroundColor: 'rgba(243, 113, 33)',
          borderWidth: 1,
          hoverBackgroundColor: '#0069b447',
          hoverBorderColor: '#0069b4',
          data: teamGames.map((el) => ({ x: formatTimestamp(el.date), y: Number(el.total) })),
        },
      ],
    };

    const lineDataOptions = {
      responsive: true,
      scales: {
        y: {
          title: {
            display: true,
            text: 'Score',
            font: {
              size: 15,
            },
          },
        },
        x: {
          type: 'time',
          time: {
            unit: 'month',
            displayFormats: {
              month: 'MMM YYYY',
            },
          },
          title: {
            display: true,
            text: 'Date',
            font: {
              size: 15,
            },
            position: 'bottom',
            align: 'center',
            rotation: 0,
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: 'Score Over Time',
          font: {
            size: 20,
          },
        },
      },
    };

    new Chart(ctx, {
      type: 'line',
      data: lineData,
      options: lineDataOptions,
    });
  }, [soloGames, teamGames]);

  return (
    <canvas
      ref={canvasRef}
      id="profile-chart"
      className="m-2 border"
      style={{ backgroundColor: 'white', height: '320px', width: "100%" }}
    />
  );
};

export default ProfileGraph;
