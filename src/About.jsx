import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Early Verification of Signatures (EVOS)</h1>
      <p className="about-text">
        This is a model deployment of the Early Verification of Signatures (EVOS) system.
      </p>
      <p className="about-text">
        The EVOS system enables government officials to add signatures to the government database, which voters' signatures will be matched against during the pre-screening verification process that voters can engage in.
      </p>
      <p className="about-text">
        Additionally, the system provides a platform for voters to enter their name and address, upload an image of their ballot, and receive immediate feedback on whether their signature matches the one on file in the database.
      </p>
      <p className="about-text">
        The goal of this system is to improve the accuracy and speed of the signature verification process, ensuring that voter signatures are correctly matched and verified, leading to more mail-in-ballots being counted.
      </p>
    </div>
  );
}

export default About;
