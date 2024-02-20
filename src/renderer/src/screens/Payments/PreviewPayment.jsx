import React, { createElement, useEffect, useRef, useState } from 'react';
import Layout from '../../Layout';
import { Link, useParams } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineCloudDownload } from 'react-icons/md';
import ShareModal from '../../components/Modals/ShareModal';
import SenderReceverComp from '../../components/SenderReceverComp';
import { InvoiceProductsTable as PayementProductsTable } from '../../components/Tables';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import useSWR from 'swr';
import { backendBaseUrl } from '../../constant';
import NetworkError from '../../components/error/networkError';
import { formatDate } from '../../util/formatDate';
import Loader from '../../components/common/Loader';


function PreviewPayment() {
  const [isOpen, setIsoOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const payementContainer = useRef(null);
  const imageRef = useRef();
  const [totalPrice, setTotalPrice] = useState(0);
  const  {id}  = useParams();
  const { loading, error, data: payement, mutate } = useSWR(`${backendBaseUrl}medical-record/payement/${id}`, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });


  const buttonClass =
    'bg-subMain flex-rows gap-3 bg-opacity-5 text-subMain rounded-lg border border-subMain border-dashed px-4 py-3 text-sm';

  const createpayementContainer = () => {
    toPng(payementContainer.current).then((imageData) => {
      const link = document.createElement('a');
      imageRef.current.src = imageData;
      imageRef.current.src = imageData;
      link.href = imageRef.current;
      link.download = 'payement().png';

      imageRef.current.addEventListener('load', () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = imageRef.current.width + 50;
        canvas.height = imageRef.current.height + 50;

        context.drawImage(imageRef.current, 20, -50, imageRef.current.width, imageRef.current.height + 40);

        // Convert canvas to data URL
        const dataUrl = canvas.toDataURL('image/png');

        // Create anchor element
        const anchor = document.createElement('a');
        anchor.href = dataUrl;
        anchor.download = `image${payement._id}.png`;

        // Trigger download
        anchor.click();
      })
    })
  }

  useEffect(() => {
    let accumaltor = 0;
    const calculateTotalaAmount = () => {

      if (payement) {
        const accumilatedPrices = payement.Treatments.reduce((ReduceAccumilator, currentItem) => (ReduceAccumilator + currentItem.price), 0);
        accumaltor += accumilatedPrices;

        const accumilatedPrices2 = payement.prescribeMedecin.reduce((ReduceAccumilator, currentItem) => parseFloat(currentItem.id.price) + ReduceAccumilator, 0);
        accumaltor += accumilatedPrices2;


        setTotalPrice(accumaltor)
      }
    }
    calculateTotalaAmount();
  }, [payement])

  return (
    <Layout>
      {isShareOpen && (
        <ShareModal
          isOpen={isShareOpen}
          closeModal={() => {
            setIsShareOpen(false);
          }}
        />
      )}
      <div className="flex-btn flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/payements"
            className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
          >
            <IoArrowBackOutline />
          </Link>
          <h1 className="text-xl font-semibold">Preview payement</h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => {
              createpayementContainer();
            }}
            className={buttonClass}
          >
            Download <MdOutlineCloudDownload />
          </button>

        </div>
      </div>

      {loading && <Loader />}
      {error && <NetworkError loading={loading} callBack={() => mutate()} />}
      {!error && payement &&
        <div ref={payementContainer} className="p-3">
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="100"
            data-aos-offset="200"
            className="bg-white w-full my-8 rounded-xl border-[1px] border-border p-5"
          >
            {/* header */}
            <div className=" gap-2 items-center">
              <div className="lg:col-span-3">
                <img
                  src="/images/logo.png"
                  alt="logo"
                  className=" w-32 object-contain"
                />

                <div className="flex text-sm gap-2 items-center">
                  <p className='text-sm text-gray-500'>Payement Method:</p>
                  <p className='bg-blue-200 px-4 py-1  rounded-lg border border-blue-400'>{payement.payementMethod}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:items-end">
                <h6 className="text-xs font-medium">#{payement?._id}</h6>

                <div className="flex gap-4">
                  <p className="text-sm font-extralight">Date:</p>
                  <h6 className="text-xs font-medium">{formatDate(payement.createdAt)}</h6>
                </div>
              </div>
            </div>
            {/* sender and recever */}
            <div className="w-full my-5">
            <SenderReceverComp  item={payement.senderId} button={false} />
            </div>
            {/* products */}
            <div className=" flex flex-col gap-4">
              <div className="lg:col-span-4 col-span-6 p-6 border border-border rounded-xl overflow-hidden">
                <PayementProductsTable
                  data={payement?.Treatments}
                  button={false}
                />
              </div>

              <div className="col-span-6 mt-6 lg:col-span-2 flex flex-col gap-6">
                <div className="flex-btn gap-4">
                  <p className="text-sm font-extralight">Currency:</p>
                  <h6 className="text-sm font-medium">USD ($)</h6>
                </div>
                <div className="flex-btn gap-4">
                  <p className="text-sm font-extralight">Total (Medicine + services):</p>
                  <h6 className="text-sm font-medium">${totalPrice}</h6>
                </div>

                <div className="flex-btn gap-4">
                  <p className="text-sm font-extralight">Discount:</p>
                  <h6 className="text-sm font-medium">${0}</h6>
                </div>


                {/* notes */}
                <div className="w-full p-4 border border-border rounded-lg">
                  <h1 className="text-sm font-medium">Notes</h1>
                  <p className="text-xs mt-2 font-light leading-5">
                    Thank you for your business. We hope to work with you again
                    soon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <img hidden ref={imageRef} alt="" />
    </Layout>
  );
}

export default PreviewPayment;
