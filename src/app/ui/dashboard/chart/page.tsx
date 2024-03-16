"use client"

import cx from './chart.module.css'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { dataChart } from '@/app/data/data';

const Chart = () => {
    return (
        <div className={cx.wrapper}>
            <h2 className={cx.title}>Sản phẩm bán ra tuần này</h2>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart
                    width={500}
                    height={300}
                    data={dataChart}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 40,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{background: '#151c2c', border: 'none'}} />
                    <Legend />
                    <Line type="monotone" dataKey="visit" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="purchased" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;