import data from '../assets/data.json';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'


const TransactionChart = () => {
    const chartData = Object.values(
        data.transactions.reduce((acc, { category, amount }) => {
            if (!acc[category]) {
                acc[category] = { name: category, value: 0 };
            }
            acc[category].value += amount;
            return acc;
        }, {})
    );
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FD0', '#FF6699', '#33CCFF', '#FF9933'];

    const lineChartData = Object.values(
        data.transactions.reduce((acc, { date, amount }) => {
            if (!acc[date]) {
                acc[date] = { date: date, totalAmount: 0 };
            }
            acc[date].totalAmount += amount;
            return acc;
        }, {})
    ).sort((a, b) => new Date(a.date) - new Date(b.date));

    return(
        <>
        <div className='chart-container'>
        <h2> Pie Chart</h2>
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label={(entry) => `${entry.name}: ₹${entry.value}`}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))
                    }
                </Pie>
                <Tooltip /> {/* Shows data on hover */}
                <Legend />  {/* Displays the data keys */}
            </PieChart>
        </ResponsiveContainer>

        <h2>Spending Over Time</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={lineChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(str) => str.split('-').slice(1).join('/')} // Simplifies '2026-03-01' to '03/01'
          />
          <YAxis />
          <Tooltip formatter={(value) => `₹${value}`} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="totalAmount" 
            stroke="#8884d8" 
            activeDot={{ r: 8 }} 
            name="Daily Spend"
          />
        </LineChart>
      </ResponsiveContainer></div>
        </>
    )
}

export default TransactionChart;