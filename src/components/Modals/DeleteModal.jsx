import Modal from "./Modal";
import { RiDeleteBin6Line } from "react-icons/ri";



const DeleteModal = ({ close, action, title, isOpen, loading }) => {
    return (
        <Modal title={
            <div className="flex items-center gap-2 font-medium">
                <div className="p-3 bg-red-100 rounded-full">
                    <RiDeleteBin6Line className=" text-red-600 text-lg" />
                </div>
                <h1>{title}</h1>
            </div>
        }
            disableDeleteButton={true} closeModal={close} isOpen={isOpen} width={'max-w-2xl'}>

            <p className=" text-gray-700">The folowing item will be deleted, once gone it can't be recovered</p>
            <div className="w-full  items-end mt-16 gap-2 flex justify-end">
                <button className=" text-gray-700 bg-gray-200 py-2 px-4 rounded-lg flex-row-reverse">Cancel</button>
                <button className=" py-2.5 bg-red-300 text-white text-sm px-4 rounded-lg">{!loading ? 'OK' : '...loding'}</button>
            </div>
        </Modal>
    )
}


export default DeleteModal