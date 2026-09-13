import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
    const [file, setFile] = useState(null);
    const [images, setImages] = useState([]);
    const [uploadMessage, setUploadMessage] = useState("");
    const [searchName, setSearchName] = useState("");

    const fileInputRef = useRef(null);

    // Fetch all images
    const fetchAllImages = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/api/images"
            );

            const data = await response.json();

            setImages(data);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    // Load images when page starts
    useEffect(() => {
        fetchAllImages();
    }, []);

    // Select image
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setUploadMessage("");
    };

    // Upload image
    const handleUpload = async () => {
        if (!file) {
            alert("Please select an image");
            return;
        }

        setUploadMessage("Uploading...");

        try {
            const formData = new FormData();

            formData.append("file", file);

            const response = await fetch(
                "http://localhost:8080/api/images/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.text();

            if (!response.ok) {
                throw new Error(data);
            }

            await fetchAllImages();

            setFile(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            setUploadMessage("Image uploaded successfully!");
        } catch (error) {
            console.error("Upload error:", error);

            setUploadMessage("Failed to upload image.");
        }
    };

    // Delete image
    const deleteImage = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this image?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/api/images/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.text();

            if (!response.ok) {
                throw new Error(data);
            }

            await fetchAllImages();
        } catch (error) {
            console.error("Delete error:", error);

            alert("Failed to delete image.");
        }
    };

    // Search images by name
    const handleSearch = async () => {
        if (!searchName.trim()) {
            fetchAllImages();
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/api/images/name/${encodeURIComponent(
                    searchName
                )}`
            );

            const data = await response.json();

            setImages(data);
        } catch (error) {
            console.error("Search error:", error);
        }
    };

    // Clear search
    const handleClearSearch = () => {
        setSearchName("");
        fetchAllImages();
    };

    return (
        <div className="app">

            <h1>Image Storage System</h1>

            {/* Upload Section */}
            <div className="section">

                <h2>Upload Image</h2>

                <div className="upload-area">

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />

                    <button onClick={handleUpload}>
                        Upload Image
                    </button>

                </div>

                {file && (
                    <p className="selected-file">
                        Selected: {file.name}
                    </p>
                )}

                {uploadMessage && (
                    <p className="message">
                        {uploadMessage}
                    </p>
                )}

            </div>

            {/* Search Section */}
            <div className="section">

                <h2>Search Images</h2>

                <div className="search-area">

                    <input
                        type="text"
                        placeholder="Search image name"
                        value={searchName}
                        onChange={(event) =>
                            setSearchName(event.target.value)
                        }
                    />

                    <button onClick={handleSearch}>
                        Search
                    </button>

                    <button
                        className="clear-button"
                        onClick={handleClearSearch}
                    >
                        Clear
                    </button>

                </div>

            </div>

            {/* Stored Images */}
            <div className="section">

                <h2>Stored Images</h2>

                <p className="image-count">
                    Total Images: {images.length}
                </p>

                {images.length === 0 && (
                    <p className="no-images">
                        No images found.
                    </p>
                )}

                <div className="image-grid">

                    {images.map((image) => (

                        <div
                            className="image-card"
                            key={image.id}
                        >

                            <div className="image-info">

                                <p>
                                    <strong>ID:</strong> {image.id}
                                </p>

                                <p className="image-name">
                                    {image.name}
                                </p>

                                <p>
                                    <strong>Type:</strong> {image.type}
                                </p>

                                <p>
                                    <strong>Size:</strong>{" "}
                                    {(image.size / (1024 * 1024)).toFixed(2)} MB
                                </p>

                            </div>

                            <img
                                src={`http://localhost:8080/api/images/${image.id}`}
                                alt={image.name}
                            />

                            <button
                                className="delete-button"
                                onClick={() => deleteImage(image.id)}
                            >
                                Delete
                            </button>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default App;