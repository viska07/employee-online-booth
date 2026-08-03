import api from "./api";

export const getReports = () =>
    api.get("/booths/reports/");

export const resetDemoData = (data) =>
    api.post(
        "/booths/reports/reset/",
        data
    );