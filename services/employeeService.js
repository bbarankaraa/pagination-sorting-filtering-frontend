import api from "@/api/axios";

export const fetchAllEmployees = (pageNo, pageSize, sortBy, sortDir, search) => {
    const params = {};

    if (pageNo !== null && pageNo !== undefined) params.pageNo = pageNo;
    if (pageSize !== null && pageSize !== undefined) params.pageSize = pageSize;
    if (sortBy) params.sortBy = sortBy;
    if (sortDir) params.sortDir = sortDir;
    if (search) params.search = search;

    return api.get("/all", { params });
};

export const addEmployee = (payload) => {
    return api.post("/save",payload)
}