import React, { useRef, useState } from "react";
import Modal from "./Modal";
import { BiChevronDown, BiPlus } from "react-icons/bi";
import PatientMedicineServiceModal from "./PatientMedicineServiceModal";
import { Button, Checkbox, Input, Select } from "../Form";
import { sortsDatas } from "../Datas";
import useSWR from "swr";
import { backendBaseUrl } from "../../constant";
import { useReducer } from "react";
import toast from "react-hot-toast";

function MedicineDosageModal({ closeModal, isOpen, addMedecine }) {
  const [
    {
      selectedMedecine,
      quantity,
      selectedDosage,
      dosagequantity,
      instruction,
      id,
    },
    dispatch,
  ] = useReducer((prev, next) => ({ ...prev, ...next }), {
    selectedMedecine: {},
    quantity: 0,
    dosagequantity: 0,
    instruction: "",
    selectedDosage: [],
    id: new Date(),
  });

  const form = useRef(null);
  const [open, setOpen] = useState(false);
  const [instraction, setInstraction] = useState(sortsDatas.instractions[0]);
  const { data, isLoading } = useSWR(
    `${backendBaseUrl}pharmacy/find-all-medcine`
  );

  const [dosage, setDosage] = useState(
    sortsDatas.dosage.map((item) => {
      return {
        name: item.value,
        checked: false,
      };
    })
  );

  // on change dosage
  const onChangeDosage = (e) => {
    const { name, checked } = e.target;
    const newDosage = dosage.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          checked: checked,
        };
      }
      return item;
    });

    setDosage(newDosage);
    dispatch({ selectedDosage: [...newDosage.filter((item) => item.checked)] });
  };

  const seteSelectedMedecine = (medecine) => {
    dispatch({ selectedMedecine: { ...medecine } });
  };

  return (
    <>
      <Modal
        closeModal={closeModal}
        isOpen={isOpen}
        title="Add Item"
        width={"max-w-xl"}
        selectedMedecine={seteSelectedMedecine}
      >
        {open && (
          <PatientMedicineServiceModal
            closeModal={() => setOpen(false)}
            isOpen={open}
            patient={false}
            data={data || []}
            selectedMedecine={seteSelectedMedecine}
          />
        )}

        {isLoading && <>...loading</>}

        <div className="flex-colo gap-6">
          {/* title */}
          <div className="flex flex-col gap-4 w-full">
            <p className="text-black text-sm">Choose Medicine</p>
            <button
              onClick={() => setOpen(!open)}
              className=" text-subMain flex-rows gap-2 rounded-lg border border-subMain border-dashed py-4 w-full text-sm"
            >
              <BiPlus /> Add Item
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.stopPropagation();
              e.preventDefault();
              form.current?.checkValidity && form.current.checkValidity();

              if (
                !selectedMedecine.name ||
                quantity < 1 ||
                dosagequantity < 1 ||
                !instruction ||
                selectedDosage.length < 1
              ) {
                return toast.error("Missing field");
              } else {
                addMedecine({
                  selectedMedecine,
                  quantity,
                  dosagequantity,
                  instruction,
                  selectedDosage,
                  id,
                });
                closeModal();
              }
            }}
            className="w-full flex-colo gap-6"
          >
            <div className="flex w-full flex-col gap-3">
              <p className="text-black text-sm">Instruction</p>
              <Select
                required
                selectedPerson={instraction}
                setSelectedPerson={(e) => {
                  setInstraction(e);
                  dispatch({ instruction: e.name });
                }}
                datas={sortsDatas.instractions}
              >
                <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                  {instraction.name} <BiChevronDown className="text-xl" />
                </div>
              </Select>
            </div>

            {/* quantity */}
            <Input
              required={true}
              onChange={(e) => dispatch({ quantity: e.target.value })}
              label="Quantity"
              color={true}
              type={"number"}
            />

            {/* dosage */}
            <Input
              required={true}
              onChange={(e) => dispatch({ dosagequantity: e.target.value })}
              label="Dosage Quantity"
              color={true}
              type={"number"}
            />
            <div className="flex w-full mt-4 flex-col gap-4">
              <p className="text-black text-sm">Dosage</p>
              <div className="grid xs:grid-cols-3 gap-6 pb-6">
                {sortsDatas?.dosage?.map((item) => (
                  <Checkbox
                    required={true}
                    label={item.name}
                    checked={
                      dosage?.find((i) => i.name === item.value)?.checked
                    }
                    onChange={onChangeDosage}
                    name={item.value}
                    key={item.id}
                  />
                ))}
              </div>
            </div>

            {/* summery */}
            <div className="flex flex-col gap-4 w-full">
              <p className="text-black text-sm">Summary</p>
              <ul className="flex flex-col w-full mb-10 gap-4">
                <li className="flex text-gray-600 text-sm w-full justify-between ">
                  <span>Medecine</span>
                  <span>{selectedMedecine?.name || "***"}</span>
                </li>

                <li className="flex text-gray-600 text-sm w-full justify-between ">
                  <span>Quantity</span>
                  <span>{quantity || "***"}</span>
                </li>

                <li className="flex text-gray-600 text-sm w-full justify-between ">
                  <span>Dosage</span>
                  <p className="flex gap-4">
                    {selectedDosage.length > 0
                      ? selectedDosage?.map((item, index) => (
                          <span key={`dosage-${index}`}>{item.name}</span>
                        ))
                      : "***"}
                  </p>
                </li>

                <li className="flex text-gray-600 text-sm w-full justify-between ">
                  <span>dosage quantity</span>
                  <p>{dosagequantity}</p>
                </li>

                <li className="flex text-gray-600 text-sm w-full justify-between ">
                  <span>Instructions</span>
                  <p>{instruction || "***"}</p>
                </li>
              </ul>
            </div>

            {/* button */}
            <Button type="submit" label="Add" Icon={BiPlus} />
          </form>
        </div>
      </Modal>
    </>
  );
}

export default MedicineDosageModal;
