import React from 'react'

const ImageModal = ({imgSrc, closeModal}) => {
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 sm:p-6 sm:pb-4">
                            <div className="flex justify-center items-center">
                            <button onClick={closeModal} type="button" className="absolute top-0 right-0 m-2 rounded-md bg-red-600 px-2 py-0 text-xl font-semibold text-white shadow-sm hover:bg-red-500">&#215;</button>
                                <img className='w-fit h-fit' src={imgSrc}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default ImageModal