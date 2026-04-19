import { TableCell, TableRow } from "./ui/table";

const EmployeeItem = ({ employee }) => {
  return (
    <TableRow key={employee.id}>
      <TableCell className="font-medium">{employee.id}</TableCell>
      <TableCell>{employee.name}</TableCell>
      <TableCell>{employee.department}</TableCell>
      <TableCell className="text-right">{employee.joiningDate}</TableCell>
    </TableRow>
  );
};

export default EmployeeItem;
