import { UseAuthentication } from "./util/hooks/useAuth";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Aos from "aos";
import Dashboard from "./screens/Dashboard";
import Toast from "./components/Notifications/Toast";
import Payments from "./screens/Payments/Payments";
import Appointments from "./screens/Appointments";
import Patients from "./screens/Patients/Patients";
import Campaings from "./screens/Campaings";
import Services from "./screens/Services";
import Invoices from "./screens/Invoices/Invoices";
import Settings from "./screens/Settings";
import CreateInvoice from "./screens/Invoices/CreateInvoice";
import EditInvoice from "./screens/Invoices/EditInvoice";
import PreviewInvoice from "./screens/Invoices/PreviewInvoice";
import EditPayment from "./screens/Payments/EditPayment";
import PreviewPayment from "./screens/Payments/PreviewPayment";
import Medicine from "./screens/Medicine";
import PatientProfile from "./screens/Patients/PatientProfile";
import CreatePatient from "./screens/Patients/CreatePatient";
import Doctors from "./screens/Doctors/Doctors";
import DoctorProfile from "./screens/Doctors/DoctorProfile";
import Receptions from "./screens/Receptions";
import NewMedicalRecode from "./screens/Patients/NewMedicalRecode";
import NotFound from "./screens/NotFound";
import Login from "./screens/Login";
import Surveillance from "./screens/surveillance/Surveillance";
import ReceptionAmbulatoire from "./screens/ReceptionAmbulatoire/ReceptionAmbulatoire";
import ComptableOne from "./screens/ComptableOne/ComptableOne";
import Triage from "./screens/Triage/Triage";
import DoctorAmbulatoire from "./screens/DoctorAmbulatoire/DoctorAmbulatoire";
import DoctorChirurgie from "./screens/DoctorChirurgie/DoctorChirurgie";
import TodayAppointments from "./components/TodayAppointments/TodayAppointments";
import Laboratoire from "./screens/Laboratoire/Laboratoire";
import Radiographie from "./screens/Radiographie/Radiographie";
import Echographie from "./screens/Echographie/Echographie";
import PharmacyPoeple from "./screens/Pharmacy/PharmacyPoeple";
import PharmacyStock from "./screens/Pharmacy/PharmacyStock";
import Hospitalisation from "./screens/Hospitalisation/Hospitalisation";
import Maternite from "./screens/Maternite/Maternite";
import CreateTriage from "./screens/Triage/createTriage";
import Agents from "./screens/Agent/Agents";
import NewRadiographieRecord from "./screens/Radiographie/NewRadiographieRecord";
import NewLoboratoireRecord from "./screens/Laboratoire/NewLoboratoireRecord";
import NewExamen from "./screens/Examen/NewExamen";
import DoctorCart from "./components/DoctorCart/DoctorCart";
import NewEchographieRecord from "./screens/Echographie/NewEchographieRecord";
import NewHospitalisationRecord from "./screens/Hospitalisation/NewHospitalisationRecord";
import { ThemeProvider } from "@material-tailwind/react";
import { useEffect } from "react";
import Loader from "./components/common/Loader";
import SessionEnd from "./screens/error/session-end";
import AgentProfile from "./screens/Agent/AgentProfile";
import RadioExamsForm from "./components/common/radioExamsForm";
import JourHospitalisé from './screens/Hospitalisation/JourHospitalisé';
import NewDayhosto from "./screens/Hospitalisation/NewDayhosto";
import NewChirurgieRecord from "./screens/DoctorChirurgie/NewChirurgieRecord";
import NewChirurgieRecord2 from "./screens/DoctorChirurgie/NewChirurgieRecord2";
import NewMarternite from "./screens/Maternite/NewMarternite";


function App() {
  Aos.init();
  const { loading, authenticate } = UseAuthentication();

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ThemeProvider>
          {/* Toaster */}
          <Toast />
          {/* Routes */}

          <Routes>
            <Route path="/" element={<Patients />} />
            <Route path="/login" element={<Login />} />
            <Route path="/session-end" element={<SessionEnd />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* surveillance */}
            <Route path="/surveillance" element={<Surveillance />} />
            {/* ReceptionAmbulatoire */}
            <Route
              path="/Reception/ambulatoire"
              element={<ReceptionAmbulatoire />}
            />
            {/* ComptableOne */}
            <Route path="/comptable/one" element={<ComptableOne />} />
            {/* Triage */}
            <Route path="/triage" element={<Triage />} />
            {/* DoctorAmbulatoire */}
            <Route path="/doctor/ambulatoire" element={<DoctorAmbulatoire />} />

            {/* chirurgie */}
            <Route path="/chirurgie" element={<DoctorChirurgie />} />
            <Route path="/chirurgie_protocole/visiting/1" element={<NewChirurgieRecord />} />
            <Route path="/chirurgie/visiting/1" element={<NewChirurgieRecord2 />} />

            {/* TodayAppointments  */}
            <Route path="/today/appointments" element={<TodayAppointments />} />
            {/* Laboratoire */}
            <Route path="/laboratoire" element={<Laboratoire />} />
            {/* Laboratoire */}
            <Route path="/radiographie" element={<Radiographie />} />
            {/* Echographie */}
            <Route path="/echographie" element={<Echographie />} />
            {/* PharmacyPoeple */}
            <Route path="/pharmacypoeple" element={<PharmacyPoeple />} />
            {/* PharmacyPoeple */}
            <Route path="/pharmacystock" element={<PharmacyStock />} />
            {/* Hospitalisation */}
            <Route path="/hospitalisation" element={<Hospitalisation />} />
            <Route path="/jourhospitalise" element={<JourHospitalisé />} />
            <Route path="/hosto/visiting/1" element={<NewDayhosto />} />

            {/* Maternite */}
            <Route path="/maternite" element={<Maternite />} />
            <Route path="/maternite/visiting/1" element={<NewMarternite />} />
            {/* agents */}
            <Route path="/agents" element={<Agents />} />
            {/* invoce */}
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/invoices/create" element={<CreateInvoice />} />
            <Route path="/invoices/edit/:invoiceId" element={<EditInvoice />} />
            <Route path="/invoices/preview/:invoiceId" element={<PreviewInvoice />} />
            {/* payments */}
            <Route path="/payments" element={<Payments />} />
            <Route path="/payments/edit/:id" element={<EditPayment />} />
            <Route path="/payments/preview/:id" element={<PreviewPayment />} />
            {/* patient */}
            <Route path="/patients" element={<Patients />} />
            <Route
              path="/patients/preview/:patientId"
              element={
                <PatientProfile />
              }
            />

            <Route path="/patients/create" element={<CreatePatient />} />

            <Route
              path="/triage/visiting/:patientId"
              element={<CreateTriage />}
            />

            <Route
              path="/radiographie/visiting/:patientId"
              element={<RadioExamsForm url={'radiographie'} title={'New Radiographie'} />}
            />
            <Route
              path="/laboratoire/visiting/:patientId"
              element={<NewLoboratoireRecord />}
            />
            <Route path="/examen/visiting/:patientId" element={<NewExamen />} />
            <Route
              path="/echographie/visiting/:patientId"
              element={<RadioExamsForm url={'echographie'} title={'New Echographie Record'} />}
            />
            <Route
              path="/hospitalisation/visiting/:patientId"
              element={<NewHospitalisationRecord />}
            />

            <Route
              path="/patients/visiting/:patientId"
              element={<NewMedicalRecode />}
            />

            {/* doctors */}
            <Route path="/doctors" element={<Doctors />} />
            <Route path="agents/preview/:agentId" element={<AgentProfile />} />

            {/* doctorscart */}
            <Route path="/doctorscart" element={<DoctorCart />} />
            {/* reception */}
            <Route path="/receptions" element={<Receptions />} />
            {/* others */}
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/campaigns" element={<Campaings />} />
            <Route path="/medicine" element={<Medicine />} />
            <Route path="/services" element={<Services />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
