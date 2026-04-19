import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from './ui/table'
import EmployeeItem from './EmployeeItem'

const EmployeeTable = ({employees}) => {
  return (
    <Table>
        <TableCaption>A list of your employees.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="text-right">Start Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <EmployeeItem employee={employee} key={employee.id} />
          ))}
        </TableBody>
      </Table>
  )
}

export default EmployeeTable