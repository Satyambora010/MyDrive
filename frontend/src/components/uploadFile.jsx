import axios from "axios";
import { useState } from "react";
import Header from "./header";

const UploadFile = () => {
    const [tags, setTags] = useState("");
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!file) {
            alert("Please select a file");
            return;
        }
        if(tags.split(",").length > 5) {
            alert("You can only upload up to 5 tags");
            return;
        }
        const formData = new FormData();
        formData.append("tags", tags);
        formData.append("file", file);
        axios.post("http://localhost:3001/api/files/upload", formData, {
            withCredentials: true
        })
        .then((res) => {
            console.log(res);
            alert("File uploaded successfully");
            setTags("");
            setFile(null);
        })
        .catch((err) => {
            alert("Error uploading file");
        });
    }
    return (
        <div>
            <Header />
            <div className="flex flex-col mt-16 ml-4 mr-4 w-full h-full">
                <h2 className="text-2xl font-bold text-blue-400">Upload File Here</h2>
                <div className="h-full w-full flex items-center justify-center mt-16">
                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-1/2 h-1/2 border-2 border-blue-400 rounded-md p-4">
                        <input onChange={(e) => setTags(e.target.value)} 
                                type="text" 
                                placeholder="Tags (comma separated)" 
                                className="w-2/3 h-10 border-2 border-blue-400 rounded-md" 
                                value={tags}
                        />
                        <input onChange={(e) => setFile(e.target.files[0])} 
                                type="file" 
                                placeholder="Choose File" 
                                className="w-2/3 h-10 border-2 border-blue-400 rounded-md" 
                        />
                        <button type="submit" 
                                className="w-2/3 h-10 bg-blue-400 text-white rounded-md"
                        >Upload</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadFile;