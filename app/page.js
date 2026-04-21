import EmployeeForm from "@/components/EmployeeForm";
import EmployeeList from "@/components/EmployeeList";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <Toaster />
      <h1 className="text-2xl text-center mt-10">Employee Management System</h1>
      <EmployeeForm />
      <EmployeeList />
    </>
  );
}
