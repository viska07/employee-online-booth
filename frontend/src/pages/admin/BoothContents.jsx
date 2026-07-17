import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import BoothHeader from "../../components/boothContent/BoothHeader";
import BoothInfoCard from "../../components/boothContent/BoothInfoCard";
import BoothSearch from "../../components/boothContent/BoothSearch";
import ContentTable from "../../components/boothContent/ContentTable";
import ContentModal from "../../components/boothContent/ContentModal";
import PreviewModal from "../../components/boothContent/PreviewModal";
import DeleteModal from "../../components/boothContent/DeleteModal";
import ViewersModal from "../../components/boothContent/ViewersModal";
import "../../styles/admin.css";
import { toast } from "react-toastify";

function BoothContents() {
    const { boothId } = useParams();
    const [booth, setBooth] = useState(null);
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [keepCurrentFile, setKeepCurrentFile] = useState(true);
    const [editingContent, setEditingContent] = useState(null);
    const [deleteContent, setDeleteContent] = useState(null);
    const [viewers, setViewers] = useState([]);
    const [showViewerModal, setShowViewerModal] = useState(false);
    const [previewContent, setPreviewContent] = useState(null); 
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "VIDEO",
        source_type: "UPLOAD",
        file: null,
        external_url: "",
    });

    useEffect(() => {

        fetchData();

    }, [boothId]);

    async function fetchData() {

        try {

            setLoading(true);

            const [

                boothResponse,

                contentResponse

            ] = await Promise.all([

                api.get(

                    `/booths/management/${boothId}/`

                ),

                api.get(

                    `/booths/management/${boothId}/contents/`

                ),

            ]);

            setBooth(

                boothResponse.data

            );

            setContents(

                contentResponse.data

            );

        }

        catch(error){

            console.error(error);

        }

        finally{

            setLoading(false);

        }

    }

    async function handleSaveContent() {

        if (!formData.title.trim()) {

            toast.warning("Title is required.");

            return;

        }

       if(!editingContent && formData.source_type==="UPLOAD" && !formData.file) {

            toast.warning("Please choose a file.");

            return;

        }

        if(!editingContent && formData.source_type==="LINK" && !formData.external_url.trim()) {

            toast.warning("Please enter a link.");

            return;

        }

        if(editingContent && formData.source_type==="UPLOAD" && !keepCurrentFile && !formData.file) {

            toast.warning("Please choose a new file.");

            return;

        }

        try {

            setSaving(true);

            const data = new FormData();

            data.append("title", formData.title);

            data.append("description", formData.description);

            data.append("type", formData.type);

            data.append("source_type", formData.source_type);

            if (!editingContent || !keepCurrentFile) {

                if(

                    formData.source_type==="UPLOAD"

                ){

                    if(formData.file){

                        data.append(

                            "file",

                            formData.file

                        );

                    }

                }

                else{

                    data.append(

                        "external_url",

                        formData.external_url

                    );

                }

            }

            if(editingContent){

                await api.put(

                    `/booths/management/content/${editingContent.id}/`,

                    data,

                    {

                        headers:{

                            "Content-Type":"multipart/form-data"

                        }

                    }

                );

            }else{

                await api.post(

                    `/booths/management/${boothId}/contents/`,

                    data,

                    {

                        headers:{

                            "Content-Type":"multipart/form-data"

                        }

                    }

                );

            }

            await fetchData();
            toast.success("Content saved successfully.");
            setShowModal(false);
            setKeepCurrentFile(true);
            setEditingContent(null);
            setFormData({
                title:"",
                description:"",
                type:"VIDEO",
                source_type:"UPLOAD",
                file:null,
                external_url:"",
            });

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to save content.");

        }

        finally {

            setSaving(false);

        }

    }

    function handleEditContent(content){

        setEditingContent(content);

        setKeepCurrentFile(true);

        setFormData({

            title:content.title,

            description:content.description,

            type:content.type,

            source_type:

                content.source_type ||

                "UPLOAD",

            external_url:

                content.external_url ||

                "",

            file:null,

        });

        setShowModal(true);

    }

            async function handleDeleteContent() {

                if (!deleteContent) return;

                try {

                    await api.delete(

                        `/booths/management/content/${deleteContent.id}/`

                    );

                    setDeleteContent(null);

                    await fetchData();

                }

                catch (error) {

                    console.error(error);

                }

            }

            async function handleViewers(content){

                try{

                    const response = await api.get(

                        `/booths/management/content/${content.id}/viewers/`

                    );

                    setViewers(

                        response.data

                    );

                    setShowViewerModal(true);

                }

                catch(error){

                    console.error(error);

                }

            }

    function getAcceptedFileTypes(){

        switch(formData.type){

            case "VIDEO":
                return ".mp4,.mov,.avi,.webm";

            case "DOCUMENT":
                return ".pdf,.doc,.docx";

            case "PRESENTATION":
                return ".ppt,.pptx";

            case "ARTICLE":
                return ".pdf,.doc,.docx";

            default:
                return "*";

        }

    }

    function handleFileChange(e){

        const file = e.target.files[0];

        const maxSize = {

            VIDEO: 200 * 1024 * 1024,

            DOCUMENT: 20 * 1024* 1024,

            PRESENTATION: 50 * 1024 *1024,

            ARTICLE: 20 * 1024 * 1024,
        };

        if (

            file.size >

            maxSize[formData.type]
        ){

             toast.error(

                `Maximum file size is ${

                    maxSize[formData.type]/1024/1024

                } MB`

            );

            e.target.value="";

            return; 
        }

        if(!file) return;

        const extension = file.name
            .split(".")
            .pop()
            .toLowerCase();

        const allowed = {

            VIDEO:["mp4","mov","avi","webm"],

            DOCUMENT:["pdf","doc","docx"],

            PRESENTATION:["ppt","pptx"],

            ARTICLE:["pdf","doc","docx"]

        };

        if(!allowed[formData.type].includes(extension)){

            toast.warning(`Invalid file type for ${formData.type}`);

            e.target.value = "";

            return;

        }

        setFormData({

            ...formData,

            file:file,

        });

    }

    const filteredContents = contents.filter(

        (content)=>

            content.title

                .toLowerCase()

                .includes(

                    search.toLowerCase()

                )

    );

    if(loading){

        return(

            <div className="admin-loading">

                Loading Booth...

            </div>

        );

    }

    function getFileExtension(file){

        if(!file) return "";

        return file

            .split(".")

            .pop()

            .toLowerCase();

    }

        return (

        <div className="admin-page">

            <BoothHeader

                onAddContent={() => {

                    setEditingContent(null);

                    setKeepCurrentFile(true);

                    setFormData({
                        title:"",
                        description:"",
                        type:"VIDEO",
                        source_type:"UPLOAD",
                        file:null,
                        external_url:"",
                    });

                    setShowModal(true);

                }}

            />

            <BoothInfoCard
                booth={booth}
                totalContents={contents.length}
            />

            <BoothSearch
                search={search}
                setSearch={setSearch}
            />

            <ContentTable
                filteredContents={filteredContents}
                setPreviewContent={setPreviewContent}
                handleEditContent={handleEditContent}
                setDeleteContent={setDeleteContent}
                handleViewers={handleViewers}
            />

            <ContentModal
                showModal={showModal}
                setShowModal={setShowModal}
                editingContent={editingContent}
                setEditingContent={setEditingContent}
                formData={formData}
                setFormData={setFormData}
                keepCurrentFile={keepCurrentFile}
                setKeepCurrentFile={setKeepCurrentFile}
                getAcceptedFileTypes={getAcceptedFileTypes}
                handleFileChange={handleFileChange}
                handleSaveContent={handleSaveContent}
                saving={saving}
            />

            <DeleteModal
                deleteContent={deleteContent}
                setDeleteContent={setDeleteContent}
                handleDeleteContent={handleDeleteContent}
            />

            <PreviewModal
                previewContent={previewContent}
                setPreviewContent={setPreviewContent}
            />

            <ViewersModal
                show={showViewerModal}
                viewers={viewers}
                onClose={() => setShowViewerModal(false)}
            />

        </div>

    );

}

export default BoothContents;