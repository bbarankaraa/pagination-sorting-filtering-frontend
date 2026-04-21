"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchAllEmployees } from "@/services/employeeService";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import EmployeeTable from "./EmployeeTable";
import toast from "react-hot-toast";

const filterItems = [
  { value: "name-asc", label: "İsme göre sırala A-Z" },
  { value: "name-desc", label: "İsme göre sırala Z-A" },
  { value: "date-asc", label: "Tarihe göre sırala (önce en yeni)" },
  { value: "date-desc", label: "Tarihe göre sırala (önce en eski)" },
  { value: "department-asc", label: "Departmana göre A-Z" },
  { value: "department-desc", label: "Departmana göre Z-A" },
];

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilters, setCurrentFilters] = useState({
    pageNo: null,
    pageSize: null,
    sortBy: null,
    sortDir: null,
    search: null,
  });

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async (pageNo, pageSize, sortBy, sortDir, search) => {
    const toastId = toast.loading("Fetching employees...")
    try {
      const filters = {
        pageNo: pageNo ?? currentFilters.pageNo,
        pageSize: pageSize ?? currentFilters.pageSize,
        sortBy: sortBy ?? currentFilters.sortBy,
        sortDir: sortDir ?? currentFilters.sortDir,
        search: search ?? currentFilters.search,
      };
      setCurrentFilters(filters);
      const res = await fetchAllEmployees(
        filters.pageNo,
        filters.pageSize,
        filters.sortBy,
        filters.sortDir,
        filters.search,
      );
      setEmployees(res.data);
      toast.success("Employee added successfully", { id: toastId })
    } catch (err) {
      toast.error("Something went wrong", { id: toastId })
      console.log(err);
    }
  };

  const handleSelect = (value) => {
    switch (value) {
      case "name-asc":
        handleFetch(null, null, "name", "asc", null);
        break;
      case "name-desc":
        handleFetch(null, null, "name", "desc", null);
        break;
      case "date-asc":
        handleFetch(null, null, "joiningDate", "asc", null);
        break;
      case "date-desc":
        handleFetch(null, null, "joiningDate", "desc", null);
        break;
      case "department-asc":
        handleFetch(null, null, "department", "asc", null);
        break;
      case "department-desc":
        handleFetch(null, null, "department", "desc", null);
        break;
      default:
        console.log("Bilinmeyen seçim");
    }
  };

  const handleSearch = () => {
    handleFetch(null, null, null, null, search);
  };

  return (
    <div className="p-4 px-20 flex flex-col items-center justify-center mt-20">
      <div className="flex items-center justify-between w-full mb-10">
        <Field orientation="horizontal">
          <Input
            type="search"
            className={"w-96"}
            placeholder="Search..."
            value={search}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Button onClick={handleSearch}>Search</Button>
        </Field>
        <Select onValueChange={(value) => handleSelect(value)}>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Sırala" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {filterItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <EmployeeTable employees={employees} />
      <Pagination className={"mt-10"}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (currentPage != 1) {
                  handleFetch(currentPage - 1, 5, null, null, null);
                  setCurrentPage(currentPage - 1);
                } else {
                  handleFetch(3, 5, null, null, null);
                  setCurrentPage(3);
                }
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                handleFetch(1, 5, null, null, null);
                setCurrentPage(1);
              }}
              isActive={currentPage === 1}
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                handleFetch(2, 5, null, null, null);
                setCurrentPage(2);
              }}
              isActive={currentPage === 2}
            >
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                handleFetch(3, 5, null, null, null);
                setCurrentPage(3);
              }}
              isActive={currentPage === 3}
            >
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (currentPage != 3) {
                  handleFetch(currentPage + 1, 5, null, null, null);
                  setCurrentPage(currentPage + 1);
                } else {
                  handleFetch(1, 5, null, null, null);
                  setCurrentPage(1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default EmployeeList;
