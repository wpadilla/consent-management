import {createRoot} from "react-dom/client";
import React, {useEffect} from "react";
import {ConsentFormWrapper} from "./components/ConsentFormWrapper";
import {ConsentListWrapper} from "./components/ConsentListWrapper";
import {mockApi} from "./lib/api";
import {Modal} from "./components/Modal";
import {useSignal} from "@preact/signals-react";
import "./index.css"

const App = () => {
    const openConsentModal = useSignal(true);
    const confirmCloseConsentModal = useSignal(false);
    const toggleConsentModal = (value: boolean = !openConsentModal.value) => {
        openConsentModal.value = value;
    }
    const toggleConfirmCloseConsentModal = (value?: boolean) => {
        confirmCloseConsentModal.value = value !== undefined ? value : !confirmCloseConsentModal.value
    }

    useEffect(() => {
        window.addEventListener('userAdded', (e) => {
            toggleConsentModal()
        });
    }, []);

    return (
        <div className="flex flex-col p-10 gap-5 items-center justify-center">
            <div className="w-[100%] flex justify-end w-[100%]">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => toggleConsentModal()}
                >
                    Add Consent
                </button>
            </div>
            <ConsentListWrapper />
            <Modal open={openConsentModal.value} toggle={toggleConfirmCloseConsentModal}>
                <ConsentFormWrapper />
            </Modal>
            <Modal open={confirmCloseConsentModal.value}
                   toggle={toggleConfirmCloseConsentModal}
                   onCancel={() => toggleConfirmCloseConsentModal()}
                   onConfirm={() => (toggleConsentModal(), toggleConfirmCloseConsentModal())}
            >
                Are you sure you want to close consent form?
            </Modal>
        </div>

    )
};


async function enableMocking() {
    if (process.env.NODE_ENV !== 'development') {
        return
    }
    const { mockApi } = await import('./lib/api')

    return mockApi.start()
}

enableMocking().then(() => {
    console.log('mocking enabled')
    const container= document.getElementById("main-app")
    const root = createRoot(container)
    root.render(<App/>);
});
