import { useEffect, useState } from "react";
import api from "../../services/api";

import "../../styles/admin.css";

import AnnouncementSearch from "../../components/announcement/AnnouncementSearch";
import AnnouncementTable from "../../components/announcement/AnnouncementTable";
import AnnouncementModal from "../../components/announcement/AnnouncementModal";
import AnnouncementPreview from "../../components/announcement/AnnouncementPreview";
import DeleteAnnouncementModal from "../../components/announcement/DeleteAnnouncementModal";
import AnnouncementReadersModal from "../../components/announcement/AnnouncementReadersModal";
import AnnouncementStatistics from "../../components/announcement/AnnouncementStatistics";

function Announcements() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statistics, setStatistics] = useState({
        total_announcements: 0,
        total_published: 0,
        total_important: 0,
        total_readers: 0,
    });
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState(null);
    const [previewAnnouncement, setPreviewAnnouncement] = useState(null);
    const [deleteAnnouncement, setDeleteAnnouncement] = useState(null);
    const [readers, setReaders] = useState([]);
    const [showReadersModal, setShowReadersModal] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [formData, setFormData] = useState({
        title:"",
        description:"",
        category:"GENERAL",
        target_audience:"ALL",
        attachment:null,
        start_date:"",
        end_date:"",
        is_important:false,
        is_published:true,
        send_email:false,
        email_recipient_mode:"AUDIENCE",
        selected_email_recipients:[],
        send_whatsapp:false,
    });

    async function fetchData(){

        try{

            const response = await api.get(

                "/announcements/management/"

            );

            setAnnouncements(

                response.data

            );

        }

        catch(error){

            console.error(error);

        }

        finally{

            setLoading(false);

        }

    }

    async function fetchStatistics(){

        try{

            const response = await api.get(

                "/announcements/management/statistics/"

            );

            setStatistics(
                response.data
            );

        }

        catch(error){

            console.error(

                "Announcement Statistics Error:",

                error.response?.data

            );

        }

    }

    useEffect(()=>{

        fetchData();

        fetchStatistics();

    },[]);

    const filteredAnnouncements = announcements.filter(

        announcement=>

            announcement.title

                .toLowerCase()

                .includes(

                    search.toLowerCase()

                )

            ||

            announcement.description

                .toLowerCase()

                .includes(

                    search.toLowerCase()

                )

    );

    function handleEditAnnouncement(

        announcement

    ){

        setEditingAnnouncement(

            announcement

        );

        setFormData({

            title:

                announcement.title,

            description:

                announcement.description,

            category:

                announcement.category,

            target_audience:

                announcement.target_audience,

            attachment:null,

            start_date:

                announcement.start_date,

            end_date:

                announcement.end_date,

            is_important:

                announcement.is_important,

            is_published:

                announcement.is_published,

            send_email:

                announcement.send_email,

            email_recipient_mode:

                announcement.email_recipient_mode
                || "AUDIENCE",

            selected_email_recipients:

                announcement.selected_email_recipients
                || {},

            send_whatsapp:

                announcement.send_whatsapp,

        });

        setShowModal(true);

    }

    async function handleReaders(announcement){

        try{

            const response = await api.get(

                `/announcements/management/${announcement.id}/readers/`

            );

            setReaders(
                response.data
            );

            setSelectedAnnouncement(
                announcement
            );

            setShowReadersModal(true);

        }

        catch(error){

            console.error(

                "Readers Error:",

                error.response?.data

            );

        }

    }

    function handleAddAnnouncement(){

        setEditingAnnouncement(null);

        setFormData({

            title:"",

            description:"",

            category:"GENERAL",

            target_audience:"ALL",

            attachment:null,

            start_date:"",

            end_date:"",

            is_important:false,

            is_published:true,

            send_email:false,

            send_whatsapp:false,

        });

        setShowModal(true);

    }

    async function handleSaveAnnouncement(){

        if(!formData.title.trim()){

            alert("Title is required.");

            return;

        }

        try{

            setSaving(true);

            const data = new FormData();

            data.append(

                "title",

                formData.title

            );

            data.append(

                "description",

                formData.description

            );

            data.append(

                "category",

                formData.category

            );

            data.append(

                "target_audience",

                formData.target_audience

            );

            data.append(

                "start_date",

                formData.start_date

            );

            data.append(

                "end_date",

                formData.end_date

            );

            data.append(

                "is_important",

                formData.is_important

            );

            data.append(

                "is_published",

                formData.is_published

            );

            data.append(

                "send_email",

                formData.send_email

            );

            data.append(

                "email_recipient_mode",

                formData.email_recipient_mode

            );

            formData.selected_email_recipients.forEach(

                employeeId => {

                    data.append(

                        "selected_email_recipients",

                        employeeId

                    );
                }
            );

            data.append(

                "send_whatsapp",

                formData.send_whatsapp

            );

            if(formData.attachment){

                data.append(

                    "attachment",

                    formData.attachment

                );

            }

            if(editingAnnouncement){

                await api.put(

                    `/announcements/management/${editingAnnouncement.id}/`,

                    data,

                    {

                        headers:{

                            "Content-Type":"multipart/form-data"

                        }

                    }

                );

            }

            else{

                await api.post(

                    "/announcements/management/create/",

                    data,

                    {

                        headers:{

                            "Content-Type":"multipart/form-data"

                        }

                    }

                );

            }

            await fetchData();
            await fetchStatistics();
            setShowModal(false);
            setEditingAnnouncement(null);
            setFormData({
                title:"",
                description:"",
                category:"GENERAL",
                target_audience:"ALL",
                attachment:null,
                start_date:"",
                end_date:"",
                is_important:false,
                is_published:true,
                send_email:false,
                send_whatsapp:false,
            });

        }

        catch(error){

            console.error(error);

        }

        finally{

            setSaving(false);

        }

    }

    async function handleDeleteAnnouncement(){

        try{

            await api.delete(

                `/announcements/management/${deleteAnnouncement.id}/`

            );

            await fetchData();
            await fetchStatistics();
            setDeleteAnnouncement(null);

        }

        catch(error){

            console.error(error);

        }

    }

    return(

        <div className="admin-page">

            <div className="page-header">

                <h1>

                    Announcement Management

                </h1>

                <p>

                    Manage announcements for employees.

                </p>

            </div>

            <AnnouncementStatistics

                statistics={statistics}

            />

            <AnnouncementSearch

                search={search}

                setSearch={setSearch}

                handleAddAnnouncement={handleAddAnnouncement}

            />

            {

                loading

                ?

                <p>

                    Loading...

                </p>

                :

                <AnnouncementTable

                    announcements={filteredAnnouncements}

                    handleEdit={handleEditAnnouncement}

                    setDeleteAnnouncement={
                        setDeleteAnnouncement
                    }

                    setPreviewAnnouncement={
                        setPreviewAnnouncement
                    }

                    handleReaders={
                        handleReaders
                    }

                />

            }

            <AnnouncementModal

                showModal={showModal}

                setShowModal={setShowModal}

                editingAnnouncement={editingAnnouncement}

                formData={formData}

                setFormData={setFormData}

                handleSaveAnnouncement={

                    handleSaveAnnouncement

                }

                saving={saving}

            />

            <AnnouncementPreview

                previewAnnouncement={

                    previewAnnouncement

                }

                setPreviewAnnouncement={

                    setPreviewAnnouncement

                }

            />

            <DeleteAnnouncementModal

                deleteAnnouncement={

                    deleteAnnouncement

                }

                setDeleteAnnouncement={

                    setDeleteAnnouncement

                }

                handleDeleteAnnouncement={

                    handleDeleteAnnouncement

                }

            />

            <AnnouncementReadersModal

                show={showReadersModal}

                readers={readers}

                announcement={selectedAnnouncement}

                onClose={() => {

                    setShowReadersModal(false);

                    setReaders([]);

                    setSelectedAnnouncement(null);

                }}

            />

        </div>

    );

}

export default Announcements;