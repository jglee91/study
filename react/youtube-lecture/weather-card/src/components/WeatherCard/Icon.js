import React from "react";
import styled from "@emotion/styled";

const Icon = (props) => {
  const Image = styled.img`
    width: 40%;
  `;

  return <Image src="./images/cloud.png" alt="Weather Icon"></Image>;
};

export default Icon;
