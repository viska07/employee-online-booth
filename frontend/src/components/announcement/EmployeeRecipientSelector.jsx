import { useEffect, useState } from "react";
import api from "../../services/api";

function EmployeeRecipientSelector({

    targetAudience,

    selectedEmployees = [],

    setSelectedEmployees,

}){

    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function fetchEmployees(){

            try{

                setLoading(true);

                const response = await api.get(

                    "/announcements/management/email-recipients/",

                    {

                        params:{

                            target_audience:
                                targetAudience

                        }

                    }

                );

                setEmployees(
                    response.data
                );

                const availableIds = (

                    response.data.map(

                        employee => employee.id

                    )

                );

                setSelectedEmployees(

                    current => {

                        const currentEmployees = Array.isArray(current)

                            ? current

                            : [];

                        return currentEmployees.filter(

                            employeeId =>

                                availableIds.includes(

                                    Number(employeeId)

                                )

                        );

                    }

                );

            }

            catch(error){

                console.error(

                    "Email Recipients Error:",

                    error.response?.data
                    || error

                );

            }

            finally{

                setLoading(false);

            }

        }

        fetchEmployees();

    }, [targetAudience]);

    const filteredEmployees = employees.filter(

        employee => {

            const keyword = (
                search.toLowerCase()
            );

            return (

                employee.name
                    .toLowerCase()
                    .includes(keyword)

                ||

                employee.email
                    .toLowerCase()
                    .includes(keyword)

                ||

                employee.department_display
                    .toLowerCase()
                    .includes(keyword)

                ||

                employee.position_display
                    .toLowerCase()
                    .includes(keyword)

            );

        }

    );

    function handleToggleEmployee(employeeId){

        setSelectedEmployees(

            current => {

                const currentEmployees = Array.isArray(current)

                    ? current

                    : [];

                if(

                    currentEmployees.includes(
                        employeeId
                    )

                ){

                    return currentEmployees.filter(

                        id => id !== employeeId

                    );

                }

                return [

                    ...currentEmployees,

                    employeeId

                ];

            }

        );

    }

    return(

        <div className="employee-recipient-selector">

            <div className="recipient-search">

                <input

                    type="text"

                    placeholder="Search employees..."

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                />

            </div>

            <div className="recipient-selected-summary">

                {
                    selectedEmployees.length
                }

                {" "}

                {
                    selectedEmployees.length === 1

                    ? "employee selected"

                    : "employees selected"
                }

            </div>

            <div className="recipient-employee-list">

                {

                    loading

                    ?

                    <div className="recipient-loading">

                        Loading employees...

                    </div>

                    :

                    filteredEmployees.length === 0

                    ?

                    <div className="recipient-empty">

                        No employees found

                    </div>

                    :

                    filteredEmployees.map(

                        employee => {

                            const selected = (

                                selectedEmployees.includes(
                                    employee.id
                                )

                            );

                            return(

                                <label

                                    key={employee.id}

                                    className={

                                        selected

                                        ?

                                        "recipient-employee-card selected"

                                        :

                                        "recipient-employee-card"

                                    }

                                >

                                    <input

                                        type="checkbox"

                                        checked={selected}

                                        onChange={() =>

                                            handleToggleEmployee(
                                                employee.id
                                            )

                                        }

                                    />

                                    <div className="recipient-employee-info">

                                        <strong>

                                            {employee.name}

                                        </strong>

                                        <span>

                                            {
                                                employee.department_display
                                            }

                                            {" . "}

                                            {
                                                employee.position_display
                                            }

                                        </span>

                                        <p>

                                            {employee.email}

                                        </p>

                                    </div>

                                </label>

                            );

                        }

                    )

                }

            </div>

        </div>

    );

}

export default EmployeeRecipientSelector;