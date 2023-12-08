import React, {useEffect} from 'react';

export interface IModalProps {
    open?: boolean;
    children?: React.ReactNode;
    toggle?: (value?: boolean) => void;
    onCancel?: () => void;
    onConfirm?: () => void;
}
export function Modal({children, open, toggle, onCancel, onConfirm}: IModalProps) {
    const handleToggle = (value?: boolean) => {
        toggle && toggle(value);
    }

    useEffect(() => {
        document.addEventListener('keyup', (e) => {
            e.stopPropagation();
            if (e.key === 'Escape') {
                handleToggle(true)
            }
        });
        return () => {
            document.removeEventListener('keydown', (e) => {});
        }
    }, []);

    return open && (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => handleToggle()}></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div  className="absolute top-5 right-5 cursor-pointer" onClick={() => handleToggle()}>
                            <svg className="w-4 h-4 text-gray-600" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </div>
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex justify-center">
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    {children}
                                </div>
                            </div>
                        </div>
                        {  !!(onConfirm || onCancel) &&
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                {onConfirm &&
                                    <button type="button"
                                            onClick={onConfirm}
                                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">
                                        Confirm
                                    </button>
                                }
                                {onCancel &&
                                    <button type="button"
                                            onClick={onCancel}
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                                        Cancel
                                    </button>
                                }
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
