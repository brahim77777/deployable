import React, { useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import { Tooltip, Button } from "@material-tailwind/react";
import { Toaster, toast } from 'sonner';

export default function CommandDetails({ command, products }) {
    const [status, setStatus] = useState(command.status);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.patch(`/commands/${command.id}`, { status });
            console.log('Status updated successfully:', response.data);
            toast.success('status changed successfully!');

        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Error submitting form!');

        }
    };

    return (
        <Dashboard>
                        <Toaster position="top-right" richColors />


            <div className="container mx-auto py-6 bg-gray-0">
                <h1 className="text-2xl font-bold mb-6">Command Details (ID: {command.id})</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Command Details */}
                    <div className="p-4 border border-indigo-900 shadow-lg rounded-lg space-y-4">
                        <h2 className="text-xl font-semibold border-2 border-indigo-800 p-2 rounded-md mb-2">Customer Information</h2>
                        <div className="border-indigo-900 border space-y-2 p-2 rounded-md px-2">
                            <div className='flex justify-between'>Name: <span className="font-medium text-gray-700">{command.first_name} {command.last_name}</span></div>
                            <div className='flex justify-between'>Email: <span className="font-medium text-gray-700">{command.email}</span></div>
                            <div className='flex justify-between'>Phone: <span className="font-medium text-gray-700">{command.phone}</span></div>
                            <div className='flex justify-between'>Address:
                                <span className="font-medium text-gray-700 whitespace-pre- break-words">{command.address}</span>
                            </div>
                            <div className='flex justify-between'>Free Shipping: <span className="font-medium text-gray-700">{command.freeShipping === 1 ? 'Yes' : 'No'}</span></div>
                            <div className='flex justify-between'>Status: <span className="font-medium text-gray-700">{command.status}</span></div>
                            <div className='flex justify-between'>Total Price: <span className="font-medium text-gray-700">{command.total_price} MAD</span></div>
                        </div>

                        <form onSubmit={handleFormSubmit} className="p-4 border border-indigo-900 shadow-lg rounded-lg space-y-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="status">Change Status</label>
                                <select
                                    id="status"
                                    value={status}
                                    onChange={handleStatusChange}
                                    className="p-2 border border-neutral-300 rounded"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="paid">Paid</option>
                                    <option value="verified">Verified</option>
                                    <option value="failed">Failed</option>
                                    <option value="canceld">Cancelled</option>
                                </select>
                            </div>
                            <Button type="submit" className="bg-indigo-700 text-white">Update Status</Button>
                        </form>
                    </div>

                    {/* Products in Order */}
                    <div className="p-4 border border-indigo-900 shadow-lg rounded-lg">
                        <h2 className="text-xl font-semibold border border-indigo-800 p-2 rounded-md mb-2">Products</h2>
                        {products.length > 0 ? (
                            <ul className="list-disc">
                                {products.map((product) => (
                                    <li key={product.id} className="flex border border-indigo-900 relative w-full my-4 p-2 rounded-md items-center mb-2">
                                        <img
                                            className="w-16 h-16 mr-4 rounded-lg object-cover"
                                            src={`/storage/${product.main_image}`}
                                            alt={product.title}
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-base font-medium">{product.title}</span>
                                            <span className="text-gray-500 text-sm">Quantity: {product.quantity}</span>
                                            <span className="text-gray-500 text-sm">Price: {product.price}</span>
                                        </div>

                                        <Tooltip content="Quantity in stock" placement="top-end">
                                            <div className='cursor-pointer mr-4 justify-center bg-indigo-700/80 text-white absolute font-bold text-xl right-0 size-12 rounded-full flex items-center px-2'>
                                                {product.quantity_in_stock}
                                            </div>
                                        </Tooltip>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 text-center">No products found in this command.</p>
                        )}
                    </div>
                </div>
            </div>
        </Dashboard>
    );
}
