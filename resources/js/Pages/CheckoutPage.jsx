import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Toaster, toast } from 'sonner';


const CheckoutPage = () => {

    const cart = useSelector(state => state.cart.value);
    let total = 0;
    cart?.forEach((e) => total += e.quantity * parseFloat(e.price));
    const fraiLivr = 49;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        country: 'Maroc',
        address: '',
        city: '',
        cin: '',
        phone: '',
        email: '',
        createAccount: false,
        shippingMethod: 'free'
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const miniCart = []

    cart.map(e=>{
        miniCart.push({'product_id': e.id, "color":e.color, "size":e.size,"quantity":e.quantity})
    })

    console.log("mini Cart:", miniCart)



    const handlCommand = async (e) => {
        e.preventDefault();

        const orderData = {
            ...formData,
            miniCart,
            total: total + (formData.shippingMethod === 'paid' ? fraiLivr : 0)
        };

        try {
            console.log("orderData::::::::::::: ");console.log( orderData)
            const response = await axios.post('/commands', orderData);
            console.log('Order response:', response.data);
            toast.success('Order submitted successfully!',{
                className: 'my-classname',
                // description: 'My description',
                duration: 1000,
                // icon: <MyIcon />,
              });

            // handle success (e.g., show a success message, redirect to another page, etc.)
        } catch (error) {
            console.error('Error placing order:', error.response.data);
            // handle error (e.g., show an error message)
            toast.error('Error submitting Order!');

        }
    };

    return (
        <div className="py-10">
            <Toaster richColors position='top-right' />
            <div className="mx-auto px-4">
                {cart?.length === 0 ? (
                    <div className="text-center bg-white p-8 rounded-lg shadow-lg border border-rose-400">
                        <h2 className="text-2xl font-bold mb-6">Votre panier est vide</h2>
                        <p className="text-gray-700">Il semble que vous n'avez pas encore ajouté de produits à votre panier.</p>
                    </div>
                ) : (
                    <form className='lg:flex gap-4 mx-4 relative' onSubmit={handlCommand}>
                        <div className="bg-white xl:w-[68vw] z-10 p-8 rounded-lg border border-rose-400 w-full shadow-lg">
                            <h2 className="text-2xl font-bold mb-6">Détails de facturation</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col">
                                    <label className="mb-2 font-semibold text-gray-700">Prénom *</label>
                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2 font-semibold text-gray-700">Nom *</label>
                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" required />
                                </div>
                            </div>

                            <div className="flex flex-col mt-6">
                                <label className="mb-2 font-semibold text-gray-700">Nom de l'entreprise (facultatif)</label>
                                <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
                            </div>

                            <div className="flex flex-col mt-6">
                                <label className="mb-2 font-semibold text-gray-700">Pays *</label>
                                <input type="text" name="country" value={formData.country} readOnly className="p-3 border rounded-md bg-gray-200 cursor-not-allowed" />
                            </div>

                            <div className="flex flex-col mt-6">
                                <label className="mb-2 font-semibold text-gray-700">Adresse *</label>
                                <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" required />
                            </div>

                            <div className="flex flex-col mt-6">
                                <label className="mb-2 font-semibold text-gray-700">Ville *</label>
                                <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" required />
                            </div>

                            <div className="flex flex-col mt-6">
                                <label className="mb-2 font-semibold text-gray-700">CIN (رقم بطاقة التعريف الوطنية) *</label>
                                <input type="text" name="cin" value={formData.cin} onChange={handleInputChange} className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" required />
                            </div>

                            <div className="flex flex-col mt-6">
                                <label className="mb-2 font-semibold text-gray-700">Téléphone *</label>
                                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" required />
                            </div>

                            <div className="flex flex-col mt-6">
                                <label className="mb-2 font-semibold text-gray-700">Adresse E-mail *</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" required />
                            </div>

                            <div className="flex items-center mt-6">
                                <input type="checkbox" id="createAccount" name="createAccount" checked={formData.createAccount} onChange={handleInputChange} className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded" />
                                <label htmlFor="createAccount" className="ml-2 block text-gray-700">Créer un compte ?</label>
                            </div>

                        </div>

                        <div className="max-lg:mt-10 min-w-[25vw] h-full z-40 right-8 xl-w-[20vw] sticky">
                            <div className="bg-white p-8 rounded-lg shadow-lg border border-rose-400">
                                <h2 className="text-2xl font-bold mb-2">Votre commande</h2>
                                <div className='my-2'>
                                    <div className='bg-gray-300 rounded-sm h-[2px]' />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center m-auto">
                                        <div>Produit</div>
                                        <div>Sous-total</div>
                                    </div>
                                    {cart.map((product, index) =>
                                        <div key={index} className="flex justify-between">
                                            <div><span className='text-gray-500'>(×{product.quantity})</span> {product.title}</div>
                                            <div>{product.price * product.quantity} DH</div>
                                        </div>
                                    )}
                                    <div className='my-2'>
                                        <div className='bg-gray-300 rounded-sm h-[2px]' />
                                    </div>
                                    <div className="flex flex-col gap-2 justify-between">
                                        <div>Expédition</div>
                                        <div className='flex justify-between'>
                                            <div>
                                                <input type="radio" id="freeShipping" name="shippingMethod" value="free" checked={formData.shippingMethod === 'free'} onChange={handleInputChange} className="mr-2" />
                                                <label htmlFor="freeShipping">Livraison gratuite</label>
                                            </div>
                                            <div>0.00 DH</div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>
                                                <input type="radio" id="paidShipping" name="shippingMethod" value="paid" checked={formData.shippingMethod === 'paid'} onChange={handleInputChange} className="mr-2" />
                                                <label htmlFor="paidShipping">Frais de transport</label>
                                            </div>
                                            <div>49,00 DH</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between font-semibold">
                                        <div>Total</div>
                                        <div>{total + (formData.shippingMethod === 'paid' ? fraiLivr : 0)} DH</div>
                                    </div>
                                    <div className="flex items-center mt-6">
                                        <input type="radio" id="paymentOnDelivery" name="payment" className="mr-2" defaultChecked />
                                        <label htmlFor="paymentOnDelivery">Paiement à la livraison</label>
                                    </div>
                                    <button type="submit" className={`w-full mt-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}>Commander</button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;
