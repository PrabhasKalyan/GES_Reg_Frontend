import React from 'react'
import { Bar, ResponsiveContainer } from 'recharts'
import { BarChart as BarGraph, XAxis, YAxis } from 'recharts'
import moment from 'moment'

type Props = {}

const jsonData = {
  user_data: {
    username: "prabhasmudhieti@gmail.com",
    first_name: "Prabhas",
    last_name: "Kalyan",
    email: "prabhasmudhieti@gmail.com",
    password: "pbkdf2_sha256$870000$f17tK370zqpqQgfoFeTf99$LLa+r6lZVUG628nZ73soxstqSw9F0H4V9TqSk7i29wc=",
    phone_number: "+919640094070",
    role: "CA",
    payment_status: false,
    ca_code: null,
    date_joined: "2025-01-03T07:07:21.174298Z"
  },
  registered_users: [
    {
      username: "prabhas1@gmail.com",
      first_name: "Prabhas",
      last_name: "Kalyan",
      email: "prabhas1@gmail.com",
      password: "pbkdf2_sha256$870000$oIvBjBrmQ47NnpIImPN5Sw$1/wj8mSVqZLrljQUE9FBQdDArnKf+PTAbe4VmdV+LNU=",
      phone_number: "+919640094070",
      role: "Student",
      payment_status: false,
      ca_code: null,
      date_joined: "2025-01-10T12:25:42.331586Z"
    },
    {
      username: "prabhas2@gmail.com",
      first_name: "Prabhas",
      last_name: "Kalyan",
      email: "prabhas2@gmail.com",
      password: "pbkdf2_sha256$870000$YKN42QpDPB0CMmoWlY0nVf$2K1Itl3XKczivj+CWXR1CiiHK31cMLJmnRLcu1/5osM=",
      phone_number: "9640094070",
      role: "Student",
      payment_status: true,
      ca_code: null,
      date_joined: "2025-01-10T13:10:49Z"
    }
  ]
}

// Generate the last 10 days
const generateLast10Days = () => {
  const days = []
  for (let i = 9; i >= 0; i--) {
    days.push(moment().subtract(i, 'days'))
  }
  return days
}

// Process data for the chart
const processData = () => {
  const last10Days = generateLast10Days()

  // Count users per day
  const dateCounts: Record<string, number> = {}
  jsonData.registered_users.forEach(user => {
    const date = moment(user.date_joined).format('YYYY-MM-DD')
    if (last10Days.map(day => day.format('YYYY-MM-DD')).includes(date)) {
      dateCounts[date] = (dateCounts[date] || 0) + 1
    }
  })

  // Ensure all 10 days are present
  return last10Days.map(date => ({
    name: date.format('Do MMM'), // Format date as "1st Jan, 2nd Jan"
    total: dateCounts[date.format('YYYY-MM-DD')] || 0
  }))
}

export default function BarChart({}: Props) {
  const data = processData()

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
  )
}


