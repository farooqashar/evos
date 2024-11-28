import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import "./Forms.css";

const EVOS = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [signatureString, setSignatureString] = useState(null);
  const [evosResult, setEvosResult] = useState("");

  // Convert file/signature to base64 string
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatureString(reader.result); // Store base64 image of the signature
      };
      reader.readAsDataURL(file); // Convert signature image to base64
    }
  };

  // Check to see if voter-submitted information matches with database information
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Generate a hash of the signature string
      const signatureHash = CryptoJS.SHA256(signatureString).toString();

      // Query Firestore to check if a document matches the provided name, address, and signatureString
      const signaturesRef = collection(db, "signatures");
      const q = query(
        signaturesRef,
        where("name", "==", name),
        where("address", "==", address),
        where("signatureString", "==", signatureHash)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // A matching document was found
        setEvosResult("Your signature matches the official government database. Thank you for verifying! You are set to mail your ballot right away! ");
      } else {
        // No matching document found
        setEvosResult(
          "Your signature does NOT match the one on the official government database. Please contact your nearest county election office to make sure that your correct signature is recorded."
        );
      }
      // Clear form fields after the check
      setName("");
      setAddress("");
      setSignatureString(null);
    } catch (error) {
      console.error("Error checking signature:", error);
      setEvosResult("An error occurred while verifying your signature. Please try again later.");
    }
  };

  return (
    <div className="form-container">
      <p className="info-text">Welcome to Early Verification of Signatures (EVOS). Please enter your information and upload your signature to see if it matches against the your information on the government database.</p>
      <form onSubmit={handleSubmit} className="forms-form">
        <div className="form-group">
          <label>Your Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Your Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="file-input-wrapper">
          <label>Upload Your Signature (less than 1 MB):</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input"
            required
          />
        </div>
        <button type="submit" className="submit-button">Check Your Signature</button>
      </form>

      {evosResult && <p className={`message ${evosResult.includes('NOT') ? 'error' : ''}`}>{evosResult}</p>}
    </div>
  );
}

export default EVOS;
