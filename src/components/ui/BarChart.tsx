import React, { useState, useEffect } from 'react';
import { Bar, ResponsiveContainer } from 'recharts';
import { BarChart as BarGraph, XAxis, YAxis } from 'recharts';
import moment from 'moment';
import axios from 'axios';

type Props = {};

axios.defaults.baseURL = 'http://127.0.0.1:8000';
const jwtToken = localStorage.getItem('jwtToken');
const headers = {
  Authorization: `Bearer ${jwtToken}`,
};

// Generate the last 10 days
const generateLast10Days = () => {
  const days = [];
  for (let i = 9; i >= 0; i--) {
    days.push(moment().subtract(i, 'days'));
  }
  return days;
};

export default function BarChart({}: Props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/v1/ca_dashboard/', { headers });
        const jsonData = res.data;

        // Process data for the chart
        const last10Days = generateLast10Days();

        // Count users per day
        const dateCounts: Record<string, number> = {};
        jsonData.registered_users.forEach((user: any) => {
          const date = moment(user.date_joined).format('YYYY-MM-DD');
          if (last10Days.map(day => day.format('YYYY-MM-DD')).includes(date)) {
            dateCounts[date] = (dateCounts[date] || 0) + 1;
          }
        });

        // Ensure all 10 days are present
        const chartData = last10Days.map(date => ({
          name: date.format('Do MMM'), // Format date as "1st Jan, 2nd Jan"
          total: dateCounts[date.format('YYYY-MM-DD')] || 0,
        }));

        setData(chartData);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ResponsiveContainer width={'100%'} height={350}>
      <BarGraph data={data} barCategoryGap="10%">
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          interval={0} // Ensure all labels are shown
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          tickFormatter={(value) => value.toString()}
        />
        <Bar dataKey="total" radius={[4, 4, 0, 0]} fill="black" />
      </BarGraph>
    </ResponsiveContainer>
  );
}


