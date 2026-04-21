"use client";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { addEmployee } from "@/services/employeeService";
import toast from "react-hot-toast";

const EmployeeForm = () => {
  const [values, setValues] = useState({
    name: "",
    department: "",
    joiningDate: null,
  });

  const handleAddEmployee = async () => {
    const payload = {
        ...values,
        joiningDate: values.joiningDate ? values.joiningDate.toISOString() : null
    }
    const toastId = toast.loading("Adding employee...")
     try {
        await addEmployee(payload)
        toast.success("Employee added successfully", { id: toastId })
    } catch (error) {
        toast.error("Something went wrong", { id: toastId })
    }
  };

  return (
    <div className="lg:px-24 lg:mt-16">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Add your employee</CardTitle>
          <CardDescription>
            Enter your employee details to add employee.
          </CardDescription>
          <CardAction>
            <Button variant="link">Add</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={values.name}
                  onChange={(e) => {
                    setValues({ ...values, name: e.target.value });
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  placeholder="IT"
                  type="text"
                  required
                  value={values.department}
                  onChange={(e) => {
                    setValues({ ...values, department: e.target.value });
                  }}
                />
              </div>
            </div>
          </form>
          <div className="space-y-2 mt-5">
            <Label className={""}>Joining Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!values.joiningDate}
                  className="w-70 justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                >
                  <CalendarIcon />
                  {values.joiningDate ? format(values.joiningDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={values.joiningDate}
                  onSelect={(date) => setValues({...values, joiningDate: date})}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full hover:bg-accent-foreground cursor-pointer"
            onClick={handleAddEmployee}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmployeeForm;
