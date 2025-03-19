import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import dayjs from 'dayjs';
import axios from 'axios';
import { FcStatistics } from 'react-icons/fc';
import { PiShoppingBagLight, PiPackageLight } from 'react-icons/pi';
import { CiShoppingTag } from 'react-icons/ci';
import { Reviews } from '@mui/icons-material';
import Dashboard from './Dashboard';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Stats = () => {
  const [products, setProducts] = useState([]);
  const [commands, setCommands] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [newestYear, setNewestYear] = useState(null);
  const [oldestYear, setOldestYear] = useState(null);

  useEffect(() => {
    axios.get("/products_all").then(res => {
      setProducts(res.data.products);
    });
  }, []);

  useEffect(() => {
    axios.get("/commands").then(res => {
      const commands = res.data.commands;
      setCommands(commands);

      // Find the oldest and newest years from commands
      const years = commands.map(order => new Date(order.created_at).getFullYear());
      const oldest = Math.min(...years);
      const newest = Math.max(...years);
      setOldestYear(oldest);
      setNewestYear(newest);
      setSelectedYear(newest); // Set initial selected year to newest year
    });
  }, []);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Process data
  const cities = commands.map(item => item.city);
  const cityCount = {};
  cities.forEach(city => {
    cityCount[city] = (cityCount[city] || 0) + 1;
  });

  const statuses = commands.map(item => item.status);
  const statusCount = {};
  statuses.forEach(status => {
    statusCount[status] = (statusCount[status] || 0) + 1;
  });

  const totalPrices = commands.map(item => item.total_price);
  console.log("products:",products)
  let totalReviews = 0
  products.forEach(e=>{
      totalReviews += e.reviews.length
  })
  console.log("Total Reviews: ",totalReviews)
  // Pie chart data for payment status
  const paymentStatus = { paid: 0, pending: 0, verified: 0, canceld: 0, failed: 0 };
  commands.forEach(demand => {
    switch (demand.status) {
      case 'paid':
        paymentStatus.paid++;
        break;
      case 'pending':
        paymentStatus.pending++;
        break;
      case 'verified':
        paymentStatus.verified++;
        break;
      case 'canceld':
        paymentStatus.canceld++;
        break;
      case 'failed':
        paymentStatus.failed++;
        break;
      default:
        break;
    }
  });

  const pieData = {
    labels: ['Paid', 'pending', 'verified', 'failed', 'canceld'],
    datasets: [
      {
        data: [paymentStatus.paid, paymentStatus.pending, paymentStatus.verified, paymentStatus.failed, paymentStatus.canceld],
        backgroundColor: ['rgba(0, 223, 118, 0.5)', 'rgba(241, 123, 57, 0.5)', 'rgba(235, 25, 67,0.5)', 'rgba(235, 24, 50,0.8)', 'rgba(25, 25, 170,0.5)'],
        borderWidth: 1,
      },
    ],
  };

  // Process data for the bar chart (Number of Orders Per Month)
  const orderCounts = commands.reduce((acc, order) => {
    const year = new Date(order.created_at).getFullYear();
    if (year === selectedYear) {
      const month = dayjs(order.created_at).format('MMMM');
      acc[month] = (acc[month] || 0) + 1;
    }
    return acc;
  }, {});

  const sortedOrderCounts = monthNames.reduce((acc, month) => {
    if (orderCounts[month]) {
      acc[month] = orderCounts[month];
    }
    return acc;
  }, {});

  const months = Object.keys(sortedOrderCounts);
  const orderNumbers = Object.values(sortedOrderCounts);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Number of Orders',
        data: orderNumbers,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Process data for the line chart (Total Prices over Time)

  const priceTrends = commands.filter((e)=>e.status ==  "paid").reduce((acc, order) => {

    const year = new Date(order.created_at).getFullYear();
    if (year === selectedYear) {
      const month = dayjs(order.created_at).format('MMMM');
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += order.total_price;
    }
    return acc;
  }, {});

  const sortedPriceTrends = monthNames.reduce((acc, month) => {
    if (priceTrends[month]) {
      acc[month] = priceTrends[month];
    }
    return acc;
  }, {});

  const monthsForPrices = Object.keys(sortedPriceTrends);
  const totalPricesPerMonth = Object.values(sortedPriceTrends);
  console.log("-----" ,commands)

  const lineChartData = {
    labels: monthsForPrices,
    datasets: [
      {
        label: 'Total Revenue',
        data: totalPricesPerMonth,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  // Process data for the pie chart (Free Shipping vs Paid Shipping)
  const shippingData = commands.reduce((acc, order) => {
    if (order.free_shipping) {
      acc.free++;
    } else {
      acc.paid++;
    }
    return acc;
  }, { free: 0, paid: 0 });

  const pieShippingData = {
    labels: ['Free Shipping', 'Paid Shipping'],
    datasets: [
      {
        data: [shippingData.free, shippingData.paid],
        backgroundColor: ['rgba(0, 223, 118, 0.5)', 'rgba(241, 123, 57, 0.5)'],
        borderWidth: 1,
      },
    ],
  };

  let stock = 0;
  products.forEach(e => stock += e.quantity);

  let revenue = 0;

  commands.forEach(e => e.status == "paid" ? revenue += e.total_price : revenue+=0);

  // Function to handle year selection change
  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };
  return (

    <Dashboard>

      <h1 className="text-2xl font-bold mb-4 border shadow mt-4 p-2 border-orange-500 text-orange-600 flex justify-between items-center bg-orange-50 rounded txt-white">Statistiques
            <FcStatistics className='w-12 h-12 '/>
        </h1>

        <div className='mb-4 grid  grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1  gap-2'>
            <div className='flex max-lg:w-full  min-h-[8rem] overflow-hidden gap-12 justify-between border font-semibold text-xl rounded border-orange-500 bg-orange-100'>
                <div className='flex flex-col gap-6 m-4'>
                    <div>Products</div>
                    <div className='text-[2.2rem]'>{products?.length}</div>
                </div>
                <div className=' w-[6rem] relative flex justify-center items-center bg-orange-500 '>
                    <PiShoppingBagLight fontSize='' className=' h-full absolute  text-orange-100  text-[5rem]'/>
                </div>
            </div>

            <div className='flex max-lg:w-full  max-md:w-full  min-h-[8rem] overflow-hidden gap-12 justify-between border font-semibold text-xl rounded border-indigo-500 bg-indigo-100'>
                <div className='flex flex-col  gap-6 m-4'>
                    <div>Orders</div>
                    <div className='text-[2.2rem]'>{commands?.length}</div>
                </div>
                <div className=' w-[6rem] relative flex justify-center items-center bg-indigo-500 '>
                    <CiShoppingTag fontSize='' className=' h-full absolute  text-indigo-100  text-[5rem]'/>
                </div>
            </div>

            <div className='flex max-lg:w-full  min-h-[8rem] overflow-hidden gap-12 justify-between border font-semibold text-xl rounded border-green-500 bg-green-100'>
                <div className='flex flex-col  gap-6 m-4'>
                    <div>Reviews</div>
                    <div className='text-[2.2rem]'>{totalReviews}</div>
                </div>
                <div className=' w-[6rem] relative flex justify-center items-center bg-green-500 '>
                    <Reviews fontSize='' className=' h-full absolute  text-green-100  text-[5rem]'/>
                </div>
            </div>

            {/* <div className='flex max-lg:w-full  min-h-[8rem] overflow-hidden gap-12 justify-between border font-semibold text-xl rounded  border-yellow-500 bg-yellow-100'>
                <div className='flex flex-col gap-6 m-4'>
                    <div>Customers</div>
                    <div className='text-[2.2rem]'>{totalReviews}</div>
                </div>
                <div className=' w-[6rem] relative flex justify-center items-center bg-yellow-500 '>
                    <UsersThree fontSize='' className=' h-full absolute  text-yellow-100  text-[5rem]'/>
                </div>
            </div> */}

            <div className='flex max-lg:w-full  min-h-[8rem] overflow-hidden gap-12 justify-between border font-semibold text-xl rounded border-red-500 bg-red-100'>
                <div className='flex flex-col gap-6 m-4'>
                    <div>Stock</div>
                    <div className='text-[2.2rem]'>{
                    (stock >= 1000) ? <div className='flex flex-col gap-2 '>{stock.toString().split("")[0]+"."+stock.toString().split("").slice(1,2).join("")}k <span className=' text-base font-mono text-neutral-500'>{stock}</span></div> : stock
                    }</div>
                </div>
                <div className=' w-[6rem] relative flex justify-center items-center bg-red-500 '>
                    <PiPackageLight fontSize='' className=' h-full absolute  text-red-100  text-[5rem]'/>
                </div>
            </div>
            <div className='flex max-lg:w-full   min-h-[8rem] overflow-hidden gap-12 justify-between border font-semibold text-xl rounded border-sky-500 bg-sky-100'>
                <div className='flex flex-col gap-6 m-4'>
                    <div>Total Revenue</div>
                    <div className='text-[2.2rem]'>{
                    (stock >= 1000) ? <div className='flex flex-col gap-2 '>{revenue.toString().split("")[0]+"."+revenue.toString().split("").slice(1,2).join("")}k DH<span className=' text-base font-mono text-neutral-500'>{revenue} DH</span></div> : <div>{stock} DH</div>
                    }</div>
                </div>
                <div className=' w-[6rem] relative flex justify-center items-center bg-sky-500 '>
                    <PiPackageLight fontSize='' className=' h-full absolute  text-sky-100  text-[5rem]'/>
                </div>
            </div>
        </div>

        <div className="mb-8 p-2  relative border border-orange-500 rounded-md">
            <div className=" absolute right-0 mr-4">
                <select value={selectedYear} onChange={handleYearChange}>
                {/* Generate options for all years between oldest and newest */}
                {Array.from({ length: newestYear - oldestYear + 1 }, (_, i) => oldestYear + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
                </select>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-2">Orders Per Month - {selectedYear || oldestYear}</h2>
                <Bar data={chartData} />
            </div>
        </div>

        <div className="mb-8 p-2 border border-orange-500 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Order Status</h2>
            <div className='m-auto flex justify-center lg:max-w-[30rem]'>
            <Doughnut data={pieData} />
            </div>
        </div>



      <div className="mb-8 p-2  relative border border-orange-500 rounded-md">
      <div className=" absolute right-0 mr-4">
        <select value={selectedYear} onChange={handleYearChange}>
                {/* Generate options for all years between oldest and newest */}
                {Array.from({ length: newestYear - oldestYear + 1 }, (_, i) => oldestYear + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
        </select>
      </div>
        <h2 className="text-xl font-semibold mb-2">Sales per month - {selectedYear}</h2>
        <Line data={lineChartData} />
      </div>

        <div className="mb-8 p-2 border border-orange-500 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Free vs Paid Shipping</h2>
            <div className='m-auto flex justify-center lg:max-w-[30rem]'>
            <Pie data={pieShippingData} />
            </div>
        </div>
    </Dashboard>
  );
};

export default Stats;
