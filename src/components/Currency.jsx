import React from "react"
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_CURR_BASE_URL;
const API_KEY = import.meta.env.VITE_CURR_API_KEY;

export default function Currency() {
    const [amount, setAmount] = React.useState("")
    const [fromCurrency, setFromCurrency] = React.useState("USD")
    const [toCurrency, setToCurrency] = React.useState("TRY")
    const [result, setResult] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState("")

    const handleConvert = async () => {
        if (!amount || amount <= 0) {
            setError("Please enter a valid amount")
            return
        }

        try {
            setLoading(true)
            setError("")
            const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`)
            const convertedResult = (response.data.data[toCurrency] * parseFloat(amount)).toFixed(2);
            setResult(convertedResult)
        } catch (err) {
            setError("Conversion failed. Please try again.")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-11/12 md:w-3/4 lg:w-1/2 min-h-[50vh] bg-white/60 backdrop-blur-sm shadow-lg rounded-xl p-4 md:p-6 flex flex-col items-center justify-evenly mx-auto ">
            <h1 className="text-xl md:text-2xl font-bold mb-4 w-full h-20 bg-blue-500 text-white rounded-md flex items-center justify-center">Currency Converter</h1>

            {error && (
                <div className="w-full p-2 mb-2 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center w-full gap-3 md:gap-4 ">
                <input
                    className="w-full p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                />

                <select
                    className="w-full p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                >
                    <option value="USD">USD</option>
                    <option value="TRY">TRY</option>
                    <option value="EUR">EUR</option>
                </select>

                <FaArrowRight className="w-16 text-blue-500" />

                <select
                    className="w-full p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                >
                    <option value="TRY">TRY</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>

                <input
                    className="w-full p-2 rounded-md border-2 border-gray-300 bg-gray-100 focus:outline-none"
                    type="number"
                    disabled
                    value={result}
                    placeholder="Result"
                />
            </div>

            <div className="w-full md:w-auto mt-4">
                <button
                    onClick={handleConvert}
                    disabled={loading}
                    className="w-full md:w-auto px-6 py-2 rounded-md hover:bg-blue-600 transition-all duration-300 cursor-pointer bg-blue-500 text-white font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {loading ? "Converting..." : "Convert"}
                </button>
            </div>
        </div>
    )
}