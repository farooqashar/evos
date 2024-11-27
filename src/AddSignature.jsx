import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { db, collection, addDoc } from "./firebase";

const AddSignature = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [signatureString, setSignatureString] = useState(null);
  const [message, setMessage] = useState("");

  // Convert file/signature to base64 string
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatureString(reader.result); // Store base64 image of the signature
      };
      reader.readAsDataURL(file); // Convert signature iamge to base64
    }
  };

  // Submit form data to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !address || !signatureString) {
      setMessage("All fields are required.");
      return;
    }

    // Generate a hash of the signature string
    const signatureHash = CryptoJS.SHA256(signatureString).toString();

    try {
      // Add voter data along with signature (base64 encoded as string) to Firestore
      await addDoc(collection(db, "signatures"), {
        name,
        address,
        signatureString: signatureHash, // Store signature as hash of the base64 string
      });
      setMessage("Signature data added successfully to database!");
      setName("");
      setAddress("");
      setSignatureString(null);
    } catch (error) {
      setMessage("Error adding signature data to database: " + error.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <p>This is used to add signatures to the database. This will typically be used by government officials to keep the signatures database up to date.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Voter Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Voter Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Voter Signature (less than 1 MB):</label>
          <input type="file" onChange={handleFileChange} required />
        </div>
        <button type="submit">Add Voter Signature Data</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default AddSignature;