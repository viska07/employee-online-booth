import api from "./api";

export const getEmployees = () =>
    api.get("/accounts/admin/employees/");

export const createEmployee = (data) =>
    api.post("/accounts/admin/employees/", data);

export const updateEmployee = (id, data) =>
    api.put(`/accounts/admin/employees/${id}/`, data);

export const toggleEmployee = (id) =>
    api.put(`/accounts/admin/employees/${id}/activate/`);

export const resetEmployeePassword = (id, data) =>
    api.put(
        `/accounts/admin/employees/${id}/reset-password/`,
        data
    );