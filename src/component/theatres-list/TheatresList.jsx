import React, { useEffect, useState } from "react";
import { getAllTheatres, updateTheatre } from "../../api/theatres";
import MaterialTable from "@material-table/core";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
//import TheatresEditModal from "../theatres-edit-modal/TheatresEditModal";
import TheatresEditModal from "../theatres-edit-model/TheatresEditModel";
const TheatresList = () => {
    const [theatresList, setTheatresList] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTheatre, setSelectedTheatre] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // api call to fetch theatres list
        // on success of data, set it to state -- setTheatresList
        fetchTheatres();
    }, []);

    const fetchTheatres = () => {
        getAllTheatres()
            .then(res => {
                const { data, status } = res;
                if (status === 200) {
                    console.log(data);
                    setTheatresList(data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const deleteTheatre = rowData => {
        const theatreId = rowData._id;
        const theatresListUpdated = theatresList.filter(theatre => {
            const { _id } = theatre;
            return _id !== theatreId;
        });
        setTheatresList(theatresListUpdated);
    };

    const editTheatre = rowData => {
        setSelectedTheatre({ ...rowData });
        setShowEditModal(true);
    };

    const handleTicketsChange = e => {
        const tempTheatre = { ...selectedTheatre };

        if (e.target.name === "name") {
            tempTheatre.name = e.target.value;
        } else if (e.target.name === "city") {
            tempTheatre.city = e.target.value;
        } else if (e.target.name === "description") {
            tempTheatre.description = e.target.value;
        } else if (e.target.name === "pinCode") {
            tempTheatre.pinCode = e.target.value;
        }

        setSelectedTheatre(tempTheatre);
    };

    const handleEditTheatreSubmit = e => {
        const id = selectedTheatre._id;

        try {
            updateTheatre(id, selectedTheatre)
                .then(res => {
                    const { message, status } = res;
                    if (status === 200) {
                        setSelectedTheatre({});
                        setErrorMessage("");
                        setShowEditModal(false);
                        fetchTheatres();
                    } else if (message) {
                        setErrorMessage(message);
                    }
                })
                .catch(err => {
                    setErrorMessage(err.message);
                });
        } catch (err) {
            setErrorMessage(err.message);
        }

        // api call to save the theatre data
        // send the id and the theatre data

        // on success of save, i will close the modal
        // and i will fetch the theatre list again

        // empty the selected theatre

        // on error, i will show the error

        e.preventDefault();
    };

    // return a Material table with all the data in the list theatresList
    return (
        <div className='m-5'>
            <MaterialTable
                data={theatresList}
                title='Theatres List'
                columns={[
                    {
                        title: "Theater Name",
                        field: "name",
                    },
                    {
                        title: "Theater ID",
                        field: "_id",
                    },
                    {
                        title: "Description",
                        field: "description",
                    },
                    {
                        title: "Pin code",
                        field: "pinCode",
                    },
                    {
                        title: "City",
                        field: "city",
                    },
                ]}
                actions={[
                    {
                        icon: Edit,
                        tooltip: "Edit Theater",
                        onClick: (event, rowData) => editTheatre(rowData),
                    },
                    /*  {
                        icon: Delete,
                        tooltip: "Delete Theater",
                        onClick: (event, rowData) => deleteTheatre(rowData),
                    },
                    */
                ]}
                options={{
                    actionsColumnIndex: -1,
                    sorting: true,
                    filtering: true,
                    exportMenu: [
                        {
                            label: "Export PDF",
                            exportFunc: (cols, datas) =>
                                ExportPdf(cols, datas, "Theater Records"),
                        },
                        {
                            label: "Export CSV",
                            exportFunc: (cols, datas) =>
                                ExportCsv(cols, datas, "Theater Records"),
                        },
                    ],

                    headerStyle: {
                        backgroundColor: "#202429",
                        color: "#fff",
                    },
                    rowStyle: {
                        backgroundColor: "#EEE",
                    },
                }}
            />

            {showEditModal && (
                <TheatresEditModal
                    selectedTheatre={selectedTheatre}
                    setErrorMessage={setErrorMessage}
                    showEditModal={showEditModal}
                    setShowEditModal={setShowEditModal}
                    handleEditTheatreSubmit={handleEditTheatreSubmit}
                    handleTicketsChange={handleTicketsChange}
                    errorMessage={errorMessage}
                />
            )}
        </div>
    );
};

export default TheatresList;