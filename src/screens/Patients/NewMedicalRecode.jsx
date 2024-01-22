import React, { useEffect, useRef, useState } from "react";
import Layout from "../../Layout";
import { Link, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { Button, Checkbox, Select, Textarea } from "../../components/Form";
import { BiChevronDown, BiPlus } from "react-icons/bi";
import { medicineData, memberData, servicesData } from "../../components/Datas";
import { MedicineDosageTable } from "../../components/Tables";
import { toast } from "react-hot-toast";
import MedicineDosageModal from "../../components/Modals/MedicineDosage";
import { FaTimes } from "react-icons/fa";
import Uploader from "../../components/Uploader";
import { HiOutlineCheckCircle } from "react-icons/hi";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import user from "../../state/user";
import useSWR from "swr";
import { backendBaseUrl } from "../../constant";
import { FaRegFaceGrimace } from "react-icons/fa6";
import { cn } from "../../util/cn";

function NewMedicalRecode() {
  const userState = useRecoilValue(user);
  const { patientId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { data, error } = useSWR(`${backendBaseUrl}patient/${patientId}`);
  const { data: serviceData, error: serviceError } = useSWR(
    `${backendBaseUrl}service`
  );
  const [medecines, seteMedecines] = useState([]);
  const [mappedServiceData, setMappedServiceData] = useState([]);
  const [createRecordLoading, setCreateRecordLoading] = useState();
  const [attachedImages, setAttachedImages] = useState([]);

  const formik = useFormik({
    initialValues: {
      complain: "",
      Teteetcou: "",
      Thorax: "",
      Abdomen: "",
      Apparreilocomoteur: "",
      ExaenOrl: "",
      Diagnosis: "",
      VitalSigns: "",
    },

    validationSchema: Yup.object({
      complain: Yup.string().required("complain can't be emepty"),
      Teteetcou: Yup.string().required("this field can't be empty"),
      Thorax: Yup.string().required("Thorax can't be empty"),
      Abdomen: Yup.string().required("Abdomen is required"),
      Apparreilocomoteur: Yup.string().required("this field can't be empty"),
      ExaenOrl: Yup.string().required("field required"),
      Diagnosis: Yup.string().required("this field can't be empty"),
      VitalSigns: Yup.string().required("this field can't be empty"),
    }),

    onSubmit: {},
  });

  useEffect(() => {
    setMappedServiceData(
      serviceData
        ? serviceData.map((item) => ({
            ...item,
            checked: false,
          }))
        : []
    );
  }, [serviceData]);

  // on change treatmeants
  const onChangeTreatmeants = (e) => {
    const { name, checked } = e.target;
    const newTreatmeants = mappedServiceData.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          checked: checked,
        };
      }
      return item;
    });
    setMappedServiceData(newTreatmeants);
  };

  //delete medecine
  const deleteMedecine = (id) => {
    let prevSatate = [...medecines];
    const filtered = prevSatate.filter((item) => {
      return item.id !== id;
    });

    console.log(filtered);

    seteMedecines([...filtered]);
  };

  return (
    <Layout>
      {
        // modal
        isOpen && (
          <MedicineDosageModal
            addMedecine={(data) => seteMedecines([...medecines, data])}
            isOpen={isOpen}
            closeModal={() => {
              setIsOpen(false);
            }}
          />
        )
      }
      <div className="flex items-center gap-4">
        <Link
          to={`/patients/preview/${patientId}`}
          className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
        >
          <IoArrowBackOutline />
        </Link>
        <h1 className="text-xl font-semibold">New Medical Record</h1>
      </div>
      <div className=" grid grid-cols-12 gap-6 my-8 items-start">
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 flex-colo gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28"
        >
          {!error && data && (
            <>
              <img
                src={data.ProfilePicture}
                alt="setting"
                className="w-40 h-40 rounded-full object-cover border border-dashed border-subMain"
              />

              <div className="gap-2 flex-colo">
                <h2 className="text-sm font-semibold">
                  {data.firstName + " " + data.secondName}{" "}
                </h2>

                <p className="text-xs">{data.phoneNumber}</p>
                <p className="text-xs text-subMain bg-text font-medium py-1 px-4 rounded-full border-[0.5px] border-subMain">
                  {new Date().getFullYear() -
                    new Date(data.birthdate).getFullYear()}
                </p>
              </div>
            </>
          )}

          {error && (
            <>
              <FaRegFaceGrimace className="text-4xl text-gray-800" />
              <h1 className="text-gray-500">Failed to load the user</h1>
            </>
          )}
        </div>
        {/* tab panel */}

        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6"
        >
          <form action="" onSubmit={formik.handleSubmit}>
            <div className="flex w-full flex-col gap-5">
              {/* complains */}

              <Textarea
                required={true}
                name={"complain"}
                onBlur={formik.handleBlur}
                id="new_record_complain"
                defaultValue={formik.values.complain}
                label="Complains"
                color={true}
                onChange={formik.handleChange}
                rows={3}
                placeholder={"Bad breath, toothache, ...."}
              />
              <p
                className={cn(
                  "text-red-500 text-[10px] text-right top-[5.5rem]   min-h-[5px]"
                )}
              >
                {formik.errors.complain &&
                  formik.touched.complain &&
                  formik.errors.complain}
              </p>

              {/* Tete et cou */}
              <Textarea
                required={true}
                name={"Teteetcou"}
                onBlur={formik.handleBlur}
                id="Teteetcou"
                defaultValue={formik.values.Teteetcou}
                label="Tete et cou"
                color={true}
                onChange={formik.handleChange}
                rows={3}
                placeholder={"Bad breath, toothache, ...."}
              />
              <p
                className={cn(
                  "text-red-500 text-[10px] text-right top-[5.5rem]   min-h-[5px]"
                )}
              >
                {formik.errors.Teteetcou &&
                  formik.touched.Teteetcou &&
                  formik.errors.Teteetcou}
              </p>

              {/*  Thorax */}
              <Textarea
                required={true}
                name={"Thorax"}
                onBlur={formik.handleBlur}
                id="new_record_Thorax"
                defaultValue={formik.values.Thorax}
                label=" Thorax"
                color={true}
                onChange={formik.handleChange}
                rows={3}
                placeholder={"Bad breath, toothache, ...."}
              />
              <p
                className={cn(
                  "text-red-500 text-[10px] text-right top-[5.5rem]   min-h-[5px]"
                )}
              >
                {formik.errors.Thorax &&
                  formik.touched.Thorax &&
                  formik.errors.Thorax}
              </p>
              {/* Abdomen */}
              <Textarea
                required={true}
                name={"Abdomen"}
                onBlur={formik.handleBlur}
                id="new_record_Abdomen"
                defaultValue={formik.values.Abdomen}
                label="Abdomen"
                color={true}
                onChange={formik.handleChange}
                rows={3}
                placeholder={"Bad breath, toothache, ...."}
              />
              <p
                className={cn(
                  "text-red-500 text-[10px] text-right top-[5.5rem]   min-h-[5px]"
                )}
              >
                {formik.errors.Abdomen &&
                  formik.touched.Abdomen &&
                  formik.errors.Abdomen}
              </p>
              {/* Apparril Locomoteur */}
              <Textarea
                required={true}
                name={"Apparreilocomoteur"}
                onBlur={formik.handleBlur}
                id="new_record_Locomoteur"
                defaultValue={formik.values.Apparreilocomoteur}
                label="Apparril Locomoteur"
                color={true}
                onChange={formik.handleChange}
                rows={3}
                placeholder={"Bad breath, toothache, ...."}
              />
              <p
                className={cn(
                  "text-red-500 text-[10px] text-right top-[5.5rem]   min-h-[5px]"
                )}
              >
                {formik.errors.Apparreilocomoteur &&
                  formik.touched.Apparreilocomoteur &&
                  formik.errors.Apparreilocomoteur}
              </p>
              {/*  Exaen Orl */}
              <Textarea
                required={true}
                name={"ExaenOrl"}
                onBlur={formik.handleBlur}
                id="new_record_Exaen"
                defaultValue={formik.values.ExaenOrl}
                label="Exaen Orl"
                color={true}
                onChange={formik.handleChange}
                rows={3}
                placeholder={"Bad breath, toothache, ...."}
              />
              <p
                className={cn(
                  "text-red-500 text-[10px] text-right top-[5.5rem]   min-h-[5px]"
                )}
              >
                {formik.errors.ExaenOrl &&
                  formik.touched.ExaenOrl &&
                  formik.errors.ExaenOrl}
              </p>

              {/* Diagnosis */}
              <Textarea
                required={true}
                name={"Diagnosis"}
                onBlur={formik.handleBlur}
                id="new_record_Diagnosis"
                defaultValue={formik.values.Diagnosis}
                label="Diagnosis"
                color={true}
                onChange={formik.handleChange}
                rows={3}
                placeholder={"Gingivitis, Periodontitis, ...."}
              />
              <p
                className={cn(
                  "text-red-500 text-[10px] text-right top-[5.5rem]   min-h-[5px]"
                )}
              >
                {formik.errors.Diagnosis &&
                  formik.touched.Diagnosis &&
                  formik.errors.Diagnosis}
              </p>

              {/* Vital Signs */}
              <Textarea
                required={true}
                name={"VitalSigns"}
                onBlur={formik.handleBlur}
                id="new_record_Signs"
                defaultValue={formik.values.VitalSigns}
                label="Vital Signs"
                color={true}
                onChange={formik.handleChange}
                rows={3}
                placeholder={"Blood pressure, Pulse, ...."}
              />

              <p
                className={cn(
                  "text-red-500 text-[10px] text-right top-[5.5rem]   min-h-[5px]"
                )}
              >
                {formik.errors.VitalSigns &&
                  formik.touched.VitalSigns &&
                  formik.errors.VitalSigns}
              </p>

              {/* Treatment */}
              <div className="flex w-full flex-col gap-4">
                <p className="text-black text-sm">Treatment</p>
                <div className="grid xs:grid-cols-2 md:grid-cols-3 gap-6 pb-6">
                  {serviceData &&
                    mappedServiceData.length &&
                    mappedServiceData.map((item) => (
                      <Checkbox
                        label={item.name}
                        checked={
                          mappedServiceData.find((i) => i.name === item.name)
                            .checked
                        }
                        onChange={onChangeTreatmeants}
                        name={item.name}
                        key={item.id}
                      />
                    ))}

                  {serviceError && (
                    <div className="text-center bg-gray-200 py-4 rounded-lg col-span-3  m-auto w-full flex flex-col items-center justify-center">
                      <FaRegFaceGrimace className=" text-3xl mb-3 text-gray-700" />
                      <p className="text-gray-700">Failed to load treatments</p>
                      <Button
                        onClick={() => window.location.reload()}
                        label={"reload the page"}
                        type={"button"}
                        className="bg-gray-700 mt-5 w-[200px]"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* medicine */}
              <div className="flex w-full flex-col gap-4 mb-6">
                <p className="text-black text-sm">Medicine</p>
                <div className="w-full overflow-x-scroll">
                  <MedicineDosageTable
                    deleteMedecin={deleteMedecine}
                    data={medecines}
                    functions={{
                      delete: (id) => {
                        toast.error("This feature is not available yet");
                      },
                    }}
                    button={true}
                  />
                </div>
                <button
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  className=" text-subMain flex-rows gap-2 rounded-lg border border-subMain border-dashed py-4 w-full text-sm"
                >
                  <BiPlus /> Add Medicine
                </button>
              </div>
              {/* attachment */}
              <div className="flex w-full flex-col gap-4">
                <p className="text-black text-sm">Attachments</p>
                <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
                  {attachedImages.map((_, i) => (
                    <div className="relative w-full">
                      <img
                        src={`https://placehold.it/300x300?text=${i}`}
                        alt="patient"
                        className="w-full  md:h-40 rounded-lg object-cover"
                      />
                      <button
                        onClick={() =>
                          toast.error("This feature is not available yet.")
                        }
                        className="bg-white rounded-full w-8 h-8 flex-colo absolute -top-1 -right-1"
                      >
                        <FaTimes className="text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>

                <Uploader setImage={{}} />
              </div>
              {/* submit */}
              <Button label={"Save"} Icon={HiOutlineCheckCircle} />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default NewMedicalRecode;
