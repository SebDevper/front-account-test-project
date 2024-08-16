export default function BankComponent({onClick, displayName, countryCode}){
    console.log(displayName, countryCode)
    return (
        <div className="w-full lg:w-10/12 flex justify-center mb-2"
        >
            <div
                className="w-7/12 grid place-items-center"
            >
                <div>
                    <span className="font-bold text-blue-900">
                        {displayName}
                    </span> ({countryCode})
                </div>
            </div>
            <button
                onClick={onClick}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            > Ver cuentas
            </button>
        </div>
)
}